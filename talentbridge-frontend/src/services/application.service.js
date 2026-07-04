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

export const getRecruiterApplications =
  async () => {
    const res = await api.get(
      "/api/applications/recruiter"
    );

    return res.data.data;
  };

export const getApplicationDetails =
  async (
    applicationId
  ) => {

    const res =
      await api.get(
        `/api/applications/${applicationId}`
      );

    return res.data.data;

  };

export const updateApplicationStatus =
  async (
    applicationId,
    status
  ) => {

    const res =
      await api.patch(
        `/api/applications/${applicationId}/status`,
        {
          status,
        }
      );

    return res.data.data;

  };

export const getApplicantsForJob =
    async (jobId) => {

        const res =
            await api.get(
                `/api/applications/job/${jobId}`
            );

        return res.data.data;

    };