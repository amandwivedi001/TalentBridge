import { z } from "zod";

export const startInterviewSchema = z.object({
  interviewType: z.enum([
    "RESUME_BASED",
    "DSA",
    "SKILL_BASED",
    "HR",
  ]),

  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),

  skill: z.string().optional(),
});