import { api } from "./api";

export const getProfile =
    async () => {

        const res =
            await api.get(
                "/api/settings/profile"
            );

        return res.data.data;

    };

export const updateProfile =
    async (data) => {

        const res =
            await api.patch(
                "/api/settings/profile",
                data
            );

        return res.data.data;
    };

export const changePassword =
    async (data) => {

        const res =
            await api.patch(
                "/api/settings/password",
                data
            );

        return res.data.data;

    };