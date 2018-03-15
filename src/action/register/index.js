import Http from "../../util/Http";

export const register = () => {
    return Http.post('/api/register');
};
