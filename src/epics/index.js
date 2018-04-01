import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import {actionTypes, getTableListDone, createError} from '../action/home';
import { Http } from "../util";

const getData = () => {
    return new Observable(async observer  => {
        try {
            const res = await Http.get(`/blog/posts`);
            observer.next(res.data);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

const getTableList = (action$) => {
    return action$.ofType(actionTypes.HOMELIST)
        .switchMap(q => {
            return getData()
                .map(data => getTableListDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(getTableList);
