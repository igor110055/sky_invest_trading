import { instance } from "@utils/axios.instance";

const APP_URL = "/copytrade/trade_group/";
const token = localStorage.getItem("token");

export const groupService = {
    getGroup: async (id) => {
        return await instance.get(`${APP_URL}${id}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    },
    getGroups: async () => {
        return await instance.get(`${APP_URL}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    },
    createGroup: async (data) => {
        return await instance.post(`${APP_URL}`, data, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    },
    deteleGroup: async () => {
        return await instance.delete(``);
    },
};
