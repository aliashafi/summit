import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import ActivitiesReducer from './activities/activities_reducer'


export default combineReducers({
    users: userReducer,
    activities: ActivitiesReducer
});