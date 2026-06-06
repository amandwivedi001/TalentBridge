import { z } from "zod";

export const studentProfileSchema = z
  .object({
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid phone number")
      .optional(),

    college: z
      .string()
      .trim()
      .min(2, "College name must be at least 2 characters")
      .max(100, "College name cannot exceed 100 characters")
      .optional(),

    degree: z
      .string()
      .trim()
      .min(2, "Degree must be at least 2 characters")
      .max(100, "Degree cannot exceed 100 characters")
      .optional(),

    branch: z
      .string()
      .trim()
      .min(2, "Branch must be at least 2 characters")
      .max(100, "Branch cannot exceed 100 characters")
      .optional(),

    graduationYear: z
      .coerce
      .number()
      .int("Graduation year must be an integer")
      .min(2000, "Graduation year must be after 2000")
      .max(2100, "Graduation year must be before 2100")
      .optional(),

    skills: z
      .array(
        z.string().trim().min(1, "Skill cannot be empty")
      )
      .max(30, "Maximum 30 skills allowed")
      .optional(),

    linkedinUrl: z
      .string()
      .url("Invalid LinkedIn URL")
      .optional(),

    githubUrl: z
      .string()
      .url("Invalid GitHub URL")
      .optional(),

    portfolioUrl: z
      .string()
      .url("Invalid Portfolio URL")
      .optional(),

    bio: z
      .string()
      .trim()
      .max(500, "Bio cannot exceed 500 characters")
      .optional(),
  })
  .strict();