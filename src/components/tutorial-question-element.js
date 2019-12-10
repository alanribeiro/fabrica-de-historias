import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import * as StyleUtils from '../utils/style-utils';
import TextElement from './text-element';

export default props => (
    <TouchableOpacity onPress={ () => props.function() } activeOpacity={ 0.7 }>
        <View style={ style.main }>
            <View style={ style.questionBullet }></View>
            <TextElement text={ props.question } styleText={ style.questionText } viewText={ style.viewQuestionText }/>
        </View>
    </TouchableOpacity>
);

const style = StyleSheet.create({
    main: {
        height: 70,
        flexDirection: "row",
        marginBottom: 10
    },
    questionBullet: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: StyleUtils.secondary_color,
        marginTop: 10,
        marginHorizontal: 10
    },
    questionText: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.tutorial_question_font_size,
        color: StyleUtils.secondary_font_color
    },
    viewQuestionText: {
        width: 310
    }
});
