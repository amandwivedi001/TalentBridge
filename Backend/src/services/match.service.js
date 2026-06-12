import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiError.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MATCH_PROMPT = `
You are an ATS Candidate Matching Engine.

Compare the candidate profile with the job requirements.

Evaluate:

1. Skill alignment
2. Relevant experience from summary
3. Overall suitability

Rules:

- Score from 0 to 100.
- Only consider requirements explicitly mentioned in the job.
- Do not assume missing requirements.
- matchedSkills = skills present in both candidate and job.
- missingSkills = important job skills not found in candidate.
- reasoning must be under 40 words.

Return ONLY valid JSON:

{
  "matchScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "reasoning": string
}
`;

export const generateCandidateMatch = async (resumeAnalysis, job) => {
  if (
    !resumeAnalysis ||
    !resumeAnalysis.skills ||
    !resumeAnalysis.summary
  ) {
    throw new ApiError(
      400,
      "Invalid resume analysis data"
    );
  }

  if (
    !job ||
    !job.description ||
    !job.requiredSkills
  ) {
    throw new ApiError(
      400,
      "Invalid job data"
    );
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
${MATCH_PROMPT}

Candidate Profile:
${JSON.stringify({
      skills: resumeAnalysis.skills,
      summary: resumeAnalysis.summary
    }, null, 2)}

Job Details:
${JSON.stringify({
      requiredSkills: job.requiredSkills,
      description: job.description
    }, null, 2)}
`,
    config: {
      temperature: 0.2,
    },
  });

  if (!response?.text) {
    throw new ApiError(400, "Response not generated from gemini")
  }

  const cleanedText = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const result = JSON.parse(cleanedText);

  return {
    matchScore: Number(result.matchScore) || 0,
    matchedSkills: Array.isArray(result.matchedSkills)
      ? result.matchedSkills
      : [],
    missingSkills: Array.isArray(result.missingSkills)
      ? result.missingSkills
      : [],
    reasoning: result.reasoning || "",
  }
}