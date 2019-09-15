
export const fetchActivity = (activityId) => (
    $.ajax({
        url: `api/activities/${activityId}`,
        method: 'GET'
    })
)

export const fetchActivities = (page) => (
    $.ajax({
        url: `api/pages/${page}/activities/`,
        method: 'GET',
        data: {page}
    })
)

export const fetchUserActivities = () => (
    $.ajax({
        url: `api//activities/`,
        method: 'GET',
    })
)