import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import * as StoryModuleUtils from '../utils/story-module-utils';
import * as StyleUtils from '../utils/style-utils';
import { hideStoryActivatedFeedback, showStoryActivatedFeedback } from '../data/actions/story-actions';
import HeaderElement from '../components/header-element';
import StatusFeedbackElement from '../components/status-feedback-element';
import StoryElement from '../components/story-element';

class ListenStory extends Component {
    constructor(props) {
        super(props);
        this.disableAlert = this.disableAlert.bind(this);
        this.enableAlert = this.enableAlert.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.questionsActivated != nextProps.questionsActivated ||
           this.props.storyActivated != nextProps.storyActivated ||
           this.props.storyActivatedFeedbackVisible != nextProps.storyActivatedFeedbackVisible) {
               return true;
        }
        else return false;
    }

    componentWillUnmount() {
        if(this.props.storyActivatedFeedbackVisible) {
            this.props.hideStoryActivatedFeedback();
        }
    }

    disableAlert = () => {
        this.props.hideStoryActivatedFeedback();
    }

    enableAlert = () => {
        this.props.showStoryActivatedFeedback();
    }

    render() {
        return (
            <View style={ style.main }>
                { this.props.storyActivatedFeedbackVisible && <StatusFeedbackElement icon="alert" disable={ this.disableAlert } message={ `As perguntas da história ${this.props.storyActivated} não foram respondidas.` }/> }
                <HeaderElement title={ this.props.title }/>
                <View style={ style.viewStories }>
                    <StoryElement title={ StoryModuleUtils.story1.title } story={ StoryModuleUtils.story1 } questionsActivated={ this.props.questionsActivated } storyActivated={ this.props.storyActivated } enableAlert={ this.enableAlert }/>
                    <StoryElement title={ StoryModuleUtils.story2.title } story={ StoryModuleUtils.story2 } questionsActivated={ this.props.questionsActivated } storyActivated={ this.props.storyActivated } enableAlert={ this.enableAlert }/>
                    <StoryElement title={ StoryModuleUtils.story3.title } story={ StoryModuleUtils.story3 } questionsActivated={ this.props.questionsActivated } storyActivated={ this.props.storyActivated } enableAlert={ this.enableAlert }/>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        hideStoryActivatedFeedback: () => dispatch(hideStoryActivatedFeedback()),
        showStoryActivatedFeedback: () => dispatch(showStoryActivatedFeedback())
    }
);

const mapStateToProps = state => (
    {
        questionsActivated: state.StoryReducer.questionsActivated,
        storyActivated: state.StoryReducer.storyActivated,
        storyActivatedFeedbackVisible: state.StoryReducer.storyActivatedFeedbackVisible
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListenStory);
