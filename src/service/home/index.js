import {Observable} from "rxjs/Observable";
import {Http} from "../../util";

const getListData = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await Http.get(`/blog/posts`, data);
            observer.next(res.data);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

const like = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await Http.get('/blog/like', data);
            observer.next(res);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

const comment = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await Http.post('/blog/comment', data);
            observer.next(res);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};

export {
    getListData,
    like,
    comment
};
