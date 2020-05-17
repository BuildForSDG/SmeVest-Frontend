import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [reduxThunk];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
