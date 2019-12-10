import * as ActionTypes from '../types';
import { storeData } from '../../routines/async-storage-routine';

const INITIAL_STATE = {
    currentQuestion: 0,
    dialogVisible: false,
    fetchedStories: false,
    questionsActivated: false,
    questionsAccepted: false,
    storyActivated: null,
    storyActivatedFeedbackVisible: false,
    userScore: 0,
    userStories: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.ACTIVATE_STORY_QUESTIONS:
            return { ...state, questionsActivated: true, storyActivated: action.payload }

        case ActionTypes.DEACTIVATE_STORY_QUESTIONS:
            return { ...state, currentQuestion: 0, dialogVisible: false, questionsAccepted: false, questionsActivated: false, storyActivated: null, userScore: 0 }

        case ActionTypes.FETCH_USER_STORIES:
            return { ...state, fetchedStories: true, userStories: action.payload.reverse() }

        case ActionTypes.HIDE_STORY_ACTIVATED_FEEDBACK:
            return { ...state, storyActivatedFeedbackVisible: false }

        case ActionTypes.HIDE_STORY_QUESTIONS_DIALOG:
            return { ...state, dialogVisible: false }

        case ActionTypes.REGISTER_USER_ANSWER:
            return { ...state, currentQuestion: state.currentQuestion + 1, userScore: state.userScore + action.payload }

        case ActionTypes.SAVE_USER_STORY:
            let stories = state.userStories;
            const story = {
                number: stories.length,
                source: action.payload
            }
            stories.push(story);
            storeData("user_stories", JSON.stringify(stories));
            return { ...state, userStories: stories }

        case ActionTypes.SHOW_STORY_ACTIVATED_FEEDBACK:
            return { ...state, storyActivatedFeedbackVisible: true }

        case ActionTypes.SHOW_STORY_QUESTIONS_DIALOG:
            return { ...state, dialogVisible: true }

        case ActionTypes.USER_ACCEPTED_QUESTIONS:
            return { ...state, questionsAccepted: true }
    }
    return state;
}
