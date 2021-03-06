import { postUser, postSession, deleteSession } from '../util/session';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user,
});

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = (errors = []) => ({
    type: RECEIVE_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});


export const createNewUser = (formUser) => (dispatch) => postUser(formUser)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail((error) => dispatch(receiveErrors(error)));

export const login = (formUser) => dispatch => postSession(formUser)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail((error) => dispatch(receiveErrors(error)));

export const logout = () => dispatch => deleteSession()
    .then(() => dispatch(logoutCurrentUser()));

export const clearAllErrors = () => dispatch(clearErrors())