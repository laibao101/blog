import {combineReducers} from 'redux';
import home from '../action/home';
import login from '../action/login';
import admin from '../action/admin';
import category from '../action/category';

export default combineReducers({home, login, admin, category});
