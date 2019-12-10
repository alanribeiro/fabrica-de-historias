import * as ActionTypes from '../types';
import { storeData } from '../../routines/async-storage-routine';

export const disableChangeAvatarStatus = () => async dispatch => {
    dispatch({
        type: ActionTypes.DISABLE_CHANGE_AVATAR_STATUS_FEEDBACK
    });
}

export const saveSelectedAvatar = (avatar) => async dispatch => {
    storeData("user_avatar", avatar);
    dispatch({
        type: ActionTypes.SAVE_SELECTED_AVATAR,
        payload: avatar
    });
}

export const setUserAvatar = (avatar) => async dispatch => {
    dispatch({
        type: ActionTypes.SET_USER_AVATAR,
        payload: avatar
    });
}
