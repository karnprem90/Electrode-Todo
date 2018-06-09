//
// This is the client side entry point for the React app.
//

import React from "react";
import { render, hydrate } from "react-dom";
import { routes } from "./routes";
import { connectRouter, routerMiddleware,ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore,applyMiddleware, compose} from "redux";
import { Provider } from "react-redux";
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

//
const history = createBrowserHistory();

import { notify } from "react-notify-toast";




require.ensure(
    ["./sw-registration"],
    require => {
        require("./sw-registration")(notify);
    },
    "sw-registration"
);
//
window.webappStart = () => {
    const initialState = window.__PRELOADED_STATE__;
    const myStorage = window.localStorage;
    const jsContent = document.querySelector(".js-content");
    const reactStart = (initialState && jsContent.innerHTML) ? hydrate : render;
    const middleware = [
        routerMiddleware(history),
        thunk,
        promise()
    ];
    const composedEnhancers = compose(
        applyMiddleware(...middleware)
    );
    const store = createStore(
        connectRouter(history)(rootReducer), // new root reducer with router state
        initialState,
        composedEnhancers,
        myStorage
    );
    reactStart(
        <Provider store={store}>
            <ConnectedRouter history={history}>{routes}</ConnectedRouter>
        </Provider>,
        jsContent
    );
};
