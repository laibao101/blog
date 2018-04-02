import {Observable} from "rxjs/Observable";
import {Http} from "../../util";

const getListData = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/posts', data);
            observer.next(res.data);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const deletePost = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/delPost', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const getCategories = () => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/categories');
            observer.next(res.data);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const getPost = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.get('/api/admin/post', data);
            observer.next(res.data.post);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const addPost = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.post('/api/admin/post', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

const editPost = (data) => {
    return new Observable(async observer => {
        try {
            const res = await Http.post('/api/admin/editPost', data);
            observer.next(res);
            observer.complete();
        } catch (err) {
            observer.error(err);
        }
    });
};

export {
    getListData,
    deletePost,
    getCategories,
    getPost,
    addPost,
    editPost,
};
