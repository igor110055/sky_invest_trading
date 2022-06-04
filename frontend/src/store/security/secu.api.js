import secuService from "./secu.service";

let initialState = {
    secu: false,
    qr: null,
    auth: false,
    pay: false,
    messages: "",
};

const secuReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_QR":
            return {
                ...state,
                qr: action.payload,
            };
        case "CHANGE_AUTH":
            return {
                ...state,
                auth: action.payload,
            };
        case "CHANGE_PAY":
            return {
                ...state,
                pay: action.payload,
            };
        case "SET_MESSAGE":
            return {
                ...state,
                messages: action.payload,
            };
        case "SET_SECU":
            return {
                ...state,
                secu: action.payload,
            };
        default:
            return state;
    }
};

export const actions = {
    setQr: (data) => ({
        type: "SET_QR",
        payload: data,
    }),
    setSecu: (toggle) => ({
        type: "SET_SECU",
        payload: toggle,
    }),
    changeAuth: (toggle) => ({
        type: "CHANGE_AUTH",
        payload: toggle,
    }),
    changePay: (toggle) => ({
        type: "CHANGE_PAY",
        payload: toggle,
    }),
    message: (message) => ({ type: "SET_MESSAGE", payload: message }),
};

export const create2FA = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await secuService.create2fa(token);
        if (response.data) {
            dispatch(actions.setQr(response.data));
        }
    } catch (e) {
        dispatch(actions.message("create_2fa"));
    }
};

export const update2FA = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await secuService.update2fa(token, data);
        if (response.data) {
            dispatch(get2FAInfo());
        }
    } catch (e) {
        dispatch(actions.message("update_2fa"));
    }
};

export const verify2FA = (code) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await secuService.verify2fa(token, code);
        if (response) {
            dispatch(get2FAInfo());
        }
    } catch (e) {
        dispatch(actions.message("verify_2fa"));
    }
};

export const delete2FA = (twofa) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await secuService.delete2fa(token, twofa);
        if (response) {
            dispatch(get2FAInfo());
        }
    } catch (e) {
        dispatch(actions.message("delete_2fa"));
    }
};

export const get2FAInfo = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await secuService.info2fa(token);
        const { otp_for_login, otp_for_withdraw } = response.data;
        dispatch(actions.changeAuth(otp_for_login));
        dispatch(actions.changePay(otp_for_withdraw));
        if (otp_for_login || otp_for_withdraw) {
            dispatch(actions.setSecu(true));
        } else {
            dispatch(actions.setSecu(false));
        }
    } catch (e) {
        dispatch(actions.message("info_error"));
    }
};

export default secuReducer;
