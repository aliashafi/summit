
export const fetchUser = (userId) => (
    $.ajax({
        url: `api/users/${userId}`,
        method: "GET",
    })
)

export const fetchFollows = () => (
    $.ajax({
        url: "api/follows",
        method: "GET"
    })
)



