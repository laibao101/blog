export const actionTypes = {
    GET_OPTIONS: 'GET_OPTIONS',
    GET_OPTIONS_DONE: 'GET_OPTIONS_DONE',
};

const initState = {
    options: [],
};

export const editorAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_OPTIONS_DONE:
            return {
                ...state,
                options: action.payload.options
            };
        default:
            return state;
    }
};

export const getCategories = () => {
    return {
        type: actionTypes.GET_OPTIONS,
        payload: {},
    };
};

export const getCategoriesDone = (data) => {
    return {
        type: actionTypes.GET_OPTIONS_DONE,
        payload: {
            options: data.categories,
        },
    };
};

export default editorAction;
