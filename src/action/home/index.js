import {notification} from 'antd';
import Http from "../../util/Http";

export const actionTypes = {
    STARTLOADING: 'STARTLOADING',
    HOMELIST: 'HOMELIST',
    LiKE: 'LiKE',
    FINISHLOADING: 'FINISHLOADING'
};

const initState = {
    list: [],
    total: 0,
    loading: false
};


export const home = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.STARTLOADING:
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.FINISHLOADING:
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.HOMELIST:
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
            };
        default:
            return state;
    }
};

export const getTableList = data => async dispatch => {
    await dispatch(startLoading());
    try {
        const res = await Http.get(`/blog/posts`, data);
        await dispatch({
            type: actionTypes.HOMELIST,
            payload: {
                list: res.data.posts,
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
    type: actionTypes.STARTLOADING,
    payload: {
        loading: true
    }
});

export const finishLoading = () => ({
    type: actionTypes.FINISHLOADING,
    payload: {
        loading: false
    }
});

export const like = data => async dispatch => {
    try {
        return await Http.get('/blog/like', data);
    } catch (err) {
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
};

export default home;
