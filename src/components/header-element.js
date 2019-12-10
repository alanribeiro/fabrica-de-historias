import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as StyleUtils from '../utils/style-utils';
import TextElement from './text-element';

export default props => (
    <View style={ style.main }>
        <TouchableOpacity style={ style.backButtonWrapper } onPress={ () => Actions.pop() } activeOpacity={ 0.7 }>
            <TextElement text="Voltar" styleText={ style.backButtonText }/>
        </TouchableOpacity>
        <View style={ style.titleContainer }>
            <TextElement text={ props.title } styleText={ style.textHeader }/>
        </View>
    </View>
);

const style = StyleSheet.create({
    backButtonText: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.header_back_button_font_size,
        color: StyleUtils.primary_font_color
    },
    backButtonWrapper: {
        width: "30%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 3,
        borderRightColor: StyleUtils.primary_font_color
    },
    main: {
        height: 70,
        flexDirection: "row",
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    textHeader: {
        fontSize: StyleUtils.header_font_size,
        color: StyleUtils.primary_font_color,
        fontFamily: StyleUtils.font_bold
    },
    titleContainer: {
        width: "70%",
        height: 70,
        alignItems: "center",
        justifyContent: "center"
    }
});
