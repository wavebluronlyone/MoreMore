import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import { Provider } from "react-redux";
import reducers from './Reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <AppWithRouter />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
