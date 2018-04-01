export const actionTypes = {
    LOADING: 'LOADING',
    FETCH_HOME_LIST: 'FETCH_HOME_LIST',
    FETCH_HOME_LIST_DONE: 'FETCH_HOME_LIST_DONE',
    ERROR: 'ERROR',
};

const initState = {
    list: [],
    total: 0,
    loading: false,
    error: null,
};


export const homeAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            };
        case actionTypes.FETCH_HOME_LIST_DONE:
            return {
                ...state,
                list: action.payload.list,
                total: action.payload.total
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

export const getTableList = (data) => {
    startLoading();
    return {
        type: actionTypes.FETCH_HOME_LIST,
        payload: {
            data,
        }
    };
};

export const getTableListDone = (data) => {
    finishLoading();
    return {
        type: actionTypes.FETCH_HOME_LIST_DONE,
        payload: {
            list: data.posts,
            total: data.total
        },
    };
};

export const startLoading = () => ({
    type: actionTypes.LOADING,
    payload: {
        loading: true
    },
});

export const finishLoading = () => ({
    type: actionTypes.LOADING,
    payload: {
        loading: false
    },
});
export const  createError = (err) => {
    console.log(err);
    return {
        type: actionTypes.LOADING,
        payload: {
            loading: false
        }
    }
};

export default homeAction;
