import * as ActivityUtil from '../../util/activity_util'

export const RECEIVE_ALL_ACTIVITIES = 'RECEIVE_ALL_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';
export const RECEIVE_CURRENT_USER_ACTIVITIES = "RECEIVE_CURRENT_USER_ACTIVITIES"


const receiveAllActivities = (payload) => ({
    type: RECEIVE_ALL_ACTIVITIES,
    payload
})

const receiveCurrentUserActivities = (payload) => ({
    type: RECEIVE_CURRENT_USER_ACTIVITIES,
    payload
})

const recieveActivity = (activity) => ({
    type: RECEIVE_ACTIVITY,
    activity
})

export const fetchAllActivities = (page) => (dispatch) =>
    ActivityUtil.fetchActivities(page).then((activities) => dispatch(receiveAllActivities(activities)));

export const fetchUserActivities = () => (dispatch) =>
    ActivityUtil.fetchUserActivities().then((activities) => dispatch(receiveCurrentUserActivities(activities)));


export const fetchActivity = (activityId) => (dispatch) =>
    ActivityUtil.fetchActivity(activityId).then((activity) => dispatch(recieveActivity(activity)));

