import { z } from "zod";

export const recruiterProfileSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters")
      .optional(),

    companyWebsite: z
      .string()
      .url("Invalid company website URL")
      .optional(),

    companyLocation: z
      .string()
      .trim()
      .min(2, "Company location must be at least 2 characters")
      .max(100, "Company location cannot exceed 100 characters")
      .optional(),

    companyDescription: z
      .string()
      .trim()
      .min(10, "Company description must be at least 10 characters")
      .max(1000, "Company description cannot exceed 1000 characters")
      .optional(),

    designation: z
      .string()
      .trim()
      .min(2, "Designation must be at least 2 characters")
      .max(100, "Designation cannot exceed 100 characters")
      .optional(),
  })
  .strict();