import React, {Component} from 'react';
import { Dimensions, Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import Sound from 'react-native-sound';
import Pulse from 'react-native-pulse';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import { saveUserStory } from '../data/actions/story-actions';
import DialogElement from '../components/dialog-element';
import HeaderElement from '../components/header-element';
import RoundButtonElement from '../components/round-button-element';

const Dialog = ({functionResume, functionExit, functionExitAndSave, title, visible}) => {
    return (
        <View style={ style.dialogWrapper }>
            <View style={ style.dialogHeader }>
                <HeaderElement title={ title }/>
            </View>
            { !visible &&
                <View style={ style.dialogButtons }>
                    <TouchableOpacity onPress={ () => functionResume() } activeOpacity={ 0.7 }>
                        <RoundButtonElement text="Falar" icon="microphone" styleIcon={ {width: 70, height: 70} }/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => functionExit() } activeOpacity={ 0.7 }>
                        <RoundButtonElement text="Sair" icon="close_black" styleIcon={ {width: 60, height: 60} }/>
                    </TouchableOpacity>
                </View>
            }
            { visible && <DialogElement title="Sair" styleLine={ style.line } message="Você quer salvar essa história?" functionYes={ functionExitAndSave } functionNo={ () => Actions.reset("home") } /> }
        </View>
    );
}

class TellStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioPath: "",
            dialogVisible: false,
            exitDialogVisible: false,
            finished: false,
            hasPermission: undefined,
            paused: false,
            recording: false,
            stoppedRecording: false
        }
        this.exit = this.exit.bind(this);
        this.stop = this.stop.bind(this);
    }

    componentDidMount() {
        this.setState({ audioPath: `${AudioUtils.DocumentDirectoryPath}/story${this.props.userStories.length}.aac` }, async () => {
            await this.requestAuthorization();
            this.prepareRecordingPath(this.state.audioPath);
            KeepAwake.activate();
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.dialogVisible != nextState.dialogVisible || this.state.recording != nextState.recording ||
           this.state.hasPermission != nextState.hasPermission || this.state.exitDialogVisible != nextState.exitDialogVisible ||
           this.props.userStories != nextProps.userStories) {
            return true;
        }
        else return false;
    }

    componentWillUnmount() {
        KeepAwake.deactivate();
    }

    exit = () => {
        this.setState({ exitDialogVisible: true });
    }

    pause = () => {
        if(this.state.recording) {
            this.setState({ dialogVisible: true }, async () => {
                try {
                    const story = await AudioRecorder.pauseRecording();
                } catch (error) {
                    return error;
                }
            });
        }
        else return false;
    }

    prepareRecordingPath = (audioPath) => {
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        AudioEncodingBitRate: 32000
      });
    }

    record = () => {
        if(this.state.hasPermission) {
            if(!this.state.recording) {
                this.setState({ recording: true }, async () => {
                    try {
                        const story = await AudioRecorder.startRecording();
                    } catch (error) {
                        return error;
                    }
                })
            }
            else return false;
        }
        else {
            this.requestAuthorization();
        }
    }

    renderDialog = (visible) => {
        if(visible) {
            return (
                <Dialog functionResume={ this.resume } functionExit={ this.exit } functionExitAndSave={ this.stop } title={ this.props.title } visible={ this.state.exitDialogVisible }/>
            );
        }
        else return null;
    }

    renderRecordFeedback = () => {
        return (
            <View style={ style.recordFeedback }>
                <Image style={ {width: 90, height: 90, zIndex: 1} } source={ images["microphone"] } resizeMode="contain"/>
                { this.state.recording && <Pulse color="#FFF" numPulses={ 3 } diameter={ 200 } speed={ 20 } duration={ 1000 }/> }
            </View>
        );
    }

    resume = () => {
        try {
            this.setState({ dialogVisible: false }, async () => {
                await AudioRecorder.resumeRecording();
            });
        } catch (error) {
            return error;
        }
    }

    requestAuthorization = () => {
        AudioRecorder.requestAuthorization().then(async (isAuthorized) => {
          await this.setState({ hasPermission: isAuthorized });
          if(!isAuthorized) return;
          this.prepareRecordingPath(this.state.audioPath);
        });
    }

    stop = async () => {
        await this.props.saveUserStory(this.state.audioPath);
        try {
            const story = await AudioRecorder.stopRecording();
            Actions.reset("home");
        } catch (error) {
            return error;
        }
    }

    render() {
        return (
            <View style={ style.main }>
                { this.renderDialog(this.state.dialogVisible) }
                <HeaderElement title={ this.props.title }/>
                <View style={ style.viewAvatar }>
                    <Image style={ style.avatar } source={ images[this.props.userAvatar] } resizeMode="contain"/>
                    { this.renderRecordFeedback() }
                </View>
                <View style={ style.viewButtons }>
                    <TouchableOpacity onPress={ () => this.record() } activeOpacity={ 0.7 }>
                        <RoundButtonElement text="Falar" icon="microphone" styleIcon={ {width: 70, height: 70} } disabled={ this.state.recording ? true : false }/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.pause() } activeOpacity={ 0.7 }>
                        <RoundButtonElement text="Parar" icon="pause" styleIcon={ {width: 60, height: 60} } disabled={ this.state.recording ? false : true }/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => (
    {
        saveUserStory: (story) => dispatch(saveUserStory(story))
    }
);

const mapStateToProps = state => (
    {
        userAvatar: state.AvatarReducer.userAvatar,
        userStories: state.StoryReducer.userStories
    }
);

const style = StyleSheet.create({
    avatar: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginTop: 30
    },
    dialogButtons: {
        flexDirection: "row",
        width: 300,
        alignSelf: "center",
        justifyContent: "space-between"
    },
    dialogHeader: {
        position: "absolute",
        top: 0,
        width: Dimensions.get("window").width
    },
    dialogWrapper: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: StyleUtils.modal_background,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    line: {
        width: 270,
        alignSelf: "center",
        borderBottomWidth: 3,
        borderBottomColor: StyleUtils.primary_color
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    recordFeedback: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        zIndex: 1
    },
    viewAvatar: {
        flexDirection: "row"
    },
    viewButtons: {
        position: "absolute",
        bottom: 10,
        flexDirection: "row",
        width: 300,
        alignSelf: "center",
        justifyContent: "space-between"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TellStory);
