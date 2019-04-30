import { createStore, combineReducers, applyMiddleware } from "redux";

import homepageReducer from "./homepageReducer";
import createLogger from "redux-logger";
import thunk from "redux-thunk";

const middleware = [thunk, createLogger];

const store = createStore(
  combineReducers({ homepageReducer }),
  applyMiddleware(...middleware)
);

export default store;
