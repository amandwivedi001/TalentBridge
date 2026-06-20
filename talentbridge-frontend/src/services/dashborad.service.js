import { api } from "./api";

export const getStudentDashboard =
  async () => {
    const response =
      await api.get(
        "/api/dashboard/student"
      );

    return response.data.data;
  };