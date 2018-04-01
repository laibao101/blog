import {Observable} from "rxjs/Observable";
import {Http} from "../../util";

const login = (data) => {
    return new Observable(async observer  => {
        try {
            const res = await await Http.post('/api/login', data);
            observer.next(res.data);
            observer.complete();
        }catch (err) {
            observer.error(err);
        }
    });
};


export {
    login,
};
