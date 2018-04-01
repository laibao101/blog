import {createStore, compose, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);

// const store = createStore(reducers, compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

const store = createStore(reducers,  applyMiddleware(epicMiddleware));


export default store;
