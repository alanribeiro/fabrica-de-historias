import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import TextElement from './text-element';

export default props => (
    <View style={ style.feedbackWrapper }>
        <Animatable.View style={ [style.feedbackContainer, {height: props.icon == "success" ? 350 : 370}] } animation="zoomIn" duration={ 200 } easing="ease-in" useNativeDriver={ true }>
            <Image style={ style.iconStatus } source={ images[props.icon] } resizeMode="contain"/>
            <TextElement text={ props.message } styleText={ [style.statusText, {color: props.icon == "success" ? StyleUtils.options_yes_color : (props.icon == "error" ? StyleUtils.options_no_color : StyleUtils.alert_color)}] } viewText={ style.viewTextMessage }/>
            <TouchableOpacity style={ style.buttonClose } onPress={ () => props.disable() } activeOpacity={ 0.7 }>
                <Image style={ style.buttonCloseIcon } source={ images["close_white"] } resizeMode="contain"/>
                <TextElement text="Fechar" styleText={ style.buttonCloseText }/>
            </TouchableOpacity>
        </Animatable.View>
    </View>
);

const style = StyleSheet.create({
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
    feedbackContainer: {
        width: 320,
        borderRadius: 50,
        backgroundColor: StyleUtils.secondary_color
    },
    feedbackWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: StyleUtils.modal_background,
        position: "absolute",
        top: 0,
        zIndex: 2
    },
    iconStatus: {
        width: 130,
        height: 130,
        marginVertical: 20,
        alignSelf: "center"
    },
    statusText: {
        fontFamily: StyleUtils.font_bold,
        fontSize: StyleUtils.dialog_message_font_size,
        textAlign: "center"
    },
    viewTextMessage: {
        width: 300,
        alignSelf: "center"
    }
});
