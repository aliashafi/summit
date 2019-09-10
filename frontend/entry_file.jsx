import React from 'react'
import ReactDOM from 'react-dom';
import configureStore from './store/Store';
import Root from './components/Root';

document.addEventListener("DOMContentLoaded", () => {
    let store = configureStore();

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
