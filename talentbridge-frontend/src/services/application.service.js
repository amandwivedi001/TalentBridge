import { api } from "./api";

export const applyToJob = async (jobId) => {
  const res = await api.post(
    `/api/applications/${jobId}`
  );

  return res.data.data;
};

export const getMyApplications =
  async () => {
    const res = await api.get(
      "/api/applications/my-applications"
    );

    return res.data.data;
  };