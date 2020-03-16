import { createStore, applyMiddleware, combineReducers } from 'redux';

import promiseMiddleWare from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import itemReducer from './ducks/itemReducer';

const middleware = applyMiddleware(promiseMiddleWare);

const combinedReducers = combineReducers({
	userReducer,
	itemReducer
});

const store = createStore(combinedReducers, middleware);

export default store;
