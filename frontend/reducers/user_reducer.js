import { RECEIVE_CURRENT_USER } from '../actions/session';
import { RECEIVE_USER, RECEIVE_ALL_USERS } from '../actions/users/user_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return merge({}, { [action.user.id]: action.user })
        case RECEIVE_ALL_USERS:
            return merge({}, state, action.users)
        default:
            return state;
    }
};