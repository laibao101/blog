import {createStore, applyMiddleware} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer,  applyMiddleware(epicMiddleware));


export default store;
