import { api } from "./api";

export const getMyJobs = async () => {
    const res = await api.get("/api/jobs/my-jobs");
    return res.data.data;
};

export const getJobById = async (jobId) => {
    const res = await api.get(`/api/jobs/${jobId}`);
    return res.data.data;
};

export const createJob = async (payload) => {
    const res = await api.post("/api/jobs", payload);
    return res.data.data;
};

export const updateJob = async (jobId, payload) => {
    const res = await api.patch(`/api/jobs/${jobId}`, payload);
    return res.data.data;
};

export const deleteJob = async (jobId) => {
    const res = await api.delete(`/api/jobs/${jobId}`);
    return res.data.data;
};

export const updateJobStatus = async (
    jobId,
    isActive
) => {
    const res = await api.patch(
        `/api/jobs/${jobId}/status`,
        { isActive }
    );

    return res.data.data;
};

export const getRankedCandidates =
    async (jobId) => {

        const res =
            await api.get(
                `/api/matches/job/${jobId}`
            );

        return res.data.data;

    };