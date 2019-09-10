import { RECEIVE_FOLLOWING } from '../../actions/follows/follows_action';
import merge from 'lodash/merge';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FOLLOWING:
            return merge({}, state, action.following);
        default:
            return state;
    }
}