
export const fetchActivity = (activityId) => (
    $.ajax({
        url: `api/activities/${activityId}`,
        method: 'GET'
    })
)

export const fetchActivities = () => (
    $.ajax({
        url: `api/activities`,
        method: 'GET'
    })
)