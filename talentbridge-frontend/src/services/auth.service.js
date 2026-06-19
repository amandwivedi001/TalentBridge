import { api } from "./api";

export const loginUser = async (data) => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
}

export const registerUser = async (data) => {
    return api.post("/api/auth/signup", data, {
    });
}

export const getCurrentUser = async () => {

    const res = await api.get("/api/auth/me");

    return res.data.data;
} 


export const logOut = async () => {
    return await api.get("/api/auth/logout");
}