import * as RouteUtil from '../../util/own_route_util'

export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
export const RECEIVE_ALL_ROUTES = "RECEIVE_ALL_ROUTES";

const receiveRoute = (route) => ({
    type: RECEIVE_ROUTE, 
    route
});

const receiveAllRoutes = (routes) => ({
    type: RECEIVE_ALL_ROUTES,
    routes
});

export const fetchAllRoutes = (id) => dispatch => 
    RouteUtil.fetchAllRoutes(id).then(routes => dispatch(receiveAllRoutes(routes)));

export const createRoute = (id, route) => dispatch => 
    RouteUtil.createRoute(id, route).then(route => dispatch(receiveRoute(route)));
