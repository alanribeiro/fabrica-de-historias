import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as StyleUtils from '../utils/style-utils';
import { images } from '../utils/image-utils';
import TextElement from './text-element';

export default props => (
    <TouchableOpacity style={ style.main } onPress={ () => Actions.listenMyStory({ title: "Minhas Histórias", number: props.storyNumber, storySource: props.storySource  })} activeOpacity={ 0.7 }>
        <View style={ style.viewText }>
            <Image style={ style.styleIcon } source={ images["folder_story"] } resizeMode="contain"/>
            <TextElement text="História" styleText={ style.textButton }/>
            <TextElement text={ props.storyNumber } styleText={ style.textButton }/>
        </View>
    </TouchableOpacity>
);

const style = StyleSheet.create({
    main: {
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        backgroundColor: "#FFF",
        borderRadius: 20,
        margin: 10
    },
    styleIcon: {
        width: 90,
        height: 60
    },
    textButton: {
        fontSize: StyleUtils.option_button_font_size,
        color: StyleUtils.primary_font_color,
        fontFamily: StyleUtils.font_black
    },
    viewText: {
        alignItems: "center",
        justifyContent: "center"
    }
});
