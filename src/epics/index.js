import 'rxjs';
import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import detailEpic from './detail';
import userEpic from './user';
import appEpic from './app';
import adminEpic from './admin';

export default combineEpics(
    homeEpic,
    detailEpic,
    userEpic,
    appEpic,
    adminEpic,
);
