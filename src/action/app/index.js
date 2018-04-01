export const actionTypes = {
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
    LOGIN_DONE: 'LOGIN_DONE',
    LOGOUT_DONE: 'LOGOUT_DONE',
};

const initState = {
    userInfo: {
        uid: -1,
        name: '',
        nickname: '',
    },
    isLogin: false,
};

export const appAction = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT_DONE:
            return {
                ...state,
                userInfo: {
                    ...action.payload
                },
                isLogin: false,
            };
        case actionTypes.LOGIN_DONE:
            return {
                ...state,
                userInfo: {
                    ...action.payload
                },
                isLogin: true,
            };
        default:
            return state;
    }
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
        payload: {}
    };
};

export const login = (data) => {
    return {
        type: actionTypes.LOGIN,
        payload: {
            data,
        },
    };
};

export const loginDone = (data) => {
    return {
        type: actionTypes.LOGIN_DONE,
        payload: {
            uid: data.uid,
            name: data.name,
            nickname: data.nickname,
            avatar: data.avatar,
        }
    };
};

export const logoutDone = () => {
    return {
        type: actionTypes.LOGOUT_DONE,
        payload: {
            uid: '',
            name: '',
            nickname: '',
            avatar: '',
        }
    };
};

export const createError = (err) => {
    return {
        type: actionTypes.ERROR,
        payload: {
            error: err,
        }
    }
};

export default appAction;
