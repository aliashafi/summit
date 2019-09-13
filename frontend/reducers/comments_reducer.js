import { RECEIVE_ACTIVITY_COMMENTS, RECEIVE_COMMENT} from '../actions/comments/comment_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ACTIVITY_COMMENTS:
            return merge({}, action.comments)
        case RECEIVE_COMMENT:
            return merge({}, { [action.comment.id]: action.comment })
        default:
            return state;
    }
};