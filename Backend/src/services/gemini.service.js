import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiError.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MAX_RETRIES = 3;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const ANALYSIS_PROMPT = `
You are an expert ATS Resume Analyzer.

Analyze the provided resume and return ONLY valid JSON.

Response schema:

{
  "atsScore": number,
  "summary": string,
  "skills": string[],
  "missingSkills": string[],
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}

Rules:
- atsScore must be between 0 and 100.
- summary must be concise and professional.
- skills, missingSkills, strengths, weaknesses and suggestions must always be arrays.
- Return ONLY valid JSON.
- No markdown.
- No code blocks.
- No explanations.
`;

export const analyzeResume = async (resumeText) => {
  if (!resumeText?.trim()) {
    throw new ApiError(400, "Resume text is required");
  }

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `Gemini Analysis Attempt ${attempt}/${MAX_RETRIES}`
      );

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
${ANALYSIS_PROMPT}

Resume:

${resumeText}
`,
        config: {
          temperature: 0.2,
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

      const result = JSON.parse(cleanedText);

      return {
        atsScore: Number(result.atsScore) || 0,
        summary: result.summary || "",
        skills: Array.isArray(result.skills)
          ? result.skills
          : [],
        missingSkills: Array.isArray(
          result.missingSkills
        )
          ? result.missingSkills
          : [],
        strengths: Array.isArray(result.strengths)
          ? result.strengths
          : [],
        weaknesses: Array.isArray(result.weaknesses)
          ? result.weaknesses
          : [],
        suggestions: Array.isArray(result.suggestions)
          ? result.suggestions
          : [],
      };
    } catch (error) {
      lastError = error;

      const status =
        error?.status ||
        error?.code ||
        error?.cause?.status;

      console.error(
        `Gemini Attempt ${attempt} Failed:`,
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
        `Retrying Gemini in ${delay / 1000}s...`
      );

      await sleep(delay);
    }
  }

  console.error(
    "Gemini Analysis Final Error:",
    lastError
  );

  throw new ApiError(
    500,
    "Resume analysis service is temporarily unavailable. Please try again later."
  );
};