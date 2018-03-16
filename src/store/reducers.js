import {combineReducers} from 'redux';
import home from '../action/home';
import login from '../action/login';
import admin from '../action/admin';
import category from '../action/category';
import user from '../action/user';
import app from '../action/app';

export default combineReducers({home, login, admin, category, user, app});
