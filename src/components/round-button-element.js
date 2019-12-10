import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import TextElement from './text-element';

export default props => (
    <View style={ style.buttonContainer }>
        <View style={ [style.button, {opacity: props.disabled ? 0.7 : 1}] }>
            <Image style={ props.styleIcon } source={ images[props.icon] } resizeMode="contain"/>
        </View>
        <TextElement text={ props.text } styleText={ [style.textButton, {opacity: props.disabled ? 0.7 : 1}] }/>
    </View>
);

const style = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 110,
        height: 110,
        backgroundColor: "#FFF",
        borderRadius: 55
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    textButton: {
        fontSize: StyleUtils.round_button_font_size,
        color: StyleUtils.secondary_font_color,
        fontFamily: StyleUtils.font_bold
    }
});
