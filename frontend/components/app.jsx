import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import SplashPage from './splash_page'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import FeedContainer from './feed/feed_container'
import ErrorPage from './error_page'
import ActivityShowContainer from './activities/map/activity_map_container';
import RouteCreateContainer from './routes/route_create_container'
import RouteIndexContainer from './routes/route_index_container'
 



export default () => (

    <div>
        <Switch>
            <Route exact path="/" component={SplashPage} />
            <ProtectedRoute exact path="/feed" component={FeedContainer} />
            <ProtectedRoute exact path='/activity/:activityId' component={ActivityShowContainer} />
            <ProtectedRoute exact path='/routes/create' component={RouteCreateContainer} />
            <ProtectedRoute exact path='/routes/' component={RouteIndexContainer} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            <Route component={ErrorPage}/>
        </Switch>
    </div>
);
