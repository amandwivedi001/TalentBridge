import { api } from "./api";

export const getResume = () =>
  api.get("/api/resumes/me");

export const getResumeAnalysis = () =>
  api.get("/api/analysis/me");


export const generateResumeAnalysis = () =>
  api.get("/api/analysis/generate");

export const viewResume  = () =>
  api.get("/api/resumes/view");

export const uploadResume = (formData) =>
  api.post(
    "/api/resumes/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

