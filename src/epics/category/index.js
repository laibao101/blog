import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, createError, getCategoriesDone} from '../../action/category';
import {categoryService} from '../../service';

const getTableList = (action$) => {
    return action$.ofType(actionTypes.GET_CATEGORIES)
        .map(action => action.payload.data)
        .switchMap((pageInfo) => {
            return categoryService.getListData(pageInfo)
                .map(data => getCategoriesDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    getTableList,
);
