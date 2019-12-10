import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as StyleUtils from '../utils/style-utils';
import HeaderElement from '../components/header-element';
import TextElement from '../components/text-element';
import TutorialQuestionElement from '../components/tutorial-question-element';

export default props => (
    <View style={ style.main }>
        <HeaderElement title={ props.title }/>
        <TextElement text="Qual a sua dúvida?" styleText={ style.textTitle }/>
        <View>
            <TutorialQuestionElement question="Como ouvir uma história?" tutorial="listen-story" function={ () => Actions.listenStoryTutorialPage() }/>
            <TutorialQuestionElement question="Como contar uma história?" tutorial="tell-story"/>
            <TutorialQuestionElement question="Como ouvir uma história que eu gravei?" tutorial="my-stories"/>
            <TutorialQuestionElement question="Como trocar o personagem?" tutorial="change-avatar"/>
        </View>
    </View>
);

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    textTitle: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.header_title_font_size,
        color: StyleUtils.secondary_font_color,
        textAlign: "center",
        marginVertical: 10
    }
});
