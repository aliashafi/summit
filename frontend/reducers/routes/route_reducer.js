import { RECEIVE_ALL_ROUTES, RECEIVE_ROUTE } from '../../actions/routes/route_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_ROUTES:
            return merge({}, state, action.routes);
        case RECEIVE_ROUTE:
            return merge({}, state, action.route)
        default:
            return state;
    }
}