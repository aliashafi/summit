import { RECEIVE_ALL_KUDOS, RECEIVE_KUDO } from '../actions/kudos/kudo_actions';
import { RECEIVE_ALL_ACTIVITIES } from '../actions/activities/activity_actions'
import merge from 'lodash/merge';

export default (state = {}, action) => {

    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_KUDOS:
            return merge({}, action.comments)
        case RECEIVE_KUDO:
            return merge({}, state, {[action.kudo.id] : action.kudo})
        case RECEIVE_ALL_ACTIVITIES:
            return merge({}, action.payload.kudos)
        default:
            return state;
    }
};