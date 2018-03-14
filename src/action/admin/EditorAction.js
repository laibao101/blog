import Http from "../../util/Http";
import {notification} from "antd";

const actionTypes = {
    OPTIONS: 'OPTIONS',
    POSTDATA: 'POSTDATA'
};

const initState = {
    options: [],
    post: {}
};

export const editorAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.OPTIONS:
            return {
                ...state,
                options: action.payload.options
            };
        case actionTypes.POSTDATA:
            return {
                ...state,
                post: action.payload.post
            };
        default:
            return state;
    }
};

export const getCategories = () => async dispatch => {
    try {
        const res = await Http.get('/api/admin/categories');
        dispatch({
            type: actionTypes.OPTIONS,
            payload: {
                options: res.data.categories
            }
        });
    } catch (err) {
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
};

export const getPostData = (data) => async () => {
    try {
        return await Http.get('/api/admin/post', data);
    } catch (err) {
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
};

export const addPost = (data) => () => {
    return Http.post('/api/admin/post', data);
};

export const editPost = (data) => () => {
    return Http.post('/api/admin/editPost', data);
};

export default editorAction;
