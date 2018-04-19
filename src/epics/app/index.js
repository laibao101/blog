import 'rxjs';
import {Observable} from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import {actionTypes, loginDone, createError, logoutDone, registerDone} from '../../action/app';
import {appService} from '../../service';

const login = (action$) => {
    return action$.ofType(actionTypes.LOGIN)
        .map(action => action.payload.data)
        .switchMap((loginInfo) => {
            return appService.login(loginInfo)
                .map(data => loginDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

const logout = (action$) => {
    return action$.ofType(actionTypes.LOGOUT)
        .switchMap(() => {
            return appService.logout()
                .map(data => logoutDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

const register = (action$) => {
    return action$.ofType(actionTypes.REGISTER)
        .map(action => action.payload.data)
        .switchMap((registerInfo) => {
            return appService.register(registerInfo)
                .map(data => registerDone(data))
                .catch(err => {
                    return Observable.of(createError(err))
                });
        });
};

export default combineEpics(
    login,
    logout,
    register
);
