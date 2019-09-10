import { RECEIVE_FOLLOWERS } from '../../actions/follows/follows_action';
import merge from 'lodash/merge';

export default (state = {}, action) => {
    
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FOLLOWERS:
            return merge({}, state, action.followers);
        default:
            return state;
    }
}