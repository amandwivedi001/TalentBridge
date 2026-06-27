import { api } from "./api";

export const startInterview = async (
  payload
) => {
  const res = await api.post(
    "/api/interviews/start",
    payload
  );

  return res.data.data;
};

export const getInterviewStats =
  async () => {
    const res = await api.get(
      "/api/interviews/stats"
    );

    return res.data.data;
  };

export const getInterviewHistory =
  async () => {
    const res = await api.get(
      "/api/interviews/history"
    );

    return res.data.data;
  };

export const getInterviewDetails =
  async (sessionId) => {
    const res = await api.get(
      `/api/interviews/${sessionId}`
    );

    return res.data.data;
  };

export const submitAnswer =
  async (
    questionId,
    answer
  ) => {
    const res = await api.post(
      `/api/interviews/questions/${questionId}/answer`,
      { answer }
    );

    return res.data.data;
  };

export const completeInterview =
  async (sessionId) => {
    const res = await api.post(
      `/api/interviews/${sessionId}/complete`
    );

    return res.data.data;
  };

export const getInterviewReport =
    async (sessionId) => {

        const res =
            await api.get(
                `/api/interviews/${sessionId}/report`
            );

        return res.data.data;

    };