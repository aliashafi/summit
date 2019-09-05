import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/nav_bar'

console.log("test");

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<NavBar/>, root);
});
