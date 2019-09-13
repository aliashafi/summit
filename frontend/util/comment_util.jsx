
export const fetchActivityComments = (activityId) => (
    $.ajax({
        url: `api/activities/${activityId}/comments`,
        method: 'GET'
    })
)

export const createComment = (comment) => (
    $.ajax({
        url: `api/comments`,
        method: "POST",
        data: {comment}
    })
)