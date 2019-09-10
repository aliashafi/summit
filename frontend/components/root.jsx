import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import App from './app';
import React from 'react'

const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <NavBarContainer />
            <App />
        </HashRouter>
    </Provider>
);

export default Root