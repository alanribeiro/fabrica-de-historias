import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import Sound from 'react-native-sound';
import RNSiriWaveView from 'react-native-siri-wave-view';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import HeaderElement from '../components/header-element';
import RoundButtonElement from '../components/round-button-element';
import TextElement from '../components/text-element';

let sound;

const Dialog = ({functionResume, functionExit, title}) => {
    return (
        <View style={ style.dialogWrapper }>
            <View style={ style.dialogHeader }>
                <HeaderElement title={ title }/>
            </View>
            <View style={ style.dialogButtons }>
                <TouchableOpacity onPress={ () => functionResume() } activeOpacity={ 0.7 }>
                    <RoundButtonElement text="Continuar" icon="radio" styleIcon={ {width: 70, height: 70} }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => functionExit() } activeOpacity={ 0.7 }>
                    <RoundButtonElement text="Sair" icon="close_black" styleIcon={ {width: 60, height: 60} }/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

class ListenMyStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            fileLoaded: false,
            isPlaying: false
        }
        this.exitStory = this.exitStory.bind(this);
        this.resume = this.resume.bind(this);
    }

    componentDidMount() {
        KeepAwake.activate();
        sound = new Sound(this.props.storySource, Sound.MAIN_BUNDLE, (error) => {
            if(error) {
                console.log("erro ao carregar arquivo");
            }
            else this.setState({ fileLoaded: true });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.isPlaying != nextState.isPlaying || this.state.fileLoaded != nextState.fileLoaded ||
           this.state.dialogVisible != nextState.dialogVisible) {
            return true;
        }
        else return false;
    }

    componentWillUnmount() {
        KeepAwake.deactivate();
        sound.stop();
        sound.release();
    }

    exitStory = () => {
        Actions.reset("home");
    }

    pause = (playing) => {
        if(playing) {
            this.setState({ dialogVisible: true }, () => {
                sound.pause();
            });
        }
    }

    resume = () => {
        this.setState({ dialogVisible: false }, () => {
            sound.play();
        });
    }

    play = (playing) => {
        setTimeout(() => {
            if(!playing) {
                if(this.state.fileLoaded) {
                    this.setState({ isPlaying: true }, () => {
                        sound.play(success => {
                            if(success) {
                                this.setState({ isPlaying: false })
                            }
                            else this.setState({ isPlaying: false });
                        });
                    });
                }
                else console.log("carregou não ó");
            }
        }, 100);
   }

   renderDialog = (visible) => {
       if(visible) {
           return (
               <Dialog functionResume={ this.resume } functionExit={ this.exitStory } title={ this.props.title }/>
           );
       }
       else return null;
   }

   renderSoundFeedback = () => {
        return (
            <View style={ style.soundFeedback }>
                <Image style={ {width: 90, height: 90} } source={ images["radio"] } resizeMode="contain"/>
                { this.state.isPlaying && <RNSiriWaveView type={ 0 } width={ 120 } height={ 40 } numberOfWaves={ 9 } startAnimation={ true } stopAnimation={ false } /> }
            </View>
        );
    }

    render() {
        return (
            <View style={ style.main }>
                { this.renderDialog(this.state.dialogVisible) }
                <HeaderElement title={ this.props.title }/>
                <TextElement text={ `História ${this.props.number}` } styleText={ style.textStoryTitle } viewText={ style.viewTextStoryTitle }/>
                <View style={ style.avatarPlaying }>
                    <Image style={ style.avatar } source={ images[this.props.userAvatar] } resizeMode="contain"/>
                    { this.renderSoundFeedback() }
                </View>
                <View style={ style.viewButtons }>
                    <TouchableOpacity onPress={ () => this.play(this.state.isPlaying) } activeOpacity={ this.state.isPlaying ? 1 : 0.7 }>
                        <RoundButtonElement text="Ouvir" icon="play" styleIcon={ {width: 60, height: 60, marginLeft: 10} } disabled={ this.state.isPlaying ? true : false }/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.pause(this.state.isPlaying) } activeOpacity={ this.state.isPlaying ? 0.7 : 1 }>
                        <RoundButtonElement text="Pausar" icon="pause" styleIcon={ {width: 60, height: 60} } disabled={ this.state.isPlaying ? false : true }/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        userAvatar: state.AvatarReducer.userAvatar
    }
);

const style = StyleSheet.create({
    avatar: {
        height: 220,
        width: 150
    },
    avatarPlaying: {
        flexDirection: "row",
        paddingHorizontal: 30,

        justifyContent: "space-between"
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
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    soundFeedback: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    },
    textStoryTitle: {
        fontSize: StyleUtils.option_button_font_size,
        color: StyleUtils.secondary_font_color,
        fontFamily: StyleUtils.font_bold
    },
    viewButtons: {
        width: 300,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 10
    },
    viewTextStoryTitle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 30
    }
});

export default connect(mapStateToProps, null)(ListenMyStory);
