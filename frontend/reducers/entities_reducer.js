import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import ActivitiesReducer from './activities/activities_reducer'
import FollowerReducer from './follows/followers_reducer'
import FollowingReducer from './follows/following_reducer'


export default combineReducers({
    users: userReducer,
    activities: ActivitiesReducer,
    followers: FollowerReducer,
    following: FollowingReducer
});