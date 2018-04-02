import {Observable} from "rxjs/Observable";
import {Http} from "../../util";

const getListData = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/categories', data);
            observer.next(res.data);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const enableCategory = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/enableCategory', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const disableCategory = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/disableCategory', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const addCategory = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.post('/api/admin/category', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const editCategory = (data) => {
    return new Observable(async observer => {
        try {
            const res = Http.post('/api/admin/editCategory', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

export {
    getListData,
    enableCategory,
    disableCategory,
    addCategory,
    editCategory,
};
