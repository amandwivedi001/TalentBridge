import { api } from "./api";

export const getJobs = async () => {
  const res = await api.get("/api/jobs");
  return res.data.data;
};

export const getJobById = async (jobId) => {
  const res = await api.get(`/api/jobs/${jobId}`);
  return res.data.data;
};