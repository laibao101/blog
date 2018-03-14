import {Http} from "../../util";

export const addCategory = (data) => async () => {
    return Http.post('/api/admin/category', data);
};

export const editCategory = (data) => async () => {
    return Http.post('/api/admin/editCategory', data);
};
