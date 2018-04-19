import {notification} from "antd/lib/index";

export const actionTypes = {
    LOADING: 'LOADING',
    GET_USER_LIST: 'GET_USER_LIST',
    GET_USER_LIST_DONE: 'GET_USER_LIST_DONE',
    ERROR: 'ERROR',
};

const initState = {
    list: [],
    total: 0,
    loading: false
};

export const userAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.GET_USER_LIST_DONE:
            return {
                ...state,
                list: action.payload.list,
            };
        default:
            return state;
    }
};

export const getTableList = () => {
    startLoading();
    return {
        type: actionTypes.GET_USER_LIST,
        payload: {},
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

export const getTableListDone = (data) => {
    finishLoading();
    return {
        type: actionTypes.GET_USER_LIST_DONE,
        payload: {
            list: data,
        },
    };
};

export const createError = (err) => {
    notification.error({
        description: err.reason,
    });
    return {
        type: actionTypes.ERROR,
        payload: {
            error: err,
        },
    };
};

export default userAction;
