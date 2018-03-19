import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';

import rootReducer from "./reducers";

const middlewareArray = (process.env.NODE_ENV === 'production') ? [] : [logger];

const store = createStore(
    rootReducer,
    applyMiddleware(...middlewareArray),
);
export default store;