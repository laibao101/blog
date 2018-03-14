import {combineReducers} from 'redux';

import {categoryAction} from "./CategoryAction";

export * from './CategoryAction';
export default combineReducers({
    category: categoryAction
})
