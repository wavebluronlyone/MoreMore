import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const initialState = {
  data: [
    {
      name: "TU100",
      shop: "ABC",
      description: "This is a description I",
      photo:
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    },
    {
      name: "TU101",
      shop: "DEF",
      description: "This is a description II",
      photo:
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    },
    {
      name: "TU102",
      shop: "OEC",
      description: "This is a description III",
      photo:
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
    }
  ]
};

const stockReducer = (state = initialState, action) => {
  return state;
};

const mylogger = store => next => action => {
  console.log("Log Action", action);
  next(action);
};
const store = createStore(
  combineReducers({ stock: stockReducer }),
  {},
  applyMiddleware(mylogger)
);

store.subscribe(() => {
  console.log("Update Store: ", store.getState());
});

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
