import { api } from "./api";

export const getRecruiterAnalytics =
    async () => {

        const res =
            await api.get(
                "/api/analytics/recruiter"
            );

        return res.data.data;

    };