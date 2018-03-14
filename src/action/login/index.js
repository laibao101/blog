import {Http} from "../../util";

const actionType = {};

const initState = {};

export const loginAction = (state = initState, action) => {
    return state;
};

export const login = data => async () => {
  return await Http.post('/api/login', data);
};

export default loginAction;
