import * as UserUtil from '../../util/users_util'

export const RECEIVE_USER = 'RECEIVE_USER';

const receiveUser = (user) => ({
    type: RECEIVE_USER, 
    user
})


export const fetchUser = (user) => dispatch => 
    UserUtil.fetchUser(user).then((user) => dispatch(user))