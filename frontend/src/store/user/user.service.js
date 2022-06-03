import { instance } from "@utils/axios.instance";

const USER_URL = "/users/";
const AUTH_URL = "/auth/";
const TRAID_URL = "/copytrade/";

const me = async (token) => {
    const res = await instance.get(`${USER_URL}dashboard/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const getMyGroups = async (token) => {
    const res = await instance.get(`${USER_URL}groups/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const register = async (userData) => {
    const res = await instance.post(`${AUTH_URL}register/`, userData);

    return res;
};

const payment = async (userData) => {
    const res = await instance.post(`payment/register/`, userData);

    return res;
};

const login = async (userData) => {
    const res = await instance.post(`${AUTH_URL}login/`, userData);

    return res;
};

const reset_password = async (userData) => {
    const res = await instance.post(`${AUTH_URL}reset_password/`, userData);

    return res;
};

const confirm_password = async (userData) => {
    const res = await instance.post(
        `${AUTH_URL}reset_password_confirm/`,
        userData
    );

    return res;
};

const activation = async (userData) => {
    const res = await instance.post(`${AUTH_URL}activation/`, userData);

    return res;
};

const trader_apply = async (token, userData) => {
    const res = await instance.post(
        `${USER_URL}trader/apply_for_trader/`,
        userData,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    return res;
};

const verification = async (userData, token) => {
    const res = await instance.post(`${USER_URL}verification/`, userData, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const createGroup = async (userData, token) => {
    const res = await instance.post(`${TRAID_URL}trade_group/`, userData, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const logout = async (token) => {
    const res = await instance.post(
        `${AUTH_URL}logout/`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    return res;
};

const getTraiderGroup = async (token) => {
    const res = await instance.get(`${TRAID_URL}trade_group/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const userService = {
    me,
    getMyGroups,
    createGroup,
    logout,
    register,
    trader_apply,
    login,
    reset_password,
    confirm_password,
    activation,
    verification,
    getTraiderGroup,
};

export default userService;
