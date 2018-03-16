import Http from "../../util/Http";

export const register = (data) => () => {
    return Http.post('/api/register', data);
};
