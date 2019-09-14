import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { fetchFollowers, fetchFollowing } from './actions/follows/follows_action'
import { createKudo } from './actions/kudos/kudo_actions'


document.addEventListener("DOMContentLoaded", () => {

    let store = configureStore();
    window.dispatch = store.dispatch

    window.createKudo = createKudo;

    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUser: window.currentUser }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    window.getState = store.getState
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
});
