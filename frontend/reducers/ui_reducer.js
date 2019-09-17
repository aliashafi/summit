import { RECEIVE_COORDINATE } from "../actions/ui/ui_actions";
import merge from 'lodash/merge';


const UIReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COORDINATE:
            return action.coord   
        default:
            return state;
    }
};


export default UIReducer;