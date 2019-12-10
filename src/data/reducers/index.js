import { combineReducers } from 'redux';

import AvatarReducer from './avatar-reducer';
import StoryReducer from './story-reducer';

export default combineReducers({
    AvatarReducer: AvatarReducer,
    StoryReducer: StoryReducer
});
