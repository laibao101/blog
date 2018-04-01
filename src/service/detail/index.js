import {Observable} from "rxjs/Observable";
import {Http} from "../../util";

const getDetailData = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await Http.get(`/blog/post`, data);
            observer.next(res.data);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};


export {
    getDetailData,
};
