import {notification} from 'antd';
import Http from "../../util/Http";

export const actionTypes = {
    LOADING: 'LOADING',
    USERLIST: 'USERLIST',
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
        case actionTypes.USERLIST:
            return {
                ...state,
                list: action.payload.list,
            };
        default:
            return state;
    }
};

export const getTableList = data => async dispatch => {
    await dispatch(startLoading());
    try {
        const res = await Http.get('/api/admin/users', data);
        await dispatch({
            type: actionTypes.USERLIST,
            payload: {
                list: res.data,
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

export const enableUser = (data) => () => {
    return Http.get('/api/admin/enableUser', data);
};

export const disableUser = (data) => () => {
    return Http.get('/api/admin/disableUser', data);
};

export default userAction;
