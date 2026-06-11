import { z } from "zod";

export const createJobSchema = z.object({
  title: z
    .string()
    .min(3, "Job title is required")
    .max(100),

  role: z
    .string()
    .min(2, "Role is required")
    .max(100),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  requiredSkills: z
    .array(z.string())
    .min(1, "At least one skill is required"),

  location: z
    .string()
    .max(100)
    .optional(),

  salary: z
    .string()
    .max(100)
    .optional(),

  minCgpa: z
    .number()
    .min(0)
    .max(10)
    .optional(),

  minTenthPercentage: z
    .number()
    .min(0)
    .max(100)
    .optional(),

  minTwelfthPercentage: z
    .number()
    .min(0)
    .max(100)
    .optional(),
});