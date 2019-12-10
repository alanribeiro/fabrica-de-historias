import React, { Component } from 'react';
import { Reducer, Router, Scene, Stack, ActionConst, Actions } from 'react-native-router-flux';

import ChangeAvatar from './src/pages/change-avatar';
import Home from './src/pages/home';
import ListenStory from './src/pages/listen-story';
import ListenMyStory from './src/pages/listen-my-story';
import MoreOptions from './src/pages/more-options';
import MyStories from './src/pages/my-stories';
import NeedHelp from './src/pages/need-help';
import Results from './src/pages/results';
import ResultsDetails from './src/pages/results-details';
import ResultsPage from './src/pages/results-page';
import StoryPage from './src/pages/story-page';
import TellStory from './src/pages/tell-story';
import ListenStoryTutorialPage from './src/pages/tutorial/listen-story-tutorial-page';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action, dispatch) => {
        return defaultReducer(state, action);
    };
}

export default class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router createReducer={ reducerCreate }>
                <Stack key='root'>
                    <Scene key='changeAvatar' component={ ChangeAvatar } back hideNavBar/>
                    <Scene key='home' component={ Home } initial back hideNavBar onEnter={ () => Actions.refresh({ key: Math.random() }) }/>
                    <Scene key='listenStory' component={ ListenStory } back hideNavBar/>
                    <Scene key='listenMyStory' component={ ListenMyStory } back hideNavBar/>
                    <Scene key='listenStoryTutorialPage' component={ ListenStoryTutorialPage } back hideNavBar/>
                    <Scene key='moreOptions' component={ MoreOptions } back hideNavBar onEnter={ () => Actions.refresh({ key: Math.random() }) }/>
                    <Scene key='myStories' component={ MyStories } back hideNavBar/>
                    <Scene key='needHelp' component={ NeedHelp } back hideNavBar/>
                    <Scene key='results' component={ Results } back hideNavBar/>
                    <Scene key='resultsDetails' component={ ResultsDetails } back hideNavBar/>
                    <Scene key='resultsPage' component={ ResultsPage } back hideNavBar/>
                    <Scene key='storyPage' component={ StoryPage } back hideNavBar/>
                    <Scene key='tellStory' component={ TellStory } back hideNavBar/>
                </Stack>
            </Router>
        );
    }
}
