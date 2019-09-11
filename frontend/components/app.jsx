import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import SplashPage from './splash_page'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Feed from './feed/feed'
import ErrorPage from './error_page'
 



export default () => (

    <div>
        <Switch>
            <Route exact path="/" component={SplashPage} />
            <ProtectedRoute exact path="/feed" component={Feed} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
            <Route component={ErrorPage}/>
        
        </Switch>
    </div>
);
