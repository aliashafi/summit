import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

console.log("test");
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
    // ReactDOM.render(<NavBar />, root);
    ReactDOM.render(<Root store={store}/>, root);
});
