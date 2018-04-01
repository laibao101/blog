import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, getTableListDone, createError} from '../../action/user';
import {userService} from '../../service';

const getTableList = (action$) => {
    return action$.ofType(actionTypes.GET_USER_LIST)
        .switchMap(() => {
            return userService.getTableList()
                .map(data => getTableListDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    getTableList,
);
