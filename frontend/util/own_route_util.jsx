

export const fetchAllRoutes = (userId) => (
    $.ajax({
        url: `api/users/${userId}/routes`,
        method: "GET"
    })
)

export const createRoute = (userId, route) => (
    $.ajax({
        url: `api/users/${userId}/routes`,
        method: "POST",
        data: {route}
    })
)

export const deleteRoute = (userId, routeId) => (
    $.ajax({
        url: `api/users/${userId}/routes/${routeId}`,
        method: "DELETE",
        data: { routeId }
    })
)