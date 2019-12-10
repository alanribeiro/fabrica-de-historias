import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import TextElement from './text-element';

export default props => (
    <View style={ style.button }>
        <View style={ style.viewText }>
            <Image style={ props.styleIcon } source={ images[props.icon] } resizeMode="contain"/>
            <TextElement text={ props.title } styleText={ style.textButton } viewText={ style.viewTitle }/>
        </View>
    </View>
);

const style = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        backgroundColor: StyleUtils.secondary_color,
        borderRadius: 20
    },
    textButton: {
        textAlign: "center",
        fontSize: StyleUtils.option_button_font_size,
        color: StyleUtils.primary_font_color,
        fontFamily: StyleUtils.font_black
    },
    viewText: {
        alignItems: "center",
        justifyContent: "center"
    },
    viewTitle: {
        width: 140
    }
});
