import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import * as StyleUtils from '../utils/style-utils';
import LineElement from './line-element';
import TextElement from './text-element';

export default props => (
    <View style={ style.dialogWrapper }>
        <Animatable.View style={ style.dialogContainer } animation="zoomIn" duration={ 200 } easing="ease-in" useNativeDriver={ true }>
            <View style={ style.dialogHeader }>
                <TextElement text={ props.title } styleText={ style.title }/>
                <LineElement styleLine={ props.styleLine }/>
            </View>
            <View style={ style.dialogMessage }>
                <TextElement text={ props.message } styleText={ style.message }/>
            </View>
            <View style={ style.dialogButtons }>
                <TouchableOpacity style={ [style.dialogButton, {backgroundColor: StyleUtils.option_yes_color}] } onPress={ () => props.functionYes() } activeOpacity={ 0.7 }>
                    <TextElement text="Sim" styleText={ style.textButton }/>
                </TouchableOpacity>
                <TouchableOpacity style={ [style.dialogButton, {backgroundColor: StyleUtils.option_no_color}] } onPress={ () => props.functionNo() } activeOpacity={ 0.7 }>
                    <TextElement text="Não" styleText={ style.textButton }/>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    </View>
);

const style = StyleSheet.create({
    dialogButton: {
        width: 120,
        height: 70,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    dialogButtons: {
        position: "absolute",
        bottom: 10,
        width: 270,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dialogContainer: {
        width: 300,
        height: 250,
        backgroundColor: StyleUtils.secondary_color,
        borderRadius: 30
    },
    dialogHeader: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    dialogMessage: {
        width: 250,
        alignSelf: "center",
        flexWrap: "wrap"
    },
    dialogWrapper: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 2,
        backgroundColor: StyleUtils.modal_background
    },
    message: {
        fontFamily: StyleUtils.font_regular,
        color: StyleUtils.primary_font_color,
        fontSize: StyleUtils.dialog_message_font_size,
        textAlign: "center"
    },
    textButton: {
        fontFamily: StyleUtils.font_bold,
        color: StyleUtils.secondary_font_color,
        fontSize: StyleUtils.dialog_button_font_size
    },
    title: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.header_dialog_font_size,
        color: StyleUtils.primary_font_color
    }
});
