import {notification} from "antd";

export const actionTypes = {
    LOADING: 'LOADING',
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORIES_DONE: 'GET_CATEGORIES_DONE',
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
        case actionTypes.GET_CATEGORIES_DONE:
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
            };
        default:
            return state;
    }
};

export const getCategories = (data) => {
    startLoading();
    return {
        type: actionTypes.GET_CATEGORIES,
        payload: {
            data,
        }
    };
};

export const getCategoriesDone = (data) => {
    finishLoading();
    return {
        type: actionTypes.GET_CATEGORIES_DONE,
        payload: {
            list: data.categories,
            total: data.total,
        },
    };
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

export const createError = (err) => {
    notification.error({
        description: err.reason,
    });
    return {
        type: actionTypes.ERROR,
        payload: {
            loading: false
        }
    }
};

export default categoryAction;
