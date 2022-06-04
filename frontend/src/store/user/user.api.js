import userService from "./user.service";

let initialState = {
    user: null,
    messages: null,
    groups: null,
    isAuth: false,
    isTraider: false,
    payment: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                ...action.payload,
            };
        case "SET_GROUP":
            return {
                ...state,
                groups: action.payload,
            };
        case "SET_PAYMENT":
            return {
                ...state,
                payment: action.payload,
            };
        case "RESET_USER":
            return {
                ...state,
                user: action.payload,
                messages: "",
            };
        case "SET_MESSAGE":
            return {
                ...state,
                messages: action.payload,
            };
        case "SET_IS_AUTH":
            return {
                ...state,
                isAuth: action.payload,
            };
        default:
            return state;
    }
};

export const actions = {
    setDataUser: (data) => ({
        type: "SET_USER",
        payload: { user: data, isTraider: data.is_trader },
    }),
    setIsAuth: (toggle) => ({
        type: "SET_IS_AUTH",
        payload: toggle,
    }),
    setPay: (data) => ({
        type: "SET_PAYMENT",
        payload: data,
    }),
    setDataGroup: (data) => ({
        type: "SET_GROUP",
        payload: data,
    }),
    resetUser: () => ({
        type: "RESET_USER",
        payload: null,
    }),
    message: (message) => ({ type: "SET_MESSAGE", payload: message }),
};

export const paymetVisa = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.paymentVisa(token, data);
        if (response.data) {
            dispatch(actions.setPay(response.data));
        }
    } catch (e) {
        if (e.response) {
            dispatch(actions.message("visa_false"));
        }
    }
};

export const binanceApiActive = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.trader_apply(token, data);
        if (response.data) {
            dispatch(actions.message("binance_active"));
        }
    } catch (e) {
        if (e.response.data.message) {
            dispatch(actions.message(e.response.data.message[0]));
        }
    }
};

export const login = (data) => async (dispatch) => {
    try {
        let response = await userService.login(data);
        if (response.data) {
            dispatch(actions.setIsAuth(true));
            localStorage.setItem("token", response.data.auth_token);
        }
    } catch (e) {
        if (e.response.data.message) {
            dispatch(actions.message(e.response.data.message[0]));
        }
    }
};

export const activation = (data) => async (dispatch) => {
    try {
        let response = await userService.activation(data);
        if (response.status === 204) {
            dispatch(actions.message("activated"));
        }
    } catch (e) {
        dispatch(actions.message("error_activation"));
    }
};

export const regiter = (data) => async (dispatch) => {
    try {
        let response = await userService.register(data);
        if (response.status === 201) {
            dispatch(actions.message("register_success"));
        } else {
            dispatch(actions.message(response.data));
        }
    } catch (e) {
        dispatch(actions.message("error_register"));
    }
};

export const me = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.me(token);
        if (response.data) {
            dispatch(actions.setIsAuth(true));
            dispatch(actions.setDataUser(response.data));
        }
    } catch (e) {
        dispatch(actions.message("error_me"));
    }
};

export const getMyGroups = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.getMyGroups(token);
        if (response.data) {
            dispatch(actions.setDataGroup(response.data));
        }
    } catch (e) {
        dispatch(actions.message("error_groups"));
    }
};

export const logOut = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.logout(token);
        if (response) {
            localStorage.removeItem("token");
            dispatch(actions.resetUser());
            dispatch(actions.setIsAuth(false));
        }
    } catch (e) {
        dispatch(actions.message("error_logout"));
    }
};

export const resetPassword = (email) => async (dispatch) => {
    try {
        let response = await userService.reset_password(email);
        if (response) {
            dispatch(actions.message("reset_success"));
        }
    } catch (e) {
        dispatch(actions.message("error_reset"));
    }
};

export const confirmPassword = (data) => async (dispatch) => {
    try {
        let response = await userService.confirm_password(data);
        if (response) {
            dispatch(actions.message("confirm_password_success"));
        }
    } catch (e) {
        dispatch(actions.message("error_confirm_password"));
    }
};

export const verification = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.verification(data, token);
        if (response) {
            dispatch(actions.message("verification_success"));
        }
    } catch (e) {
        dispatch(actions.message("error_confirm_password"));
    }
};

export const createGroup = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.createGroup(data, token);
        if (response) {
            dispatch(actions.message("group_create_success"));
            dispatch(getTraiderGroup());
        }
    } catch (e) {
        dispatch(actions.message("error_group_create"));
    }
};

export const getTraiderGroup = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        let response = await userService.getTraiderGroup(token);
        if (response) {
            dispatch(actions.setDataGroup(response.data));
        }
    } catch (e) {
        dispatch(actions.message("error_group"));
    }
};

export default userReducer;
