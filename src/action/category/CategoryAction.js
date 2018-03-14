import Http from "../../util/Http";
import {notification} from "antd";

const actionTypes = {
    LOADING: 'LOADING',
    CATEGORIES: 'CATEGORIES'
};

const initState = {
    list: [],
    loading: false,
    total: 0,
};

export const categoryAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING :
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.CATEGORIES:
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
            };
        default:
            return state;
    }
};


export const getCategories = (data) => async dispatch => {
    await dispatch(startLoading());
    try {
        const res = await  Http.get('/api/admin/categories', data);
        await dispatch({
            type: actionTypes.CATEGORIES,
            payload: {
                list: res.data.categories,
                total: res.data.total
            }
        });
    } catch (err) {
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
    await dispatch(finishLoading());
};

export const startLoading = () => ({
    type: actionTypes.LOADING,
    payload: {
        loading: true
    }
});

export const finishLoading = () => ({
    type: actionTypes.LOADING,
    payload: {
        loading: false
    }
});

export const enableCategory = (data) => () => {
    return Http.get('/api/admin/enableCategory', data);
};

export const disableCategory = (data) => () => {
    return Http.get('/api/admin/disableCategory', data);
};


export default categoryAction;
