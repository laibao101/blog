import {notification} from "antd";
import {Http} from "../../util";

const actionTypes = {
    LOADING:'LOADING',
    POSTLIST: 'POSTLIST',
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
        case actionTypes.POSTLIST:
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

export const getTableList = (data) => async dispatch => {
    dispatch(startLoading());
    try {
        const res = await Http.get('/api/admin/posts', data);
        dispatch({
            type:actionTypes.POSTLIST,
            payload: {
                list: res.data.posts,
                total: res.data.total
            }
        });
    }catch (err){
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
    dispatch(finishLoading());
};

export const deletePost = (data) => async dispatch => {
    return Http.get('/api/admin/delPost', data);
};

export default adminAction;
