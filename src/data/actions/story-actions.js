import * as ActionTypes from '../types';
import { retrieveData, storeData } from '../../routines/async-storage-routine';

export const activateStoryQuestions = (story) => async dispatch => {
    dispatch({
        type: ActionTypes.ACTIVATE_STORY_QUESTIONS,
        payload: story
    });
}

export const deactivateStoryQuestions = () => async dispatch => {
    dispatch({
        type: ActionTypes.DEACTIVATE_STORY_QUESTIONS
    });
}

export const fetchUserStories = () => async dispatch => {
    retrieveData("user_stories")
    .then(userStories => {
        if(userStories != null) {
            dispatch({
                type: ActionTypes.FETCH_USER_STORIES,
                payload: JSON.parse(userStories)
            });
        }
        else {
            dispatch({
                type: ActionTypes.FETCH_USER_STORIES,
                payload: []
            });
        };
    }).catch(error => {
        dispatch({
            type: ActionTypes.FETCH_USER_STORIES,
            payload: []
        });
    });
}

export const hideStoryActivatedFeedback = () => async dispatch => {
    dispatch({
        type: ActionTypes.HIDE_STORY_ACTIVATED_FEEDBACK
    });
}

export const hideStoryQuestionsDialog = () => async dispatch => {
    dispatch({
        type: ActionTypes.HIDE_STORY_QUESTIONS_DIALOG
    });
}

export const registerStoryResults = (story, result) => async dispatch => {
    let results = [];
    retrieveData(`story${story}Results`)
    .then(storyResults => {
        if(storyResults != null) {
            results = JSON.parse(storyResults);
            results.push(result);
            storeData(`story${story}Results`, JSON.stringify(results));
        }
        else {
            results.push(result);
            storeData(`story${story}Results`, JSON.stringify(results));
        }
    }).catch(error => error);
}

export const registerUserAnswer = (points) => async dispatch => {
    dispatch({
        type: ActionTypes.REGISTER_USER_ANSWER,
        payload: points
    });
}

export const saveUserStory = (story) => async dispatch => {
    dispatch({
        type: ActionTypes.SAVE_USER_STORY,
        payload: story
    });
}

export const showStoryActivatedFeedback = () => async dispatch => {
    dispatch({
        type: ActionTypes.SHOW_STORY_ACTIVATED_FEEDBACK
    });
}

export const showStoryQuestionsDialog = () => async dispatch => {
    dispatch({
        type: ActionTypes.SHOW_STORY_QUESTIONS_DIALOG
    });
}

export const userAcceptedQuestions = () => async dispatch => {
    dispatch({
        type: ActionTypes.USER_ACCEPTED_QUESTIONS
    });
}
