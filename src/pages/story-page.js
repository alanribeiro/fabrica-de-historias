import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Tts from 'react-native-tts';
import KeepAwake from 'react-native-keep-awake';
import RNSiriWaveView from 'react-native-siri-wave-view';

import * as ConfigurationUtils from '../utils/configuration-utils';
import * as StyleUtils from '../utils/style-utils';
import { activateStoryQuestions, deactivateStoryQuestions, hideStoryQuestionsDialog, registerStoryResults, registerUserAnswer, showStoryQuestionsDialog, userAcceptedQuestions } from '../data/actions/story-actions';
import { images } from '../utils/image-utils';
import DialogElement from '../components/dialog-element';
import HeaderElement from '../components/header-element';
import RoundButtonElement from '../components/round-button-element';
import QuestionOptionElement from '../components/question-option-element';
import TextElement from '../components/text-element';

const DialogEndStory = ({userAvatar, functionFinish}) => {
    return (
        <View style={ style.dialogEndWrapper }>
            <Animatable.View style={ style.dialogEndContent }>
                <Image style={ {width: 150, height: 150, marginVertical: 10} } source={ images[userAvatar] } resizeMode="contain"/>
                <TextElement text="OBRIGADO!" styleText={ {fontFamily: StyleUtils.font_bold, fontSize: 28, color: StyleUtils.primary_font_color} } viewText={ {marginVertical: 10} }/>
                <TouchableOpacity style={ style.buttonClose } onPress={ () => functionFinish() } activeOpacity={ 0.7 }>
                    <Image style={ style.buttonCloseIcon } source={ images["close_white"] } resizeMode="contain"/>
                    <TextElement text="Fechar" styleText={ style.buttonCloseText }/>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

class StoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            isPlaying: false
        }
        this.acceptQuestions = this.acceptQuestions.bind(this);
        this.disableDialog = this.disableDialog.bind(this);
        this.exitStory = this.exitStory.bind(this);
    }

    componentDidMount() {
        KeepAwake.activate();
        if(this.props.questionsActivated && !this.props.questionsAccepted) {
            this.props.deactivateStoryQuestions();
        }
        const voice = this.props.userAvatar == "male_avatar_black" || this.props.userAvatar == "male_avatar_white" ? ConfigurationUtils.male_voice : ConfigurationUtils.female_voice;
        Tts.setDefaultLanguage('pt-BR');
        Tts.setDefaultVoice(voice);
        Tts.setDefaultRate(0.5);
        Tts.setDucking(true);
        Tts.addEventListener('tts-finish', event => {
            if(this.props.questionsActivated) {
                if(this.props.questionsAccepted) {
                    this.setState({ isPlaying: false });
                }
                else this.setState({ isPlaying: false}, () => this.props.showStoryQuestionsDialog());
            }
            else this.setState({ isPlaying: false}, () => this.props.activateStoryQuestions(JSON.parse(this.props.story).title));
        });
        Tts.addEventListener('tts-cancel', event => this.setState({ isPlaying: false }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.questionsActivated != nextProps.questionsActivated) {
            if(nextProps.questionsActivated) {
                Tts.getInitStatus().then(() => {
                    this.setState({ isPlaying: true }, () => {
                        Tts.speak(`Agora vamos fazer uma atividade de responder as perguntas da história.
                                   Se você quer participar. Aperte no Sim. Se não quiser. Aperte no não.`);
                    });
                }).catch(err => err);
            }
            return true;
        }
        if(this.props.currentQuestion != nextProps.currentQuestion) {
            if(nextProps.currentQuestion < 20) {
                this.speechQuestion(JSON.parse(this.props.story).questions[nextProps.currentQuestion]);
            }
            return true;
        }
        if(this.state.isPlaying != nextState.isPlaying || this.state.dialogVisible != nextState.dialogVisible ||
           this.props.questionsAccepted != nextProps.questionsAccepted || this.props.dialogVisible != nextProps.dialogVisible ||
           this.props.userScore != nextProps.userScore) {
            return true;
        }
        else return false;
    }

    componentWillUnmount() {
        KeepAwake.deactivate();
        Tts.stop();
        Tts.removeEventListener('tts-finish', event => {
            if(this.props.questionsActivated) {
                if(this.props.questionsAccepted) {
                    this.setState({ isPlaying: false });
                }
                else this.setState({ isPlaying: false}, () => this.props.showStoryQuestionsDialog());
            }
            else this.setState({ isPlaying: false}, () => this.props.activateStoryQuestions(JSON.parse(this.props.story).title));
        });
        Tts.removeEventListener('tts-cancel', event => this.setState({ isPlaying: false }));
    }

    acceptQuestions = async () => {
        await this.props.userAcceptedQuestions();
        this.props.hideStoryQuestionsDialog();
        this.speechQuestion(JSON.parse(this.props.story).questions[this.props.currentQuestion]);
    }

    checkAnswer = (answer) => {
        Tts.stop();
        this.setState({ isPlaying: false }, () => {
            const correctAnswer = JSON.parse(this.props.story).answers[this.props.currentQuestion];
            const points = answer == correctAnswer ? JSON.parse(this.props.story).points[this.props.currentQuestion] : 0;
            this.props.registerUserAnswer(points);
        });
    }

    disableDialog = () => {
        this.setState({ dialogVisible: false });
    }

    exitStory = async () => {
        await Tts.stop();
        await this.props.hideStoryQuestionsDialog();
        await this.props.deactivateStoryQuestions();
        Actions.reset("home");
    }

    renderAvatar = (playing) => {
        return (
            <View style={ style.avatarPlaying }>
                <Image style={ [style.avatar, {position: !playing ? "relative" : "absolute", zIndex: !playing ? 1 : 0, opacity: !playing ? 1 : 0}] } source={ images[this.props.userAvatar] } resizeMode="contain" fadeDuration={ 0 }/>
                <Image style={ [style.avatar, {position: playing ? "relative" : "absolute", zIndex: playing ? 1 : 0, opacity: playing ? 1 : 0}] } source={ images[`${this.props.userAvatar}_talk`] } resizeMode="contain" fadeDuration={ 0 }/>
                { this.renderSoundFeedback() }
            </View>
        );
    }

    renderAvatarQuestions = (playing) => {
        if(this.props.currentQuestion < 18) {
            return (
                <View style={ [style.avatarPlaying, {width: 300, alignSelf: "center"}] }>
                    <Image style={ [style.avatarQuestions, {marginVertical: 10, position: !playing ? "relative" : "absolute", zIndex: !playing ? 1 : 0, opacity: !playing ? 1 : 0}] } source={ images[this.props.userAvatar] } resizeMode="contain" fadeDuration={ 0 }/>
                    <Image style={ [style.avatarQuestions, {marginVertical: 10, position: playing ? "relative" : "absolute", zIndex: playing ? 1 : 0, opacity: playing ? 1 : 0}] } source={ images[`${this.props.userAvatar}_talk`] } resizeMode="contain" fadeDuration={ 0 }/>
                    { this.renderSoundFeedback() }
                </View>
            );
        }
        else return null;
    }

    renderDialog = (playing, visible) => {
        if(playing) {
            if(visible) {
                return (
                    <DialogElement title="Sair" styleLine={ style.line } message="Você quer parar de ouvir a história e sair?" functionYes={ this.exitStory } functionNo={ this.disableDialog } />
                );
            }
            else return null;
        }
        else return null;
    }

    renderDialogEndStory = (index) => {
        if(index == 20) {
            const results = {
                story: JSON.parse(this.props.story).title,
                score: this.props.userScore,
                date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
            }
            this.props.registerStoryResults(JSON.parse(this.props.story).number, results);
            return (
                <DialogEndStory userAvatar={ this.props.userAvatar } functionFinish={ this.exitStory }/>
            );
        }
        else return null;
    }

    renderDialogQuestion = (visible) => {
        if(visible) {
            return (
                <DialogElement title="Perguntas" styleLine={ style.line } message="Você quer responder as perguntas dessa história?" functionYes={ this.acceptQuestions } functionNo={ this.exitStory } />
            );
        }
        else return null;
    }

    renderSoundFeedback = () => {
        return (
            <View style={ style.soundFeedback }>
                <Image style={ this.props.questionsActivated ? {width: 70, height: 70} : {width: 90, height: 90} } source={ images["radio"] } resizeMode="contain" fadeDuration={ 0 }/>
                { this.state.isPlaying && <RNSiriWaveView type={ 0 } width={ this.props.questionsActivated ? 100 : 120 } height={ 40 } numberOfWaves={ 9 } startAnimation={ true } stopAnimation={ false } />}
            </View>
        );
    }

    renderQuestion = (accepted, question, data) => {
        if(accepted) {
            return (
                <View>
                    { this.renderQuestionHeader(this.props.currentQuestion, question) }
                    <FlatList
                    data={ data }
                    numColumns={ 2 }
                    contentContainerStyle={ style.questionOptions }
                    renderItem={ ({item}) => {
                        return (
                            <TouchableOpacity onPress={ () => this.checkAnswer(item) } activeOpacity={ 0.7 }>
                                <QuestionOptionElement title={ item }/>
                            </TouchableOpacity>
                        );
                    } }
                    keyExtractor={ item => data.indexOf(item).toString() }
                    />
                </View>
            );
        }
        else return (
            <View style={ style.viewQuestionsPresentation }>
                <View style={ {width: 120, height: 120, borderRadius: 60, backgroundColor: "#FFF", marginVertical: 20} }>
                    <Image style={ {width: 120, height: 120} } source={ images["question"] } resizeMode="contain"/>
                </View>
                <TextElement text="PERGUNTAS" styleText={ style.textQuestionsPresentation }/>
            </View>
        );
    }

    renderQuestionHeader = (index, question) => {
        if(index > 17) {
            return (
                <View style={ {width: 220, height: 220, backgroundColor: "rgba(255, 255, 255, 0.4)", alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 10} }>
                    <Image style={ {width: 200, height: 200} } source={ index == 18 ? images["watch"] : images["shoe"] } resizeMode="contain"/>
                </View>
            );
        }
        else return (
            <TextElement text={ this.props.currentQuestion == 15 ? question.substring(23, question.length) : question } styleText={ [style.textStoryTitle, {textAlign: "center"}] } viewText={ style.viewTextQuestionTitle }/>
        );
    }

    speech = (playing) => {
        if(!playing) {
            Tts.getInitStatus().then(() => {
                this.setState({ isPlaying: true }, () => {
                    Tts.speak(JSON.parse(this.props.story).text);
                });
            }).catch(err => error);
        }
    }

    speechQuestion = (question) => {
        Tts.getInitStatus().then(() => {
            this.setState({ isPlaying: true }, () => {
                Tts.speak(question);
            });
        }).catch(err => err);
    }

    render() {
        if(this.props.questionsActivated) {
            return (
                <View style={ style.main }>
                    { this.renderDialogQuestion(this.props.dialogVisible) }
                    { this.renderDialogEndStory(this.props.currentQuestion) }
                    <HeaderElement title={ this.props.title }/>
                    <ImageBackground source={ JSON.parse(this.props.story).background } style={ style.storyContent }>
                        <TextElement text={ JSON.parse(this.props.story).title } styleText={ style.textStoryTitle } viewText={ style.viewTextStoryTitleQuestions }/>
                        { this.renderAvatarQuestions(this.state.isPlaying) }
                        { this.renderQuestion(this.props.questionsAccepted, JSON.parse(this.props.story).questions[this.props.currentQuestion], JSON.parse(this.props.story).options[this.props.currentQuestion]) }
                    </ImageBackground>
                </View>
            );
        }
        else return (
            <View style={ style.main }>
                { this.renderDialog(this.state.isPlaying, this.state.dialogVisible) }
                <HeaderElement title={ this.props.title }/>
                <ImageBackground source={ JSON.parse(this.props.story).background } style={ style.storyContent }>
                    <TextElement text={ JSON.parse(this.props.story).title } styleText={ style.textStoryTitle } viewText={ style.viewTextStoryTitle }/>
                    { this.renderAvatar(this.state.isPlaying) }
                    <View style={ style.viewButtons }>
                        <TouchableOpacity onPress={ () => this.speech(this.state.isPlaying) } activeOpacity={ this.state.isPlaying ? 1 : 0.7 }>
                            <RoundButtonElement text="Ouvir" icon="play" styleIcon={ {width: 60, height: 60, marginLeft: 10} } disabled={ this.state.isPlaying ? true : false }/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => this.setState({ dialogVisible: this.state.isPlaying ? true : false }) } activeOpacity={ this.state.isPlaying ? 0.7 : 1 }>
                            <RoundButtonElement text="Parar" icon="stop" styleIcon={ {width: 60, height: 60} } disabled={ this.state.isPlaying ? false : true }/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        activateStoryQuestions: (story) => dispatch(activateStoryQuestions(story)),
        deactivateStoryQuestions: () => dispatch(deactivateStoryQuestions()),
        hideStoryQuestionsDialog: () => dispatch(hideStoryQuestionsDialog()),
        registerStoryResults: (story, result) => dispatch(registerStoryResults(story, result)),
        registerUserAnswer: (points) => dispatch(registerUserAnswer(points)),
        showStoryQuestionsDialog: () => dispatch(showStoryQuestionsDialog()),
        userAcceptedQuestions: () => dispatch(userAcceptedQuestions())
    }
);

const mapStateToProps = state => (
    {
        currentQuestion: state.StoryReducer.currentQuestion,
        dialogVisible: state.StoryReducer.dialogVisible,
        questionsActivated: state.StoryReducer.questionsActivated,
        questionsAccepted: state.StoryReducer.questionsAccepted,
        userAvatar: state.AvatarReducer.userAvatar,
        userScore: state.StoryReducer.userScore
    }
);

const style = StyleSheet.create({
    avatar: {
        height: 220,
        width: 150
    },
    avatarQuestions: {
        width: 120,
        height: 140
    },
    avatarPlaying: {
        flexDirection: "row",
        paddingHorizontal: 30,
        justifyContent: "space-between"
    },
    buttonClose: {
        width: 180,
        height: 80,
        borderRadius: 50,
        position: "absolute",
        bottom: 10,
        alignSelf: "center",
        backgroundColor: StyleUtils.tertiary_color,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonCloseIcon: {
        width: 30,
        height: 30,
        marginHorizontal: 10
    },
    buttonCloseText: {
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color,
        fontSize: StyleUtils.function_button_font_size
    },
    dialogEndContent: {
        width: 320,
        height: 320,
        borderRadius: 50,
        backgroundColor: StyleUtils.secondary_color,
        alignItems: "center"
    },
    dialogEndWrapper: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: StyleUtils.modal_background,
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        zIndex: 2
    },
    line: {
        width: 270,
        alignSelf: "center",
        borderBottomWidth: 3,
        borderBottomColor: StyleUtils.primary_color
    },
    main: {
        flex: 1
    },
    questionOptions: {
        flexDirection: "column",
        alignItems: "center"
    },
    soundFeedback: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    },
    storyContent: {
        flex: 1
    },
    textQuestionsPresentation: {
        fontSize: StyleUtils.question_presentation_font_size,
        color: StyleUtils.secondary_font_color,
        fontFamily: StyleUtils.font_bold
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
    viewOptions: {
        width: 300,
        backgroundColor: "purple",
        alignSelf: "center",
        alignItems: "center"
    },
    viewQuestionsPresentation: {
        width: Dimensions.get("window").width,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: 30
    },
    viewTextStoryTitle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 30
    },
    viewTextQuestionTitle: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        paddingHorizontal: 10
    },
    viewTextStoryTitleQuestions: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
