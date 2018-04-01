import {combineReducers} from 'redux';
import home from '../action/home';
import admin from '../action/admin';
import category from '../action/category';
import user from '../action/user';
import app from '../action/app';
import detail from '../action/detail';

export default combineReducers({home, admin, category, user, app, detail});
