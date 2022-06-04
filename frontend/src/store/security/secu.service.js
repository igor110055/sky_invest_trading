import { instance } from "@utils/axios.instance";

const TWOFA_URL = "/users/totp/";

const create2fa = async (token) => {
    const res = await instance.post(
        `${TWOFA_URL}`,
        {},
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    return res;
};

const verify2fa = async (token, code) => {
    const res = await instance.post(
        `${TWOFA_URL}verify/`,
        {
            token: code,
        },
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    return res;
};

const info2fa = async (token) => {
    const res = await instance.get(`${TWOFA_URL}update_otp/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const update2fa = async (token, data) => {
    const res = await instance.patch(`${TWOFA_URL}update_otp/`, data, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

const delete2fa = async (token, twofa) => {
    const res = await instance.delete(`${TWOFA_URL}delete/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
        data: {
            token: twofa,
        },
    });

    return res;
};

const secuService = {
    create2fa,
    info2fa,
    update2fa,
    verify2fa,
    delete2fa,
};

export default secuService;
