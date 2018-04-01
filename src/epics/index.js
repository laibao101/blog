import 'rxjs';
import { combineEpics } from 'redux-observable';
import homeEpic from './home';
import detailEpic from './detail';

export default combineEpics(
    homeEpic,
    detailEpic,
);
