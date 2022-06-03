import { groupService } from "./group.service";

let initialState = {
    groups: null,
    message: "",
    group: null,
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_GROUPs":
            return {
                ...state,
                groups: action.payload,
            };
        case "SET_GROUP":
            return {
                ...state,
                group: action.payload,
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
    setGroups: (data) => ({
        type: "SET_GROUPs",
        payload: data,
    }),
    setGroup: (data) => ({
        type: "SET_GROUP",
        payload: data,
    }),
    message: (message) => ({ type: "SET_MESSAGE", payload: message }),
};

export const getGroups = () => async (dispatch) => {
    try {
        let response = await groupService.getGroups();
        if (response.data) {
            dispatch(actions.setGroups(response.data));
        }
    } catch (e) {
        dispatch(actions.message("get_group_err"));
    }
};

export const getGroup = (id) => async (dispatch) => {
    try {
        let response = await groupService.getGroup(id);
        if (response.data) {
            dispatch(actions.setGroup(response.data));
        }
    } catch (e) {
        dispatch(actions.message("get_group_err"));
    }
};

export const createGroup = (data) => async (dispatch) => {
    try {
        let response = await groupService.createGroup(data);
        if (response.data) {
            dispatch(getGroup());
            dispatch(actions.message("group_create"));
        }
    } catch (e) {
        dispatch(actions.message("create_group_err"));
    }
};

export default groupReducer;
