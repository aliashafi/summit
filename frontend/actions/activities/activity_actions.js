import * as ActivityUtil from '../../util/activity_util'

export const RECEIVE_ALL_ACTIVITIES = 'RECEIVE_ALL_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'RECEIVE_ACTIVITY';


const receiveAllActivities = (activities) => ({
    type: RECEIVE_ALL_ACTIVITIES,
    activities
})

const recieveActivity = (activity) => ({
    type: RECEIVE_ACTIVITY,
    activity
})

export const fetchAllActivities = (page) => (dispatch) =>
    ActivityUtil.fetchActivities(page).then((activities) => dispatch(receiveAllActivities(activities)));


export const fetchActivity = (activityId) => (dispatch) =>
    ActivityUtil.fetchActivity(activityId).then((activity) => dispatch(recieveActivity(activity)));

