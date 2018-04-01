import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, getTableListDone, createError} from '../../action/home';
import {homeService} from '../../service';

const getTableList = (action$) => {
    return action$.ofType(actionTypes.FETCH_HOME_LIST)
        .map(action => action.payload.data)
        .switchMap((pageInfo) => {
            return homeService.getListData(pageInfo)
                .map(data => getTableListDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    getTableList,
);
