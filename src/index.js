import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import history from "./utils/history";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = createStore();

root.render(
    <Provider store={store}>
        <Router history = {history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
