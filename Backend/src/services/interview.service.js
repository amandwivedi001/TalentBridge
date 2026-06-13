import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiError.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MAX_RETRIES = 3;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateInterviewQuestions = async (
  interviewType,
  difficulty,
  skill,
  resumeAnalysis
) => {
  let prompt = "";

  switch (interviewType) {
    case "RESUME_BASED":
      prompt = `
You are a technical interviewer.

Generate exactly 5 interview questions.

Interview Type: Resume Based
Difficulty: ${difficulty}

Resume Summary:
${resumeAnalysis?.summary || ""}

Skills:
${resumeAnalysis?.skills?.join(", ") || ""}

Projects:
${resumeAnalysis?.projects?.join(", ") || ""}

Focus on:
- Projects
- Technologies
- Implementation decisions

Return ONLY valid JSON:

{
  "questions": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}

Rules:
- Exactly 5 questions.
- No markdown.
- No code blocks.
- Return only JSON.
`;
      break;

    case "DSA":
      prompt = `
Generate exactly 5 DSA interview questions.

Difficulty: ${difficulty}

Topics:
- Arrays
- Linked Lists
- Trees
- Graphs
- Complexity Analysis

Return ONLY valid JSON:

{
  "questions": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}

Rules:
- Exactly 5 questions.
- No markdown.
- No code blocks.
- Return only JSON.
`;
      break;

    case "SKILL_BASED":
      prompt = `
Skill: ${skill}

Difficulty: ${difficulty}

Generate exactly 5 interview questions.

Return ONLY valid JSON:

{
  "questions": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}

Rules:
- Exactly 5 questions.
- No markdown.
- No code blocks.
- Return only JSON.
`;
      break;

    case "HR":
      prompt = `
Generate exactly 5 HR interview questions.

Difficulty: ${difficulty}

Return ONLY valid JSON:

{
  "questions": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}

Rules:
- Exactly 5 questions.
- No markdown.
- No code blocks.
- Return only JSON.
`;
      break;

    default:
      throw new ApiError(
        400,
        "Invalid interview type"
      );
  }

  let lastError;

  for (
    let attempt = 1;
    attempt <= MAX_RETRIES;
    attempt++
  ) {
    try {
      console.log(
        `Question Generation Attempt ${attempt}/${MAX_RETRIES}`
      );

      const response =
        await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            temperature: 0.7,
            responseMimeType:
              "application/json",
          },
        });

      if (!response?.text) {
        throw new Error(
          "Empty response received from Gemini"
        );
      }

      const cleanedText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed =
        JSON.parse(cleanedText);

      if (
        !parsed.questions ||
        !Array.isArray(parsed.questions)
      ) {
        throw new Error(
          "Invalid response format"
        );
      }

      const questions =
        parsed.questions
          .filter(
            (question) =>
              typeof question === "string" &&
              question.trim()
          )
          .slice(0, 5);

      if (questions.length !== 5) {
        throw new Error(
          "Expected exactly 5 questions"
        );
      }

      return questions;
    } catch (error) {
      lastError = error;

      const status =
        error?.status ||
        error?.code ||
        error?.cause?.status;

      console.error(
        `Question Generation Attempt ${attempt} Failed:`,
        error.message
      );

      const retryableErrors = [
        429,
        500,
        502,
        503,
        504,
      ];

      const shouldRetry =
        retryableErrors.includes(status) &&
        attempt < MAX_RETRIES;

      if (!shouldRetry) {
        break;
      }

      const delay =
        Math.pow(2, attempt) * 1000;

      console.log(
        `Retrying Gemini in ${
          delay / 1000
        }s...`
      );

      await sleep(delay);
    }
  }

  console.error(
    "Question Generation Final Error:",
    lastError
  );

  throw new ApiError(
    500,
    "Question generation service is temporarily unavailable. Please try again later."
  );
};