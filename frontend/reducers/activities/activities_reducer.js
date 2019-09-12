import { RECEIVE_ALL_ACTIVITIES, RECEIVE_ACTIVITY } from '../../actions/activities/activity_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_ACTIVITIES:
            return merge({}, state, action.activities);
        case RECEIVE_ACTIVITY:
            return merge({}, state, { [action.activity.id]: action.activity })
        default:
            return state;
    }
}