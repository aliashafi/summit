import * as UserUtil from '../../util/users_util'

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

const receiveUser = (user) => ({
    type: RECEIVE_USER, 
    user
})

const receiveAllUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users
})


export const fetchUser = (userId) => dispatch => 
    UserUtil.fetchUser(userId).then((user) => dispatch(receiveUser(user)));

export const fetchAllUsers = () => dispatch =>
    UserUtil.fetchAllUsers().then((users) => dispatch(receiveAllUsers(users)));

