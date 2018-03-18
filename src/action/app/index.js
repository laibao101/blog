import Http from "../../util/Http";
import {notification} from "antd/lib/index";

const actionTypes = {
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
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
    switch (action.type){
        case actionTypes.LOGOUT:
            return {
                ...state,
                userInfo: {
                    ...action.payload
                },
                isLogin: false,
            };
        case actionTypes.LOGIN:
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


export const logout = () => async dispatch => {
    try {
        await Http.get('/api/logout');
        dispatch({
            type: actionTypes.LOGOUT,
            payload: {
                uid: -1,
                name: '',
                nickname: '',
            }
        });
    }catch (err){
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
};

export const login = (data) => async dispatch => {
    try{
        const res = await Http.post('/api/login', data);
        dispatch({
            type: actionTypes.LOGIN,
            payload: {
                uid: res.data.uid,
                name: res.data.name,
                nickname: res.data.nickname,
                avatar: res.data.avatar,
            }
        });
        return res;
    }catch (err) {
        notification.error({
            message: '请求错误',
            description: err.reason
        });
    }
};

export default appAction;
