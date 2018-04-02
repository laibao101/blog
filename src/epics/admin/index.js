import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, getTableListDone, createError} from '../../action/admin';
import {adminService} from '../../service';

const getTableList = (action$) => {
    return action$.ofType(actionTypes.GET_POST_LIST)
        .map(action => action.payload.data)
        .switchMap((pageInfo) => {
            return adminService.getListData(pageInfo)
                .map(data => getTableListDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    getTableList,
);
