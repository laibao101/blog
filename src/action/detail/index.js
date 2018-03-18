import {notification} from "antd";
import Http from "../../util/Http";

const actionTypes = {
    LOADING: 'LOADING',
    DETAIL: 'DETAIL',
};

const initState = {
    loading: false,
    post: {},
    comments: [],
};

export const detailAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.DETAIL:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
        default:
            return state;
    }
};

export const startLoading = () => ({
    type: actionTypes.LOADING,
    payload: {
        loading: true,
    },
});

export const finishLoading = () => ({
    type: actionTypes.LOADING,
    payload: {
        loading: false,
    },
});


export const getDetailData = data => async dispatch => {
    await dispatch(startLoading());
    try {
        const res = await Http.get(`/blog/post`, data);
        await dispatch({
            type: actionTypes.DETAIL,
            payload: {
                post: res.data.post,
                comments: res.data.comments,
            },
        });
    } catch (err) {
        notification.error({
            message: '请求错误',
            description: err.reason,
        });
    }
    await dispatch(finishLoading());
};

export default detailAction;
