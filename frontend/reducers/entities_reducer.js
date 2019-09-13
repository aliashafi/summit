import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import ActivitiesReducer from './activities/activities_reducer'
import FollowerReducer from './follows/followers_reducer'
import FollowingReducer from './follows/following_reducer'
import CommentsReducer from './comments_reducer'


export default combineReducers({
    users: UserReducer,
    activities: ActivitiesReducer,
    followers: FollowerReducer,
    following: FollowingReducer,
    comments: CommentsReducer
});