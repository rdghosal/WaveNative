import React from "react";
import ReactDOM from "react-dom";
// import { App } from "./App";
import AppRouter from "./AppRouter";

window.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render( <AppRouter />, document.getElementById("content"));
});