import React from 'react';
import { InteractionManager, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as StyleUtils from '../utils/style-utils';
import TextElement from './text-element';

export default props => (
    <TouchableOpacity style={ style.button } onPress={ () => {
        InteractionManager.runAfterInteractions(() => {
            if(props.questionsActivated) {
                if(props.storyActivated != props.title) {
                    props.enableAlert();
                }
                else Actions.storyPage({title: "Ouvir História", story: JSON.stringify(props.story)});
            }
            else Actions.storyPage({title: "Ouvir História", story: JSON.stringify(props.story)});
        });
    } } activeOpacity={ 0.7 }>
        <Image style={ style.thumbnail } source={ props.story.thumbnail } resizeMode="contain"/>
        <TextElement text={ props.title } styleText={ style.textButton }/>
    </TouchableOpacity>
);

const style = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 320,
        height: 140,
        backgroundColor: StyleUtils.secondary_color,
        borderRadius: 20,
    },
    textButton: {
        fontSize: StyleUtils.option_button_font_size,
        color: StyleUtils.primary_font_color,
        fontWeight: "bold"
    },
    thumbnail: {
        width: 300,
        height: 100
    }
});
