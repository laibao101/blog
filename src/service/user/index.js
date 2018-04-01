import {Observable} from "rxjs/Observable";
import {Http} from "../../util";

const getTableList = () => {
    return new Observable(async observer  => {
        try {
            const res = await await Http.get('/api/admin/users');
            observer.next(res.data);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

const enableUser = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await Http.get('/api/admin/enableUser', data);
            observer.next(res);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

const disableUser = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await Http.get('/api/admin/disableUser', data);
            observer.next(res);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

export {
    getTableList,
    enableUser,
    disableUser,
};
