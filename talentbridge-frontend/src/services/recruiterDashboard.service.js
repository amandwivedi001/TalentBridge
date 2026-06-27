import { api } from "./api";

export const getRecruiterDashboard =
    async () => {

        const res =
            await api.get(
                "/api/dashboard/recruiter"
            );

        return res.data.data;

    };

export const getRecruiterJobs =
    async () => {

        const res =
            await api.get(
                "/api/jobs/my-jobs"
            );

        return res.data.data;

    };