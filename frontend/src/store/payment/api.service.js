import { instance } from "../../utils/axios.instance";

const token = localStorage.getItem("user");

const paymentVisa = async (userData) => {
    const res = await instance.post(`/payment/`, userData, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    return res;
};

export const payService = {
    paymentVisa,
};
