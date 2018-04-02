import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, getTableListDone, createError, getCategoriesDone} from '../../action/admin';
import {actionTypes as at} from '../../action/admin/EditorAction';
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

const getCategories = (action$) => {
    return action$.ofType(at.GET_OPTIONS)
        .switchMap(() => {
            return adminService.getCategories()
                .map(data => getCategoriesDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    getTableList,
    getCategories,
);
