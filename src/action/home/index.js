import {notification} from 'antd';
import Http from "../../util/Http";

export const actionTypes = {
    LOADING: 'LOADING',
    HOMELIST: 'HOMELIST',
    LiKE: 'LiKE',
    HOMELISTDONE: 'HOMELISTDONE',
};

const initState = {
    list: [],
    total: 0,
    loading: false
};


export const homeAction = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.HOMELIST:
            return {
                ...state,
                // list: action.payload.list,
                // total: action.payload.total
            };
        case actionTypes.HOMELISTDONE:
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
            };
        default:
            return state;
    }
};

// export const getTableList = data => async dispatch => {
//     await dispatch(startLoading());
//     try {
//         const res = await Http.get(`/blog/posts`, data);
//         await dispatch({
//             type: actionTypes.HOMELIST,
//             payload: {
//                 list: res.data.posts,
//                 total: res.data.total
//             }
//         });
//     } catch (err) {
//         notification.error({
//             message: '请求错误',
//             description: err.reason
//         });
//     }
//     await dispatch(finishLoading());
// };

export const getTableList = () => ({
    type: actionTypes.HOMELIST,
});

export const getTableListDone = (data) => ({
    type: actionTypes.HOMELISTDONE,
    payload: {
        list: data.posts,
        total: data.total
    }
})

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
export const  createError = (err) => {
    console.log(err);
    return {
        type: actionTypes.LOADING,
        payload: {
            loading: false
        }
    }
}

export const like = data => async () => {
    return await Http.get('/blog/like', data);
};

export const comment = data => async () => {
    return await Http.post('/blog/comment', data);
};

export default homeAction;
