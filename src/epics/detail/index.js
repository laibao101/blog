import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, getDetailDataDone, createError} from '../../action/detail';
import {detailService} from '../../service';

const getDetailData = (action$) => {
    return action$.ofType(actionTypes.GET_DETAIL)
        .map(action => action.payload.data)
        .switchMap((postInfo) => {
            return detailService.getDetailData(postInfo)
                .map(data => getDetailDataDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    getDetailData,
);
