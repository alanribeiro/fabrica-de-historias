import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Tts from 'react-native-tts';
import KeepAwake from 'react-native-keep-awake';

import * as ConfigurationUtils from '../../utils/configuration-utils';
import * as StyleUtils from '../../utils/style-utils';
import * as TutorialUtils from '../../utils/tutorial-utils';
import { images } from '../../utils/image-utils';
import DialogElement from '../../components/dialog-element';
import HeaderElement from '../../components/header-element';
import TextElement from '../../components/text-element';

const TutorialOptionButton = ({icon, title, styleIcon, disable}) => {
    return (
        <View style={ [style.button, {opacity: disable ? 0.5 : 1}] }>
            <View style={ style.viewText }>
                <Image style={ styleIcon } source={ images[icon] } resizeMode="contain"/>
                <TextElement text={ title } styleText={ style.textButton } viewText={ style.viewTitle }/>
            </View>
        </View>
    );
}

const TutorialRoundButton = ({text, icon, styleIcon, disabled}) => {
    return (
        <View style={ {alignItems: "center", justifyContent: "center"} }>
            <View style={ {alignItems: "center", justifyContent: "center", width: 110, height: 110, backgroundColor: "#FFF", borderRadius: 55, opacity: disabled ? 0.7 : 1} }>
                <Image style={ styleIcon } source={ images[icon] } resizeMode="contain"/>
            </View>
            <TextElement text={ text } styleText={ {opacity: disabled ? 0.7 : 1, fontSize: StyleUtils.round_button_font_size, color: StyleUtils.secondary_font_color, fontFamily: StyleUtils.font_bold} }/>
        </View>
    );
}

const TutorialStoryElement = ({thumbnail, title, disable}) => {
    return (
        <View style={ {alignItems: "center", justifyContent: "center", width: 320, height: 140, backgroundColor: StyleUtils.secondary_color, borderRadius: 20, opacity: disable ? 0.5 : 1} }>
            <Image style={ {width: 300, height: 100} } source={ thumbnail } resizeMode="contain"/>
            <TextElement text={ title } styleText={ {fontSize: StyleUtils.option_button_font_size, color: StyleUtils.primary_font_color, fontWeight: "bold"} }/>
        </View>
    );
}

class TutorialPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            handActive: false,
            listenStoryPage: 0
        }
    }

    componentDidMount() {
        KeepAwake.activate();
        const voice = this.props.userAvatar == "male_avatar_black" || this.props.userAvatar == "male_avatar_white" ? ConfigurationUtils.male_voice : ConfigurationUtils.female_voice;
        Tts.setDefaultLanguage('pt-BR');
        Tts.setDefaultVoice(voice);
        Tts.setDefaultRate(0.5);
        Tts.setDucking(true);
        Tts.addEventListener('tts-finish', () => this.setState({ handActive: true }));
        Tts.addEventListener('tts-cancel', event => false);
        this.speech(TutorialUtils.listen_story.firstPage);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.dialogVisible != nextState.dialogVisible ||
           this.state.handActive != nextState.handActive ||
           this.state.listenStoryPage != nextState.listenStoryPage) {
                return true;
        }
        else return false;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.listenStoryPage != prevState.listenStoryPage) {
            if(this.state.listenStoryPage == 1) {
                this.speech(TutorialUtils.listen_story.secondPage);
            }
            else if(this.state.listenStoryPage == 2) {
                this.speech(TutorialUtils.listen_story.thirdPage);
            }
        }
    }

    componentWillUnmount() {
        KeepAwake.deactivate();
        Tts.removeEventListener('tts-finish', () => this.setState({ handActive: true }));
        Tts.removeEventListener('tts-cancel', event => false);
    }

    renderDialog = (visible) => {
        if(visible) {
            return (
                <DialogElement title="Sair" styleLine={ style.line } message="Você ainda tem alguma dúvida?" functionYes={ () => Actions.reset("needHelp") } functionNo={ () => Actions.reset("home") } />
            );
        }
        else return null;
    }

    renderHand = (active, marginTop) => {
        if(active) {
            return (
                <TouchableOpacity style={ {position: "absolute", top: marginTop, zIndex: 2} } onPress={ () => {
                    if(this.state.listenStoryPage < 2) {
                        this.setState({ handActive: false, listenStoryPage: this.state.listenStoryPage + 1 });
                    }
                    else this.setState({ handActive: false, dialogVisible: true});
                } } activeOpacity={ 1 }>
                    <Animatable.Image animation="pulse" iterationCount="infinite" easing="ease-out" useNativeDriver={ true }  style={ {width: 150, height: 150} } source={ images["hand"] } resizeMode="contain"/>
                </TouchableOpacity>
            );
        }
        else return null;
    }

    renderTutorial = (page) => {
            if(page == 0) {
                return (
                    <View style={ {flex: 1} }>
                        <View style={ style.rowButtons }>
                            <TouchableOpacity onPress={ () => {
                                if(this.state.handActive) {
                                    this.setState({ handActive: false, listenStoryPage: this.state.listenStoryPage + 1 });
                                }
                            } } activeOpacity={ 0.7 }>
                                <TutorialOptionButton title="Ouvir História" icon="radio" styleIcon={ {width: 60, height: 60} } disable={ false }/>
                            </TouchableOpacity>
                            { this.renderHand(this.state.handActive, 60) }
                            <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                                <TutorialOptionButton title="Contar História" icon="microphone" styleIcon={ {width: 60, height: 60} } disable={ true }/>
                            </TouchableOpacity>
                        </View>
                        <View style={ style.rowButtons }>
                            <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                                <TutorialOptionButton title="Histórias Gravadas" icon="folder_story" styleIcon={ {width: 70, height: 70} } disable={ true }/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                                <TutorialOptionButton title="Mudar Personagem" icon="male_avatar_black" styleIcon={ {width: 55, height: 55} } disable={ true }/>
                            </TouchableOpacity>
                        </View>
                        <View style={ style.rowButtons }>
                            <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                                <TutorialOptionButton title="Mais Opções" icon="more" styleIcon={ {width: 55, height: 55} } disable={ true }/>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
            else if(page == 1) {
                return (
                    <View style={ {flex: 1, alignItems: "center", justifyContent: "space-between", paddingVertical: 20} }>
                        { this.renderHand(this.state.handActive, 60) }
                        <TouchableOpacity onPress={ () => {
                            if(this.state.handActive) {
                                this.setState({ handActive: false, listenStoryPage: this.state.listenStoryPage + 1 });
                            }
                        }} activeOpacity={ 0.7 }>
                            <TutorialStoryElement title="Casamento da Joana" thumbnail={ require("../../assets/elements/stories/thumbnail1.png") } disable={ false }/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                            <TutorialStoryElement title="O melhor soltador de pião" thumbnail={ require("../../assets/elements/stories/thumbnail2.png") } disable={ true }/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                            <TutorialStoryElement title="Passeio no Cedro" thumbnail={ require("../../assets/elements/stories/thumbnail3.png") } disable={ true }/>
                        </TouchableOpacity>
                    </View>
                );
            }
            else if(page == 2) {
                return (
                    <ImageBackground source={ require("../../assets/elements/stories/story1.png") } style={ {flex: 1} }>
                        <TextElement text="Casamento da Joana" styleText={ {fontSize: StyleUtils.option_button_font_size, color: StyleUtils.secondary_font_color, fontFamily: StyleUtils.font_bold, textAlign: "center"} }/>
                        <View style={ {width: 300, alignSelf: "center", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center"} }>
                            <Image style={ {marginVertical: 10, width: 150, height: 220} } source={ images[this.props.userAvatar] } resizeMode="contain" fadeDuration={ 0 }/>
                            <Image style={ {width: 90, height: 90} } source={ images["radio"] } resizeMode="contain"/>
                        </View>
                        <View style={ {width: 300, alignSelf: "center", flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 10} }>
                            <TouchableOpacity onPress={ () => false } activeOpacity={ 0.7 }>
                                <TutorialRoundButton text="Ouvir" icon="play" styleIcon={ {width: 60, height: 60, marginLeft: 10} } disabled={ false }/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => false } activeOpacity={ 1 }>
                                <TutorialRoundButton text="Parar" icon="stop" styleIcon={ {width: 60, height: 60} } disabled={ true }/>
                            </TouchableOpacity>
                            { this.renderHand(this.state.handActive) }
                        </View>
                    </ImageBackground>
                );
            }
    }

    speech = (text) => {
        Tts.getInitStatus().then(() => {
            Tts.speak(text);
        }).catch(err => error);
    }

    render() {
        return (
            <View style={ style.main }>
                <HeaderElement title="Ajuda"/>
                { this.renderDialog(this.state.dialogVisible) }
                { this.renderTutorial(this.state.listenStoryPage) }
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
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 135,
        height: 135,
        backgroundColor: StyleUtils.secondary_color,
        borderRadius: 20
    },
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    rowButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15
    },
    textButton: {
        textAlign: "center",
        fontSize: StyleUtils.option_button_font_size - 5,
        color: StyleUtils.primary_font_color,
        fontFamily: StyleUtils.font_black
    },
    viewText: {
        alignItems: "center",
        justifyContent: "center"
    },
    viewTitle: {
        width: 120
    }
});

export default connect(mapStateToProps, null)(TutorialPage);
