export const actionTypes = {
    LOADING: 'LOADING',
    GET_DETAIL: 'GET_DETAIL',
    GET_DETAIL_DONE: 'GET_DETAIL_DONE',
    ERROR: 'ERROR',
};

const initState = {
    loading: false,
    post: {
        title: '',
        ctime: '',
        content: '',
    },
    comments: [],
    error: null
};

export const detailAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAIL_DONE:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload.error,
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


export const getDetailData = data => {
    startLoading();
    return {
        type: actionTypes.GET_DETAIL,
        payload: {
            data,
        },
    };
};

export const getDetailDataDone = data => {
    finishLoading();
    return {
        type: actionTypes.GET_DETAIL_DONE,
        payload: {
            post: data.post,
            comments: data.comments,
        },
    };
};

export const  createError = (err) => {
    console.log(err);
    return {
        type: actionTypes.ERROR,
        payload: {
            loading: false
        }
    }
};

export default detailAction;
