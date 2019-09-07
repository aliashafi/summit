import React from 'react';
import { Route } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import SplashPage from './splash_page'
import { AuthRoute, ProtectedRoute } from '../util/route_util';

export default () => (
    <div>
        <Route exact path="/" component={SplashPage} />
        <AuthRoute path="/signup" component={SignupContainer} />
        <AuthRoute path="/login" component={LoginContainer} />
    </div>
);
