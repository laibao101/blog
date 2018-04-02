import {notification} from "antd";

export const actionTypes = {
    LOADING:'LOADING',
    GET_POST_LIST: 'GET_POST_LIST',
    GET_POST_LIST_DONE: 'GET_POST_LIST_DONE',
};

const initState = {
    list:[],
    loading:false
};

export const adminAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING :
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.GET_POST_LIST_DONE:
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
            };
        default:
            return state;
    }
};

export const startLoading = () => ({
    type:actionTypes.LOADING,
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

export const getTableList = (data) => {
    startLoading();
    return {
        type:actionTypes.GET_POST_LIST,
        payload: {
            data,
        }
    }
};
export const getTableListDone = (data) => {
    finishLoading();
    return {
        type:actionTypes.GET_POST_LIST_DONE,
        payload: {
            list: data.posts,
            total: data.total
        }
    }
};

export const createError = (err) => {
    notification.error({
        description: err.reason,
    });
    return {
        type: actionTypes.ERROR,
        payload: {
            error: err,
        }
    }
};

export default adminAction;
