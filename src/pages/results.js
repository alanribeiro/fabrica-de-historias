import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import * as StoryModuleUtils from '../utils/story-module-utils';
import * as StyleUtils from '../utils/style-utils';
import HeaderElement from '../components/header-element';
import StoryResultsElement from '../components/story-results-element';

export default props => (
    <View style={ style.main }>
        <HeaderElement title={ props.title }/>
        <View style={ style.viewStories }>
            <StoryResultsElement title={ StoryModuleUtils.story1.title } story={ StoryModuleUtils.story1 }/>
            <StoryResultsElement title={ StoryModuleUtils.story2.title } story={ StoryModuleUtils.story2 }/>
            <StoryResultsElement title={ StoryModuleUtils.story3.title } story={ StoryModuleUtils.story3 }/>
        </View>
    </View>
);

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: StyleUtils.primary_color
    },
    viewStories: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20
    }
});
