import { payService } from "./api.service";

let initialState = {
    visa_key: null,
    message: "",
    usdt_key: null,
};

const payReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VISA_KEY":
            return {
                ...state,
                groups: action.payload,
            };
        case "SET_USDT_KEY":
            return {
                ...state,
                usdt_key: action.payload,
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
};

export const actions = {
    setVisaKey: (data) => ({
        type: "SET_VISA_KEY",
        payload: data,
    }),
    setUsdtKey: (data) => ({
        type: "SET_USDT_KEY",
        payload: data,
    }),
    message: (message) => ({ type: "SET_MESSAGE", payload: message }),
};

export const paymentVisa = (data) => async (dispatch) => {
    try {
        let response = await payService.paymentVisa(data);
        if (response.data) {
            dispatch(actions.setVisaKey(response.data));
        }
    } catch (e) {
        if (e.response) {
            dispatch(actions.message("visa_false"));
        }
    }
};

// export const ustdPayment = () => async (dispatch) => {
//     try {
//         let response = await
//     } catch (e) {
//         dispatch(actions.message("ustd_err"));
//     }
// };

export default payReducer;
