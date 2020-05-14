/* global document */

import React from "react";
import {hydrate,render} from "react-dom";
import {Provider} from "react-redux";
import { loadableReady } from '@loadable/component';
import App from "./App";
import store from "./config/store";
import {Router} from "react-router-dom";
import History from "./config/history";
import "./scss/root.scss"

loadableReady(() => {
    console.log("Load Ready >>>");
    hydrate(
        <Provider store={store}>
            <Router history={History}>
                <App />
            </Router>
        </Provider>, document.getElementById("root")
    );
});