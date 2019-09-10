import React from 'react';
import { Route } from 'react-router-dom';
import SignupContainer from './session/Signup_Container';
import LoginContainer from './session/Login_Container';
import SplashPage from './splash_page'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Feed from './feed/Feed'


export default () => (
    <div>
        <Route exact path="/" component={SplashPage} />
        <Route exact path="/feed" component={Feed} />
        <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
    </div>
);
