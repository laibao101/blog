import 'rxjs';
import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import detailEpic from './detail';
import userEpic from './user';

export default combineEpics(
    homeEpic,
    detailEpic,
    userEpic,
);
