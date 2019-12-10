import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as StyleUtils from '../utils/style-utils';
import TextElement from './text-element';

export default props => (
    <View style={ style.main }>
        <TextElement text={ props.title } styleText={ style.title } viewText={ style.viewTitle }/>
    </View>
);

const style = StyleSheet.create({
    main: {
        width: 150,
        height: 80,
        margin: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: StyleUtils.secondary_color
    },
    title: {
        textAlign: "center",
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.primary_font_color,
        fontSize: StyleUtils.question_option_font_size
    },
    viewTitle: {
        width: 140
    }
});
