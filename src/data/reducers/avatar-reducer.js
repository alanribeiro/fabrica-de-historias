import * as ActionTypes from '../types';

const INITIAL_STATE = {
    avatarChangeStatus: null,
    userAvatar: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.DISABLE_CHANGE_AVATAR_STATUS_FEEDBACK:
            return { ...state, avatarChangeStatus: null }

        case ActionTypes.SAVE_SELECTED_AVATAR:
            const options = ["female_avatar_black", "female_avatar_white", "male_avatar_black", "male_avatar_white"];
            const status = options.indexOf(action.payload);
            return { ...state, avatarChangeStatus: status != -1 ? "success" : "error", userAvatar: action.payload }

        case ActionTypes.SET_USER_AVATAR:
            return { ...state, userAvatar: action.payload }
    }
    return state;
}
