import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import {actionTypes} from '../action/home';
import Http from "../util/Http";
import { ajax } from 'rxjs/observable/dom/ajax';

const getData = () => {
    console.log('get data')
    return new Observable(async observer  => {
        const res = await Http.get(`/blog/posts`);
        observer.next(res.data);
        observer.complete();
    });
};

const getTableList = (action$) => {
    return action$.ofType(actionTypes.HOMELIST)
        .do(a => console.log(a))
        .switchMap(q => {
            // getData()
            //     .subscribe(a => console.log(a))
            // return getData()
            //     .do(data => console.log(data))
            //     .map(actionTypes.HOMELIST);

            ajax.getJSON(`/blog/posts`)
                .do(a => console.log(a))
        })
};

export default combineEpics(getTableList);
