import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiError.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-2.5-flash";
const MAX_RETRIES = 3;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const retryableErrors = [
  429,
  500,
  502,
  503,
  504,
];

const parseGeminiJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  }
};

const generateWithRetry = async (prompt, temperature = 0.5) => {
  let lastError;

  for (
    let attempt = 1;
    attempt <= MAX_RETRIES;
    attempt++
  ) {
    try {
      console.log(
        `Gemini Attempt ${attempt}/${MAX_RETRIES}`
      );

      const response =
        await ai.models.generateContent({
          model: MODEL,
          contents: prompt,
          config: {
            temperature,
            responseMimeType:
              "application/json",
          },
        });

      const text =
        typeof response.text === "function"
          ? response.text()
          : response.text;

      if (!text?.trim()) {
        throw new Error(
          "Empty response received from Gemini"
        );
      }

      return parseGeminiJSON(text);
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

      const shouldRetry =
        (
          !status ||
          retryableErrors.includes(status)
        ) &&
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

  throw lastError;
};

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
- Return only JSON.
`;
      break;

    default:
      throw new ApiError(
        400,
        "Invalid interview type"
      );
  }

  try {
    const parsed =
      await generateWithRetry(
        prompt,
        0.7
      );

    if (
      !parsed?.questions ||
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
    console.error(
      "Question Generation Final Error:",
      error
    );

    // Fallback Questions
    switch (interviewType) {
      case "HR":
        return [
          "Tell me about yourself.",
          "What are your strengths?",
          "What is your biggest weakness?",
          "Why should we hire you?",
          "Where do you see yourself in 5 years?",
        ];

      case "DSA":
        return [
          "What is the time complexity of binary search?",
          "Difference between stack and queue?",
          "How does BFS differ from DFS?",
          "What is a binary search tree?",
          "Explain dynamic programming with an example.",
        ];

      case "SKILL_BASED":
        return [
          `Explain the fundamentals of ${skill}.`,
          `What are the key features of ${skill}?`,
          `Describe a real-world use case of ${skill}.`,
          `What challenges have you faced using ${skill}?`,
          `What are the best practices for ${skill}?`,
        ];

      default:
        return [
          "Explain your most impactful project.",
          "What was the biggest challenge you faced?",
          "How did you debug a difficult issue?",
          "Which technology are you most comfortable with?",
          "What would you improve in your project?",
        ];
    }
  }
};

export const evaluateAnswer = async (
  question,
  studentAnswer
) => {
  if (!question?.trim()) {
    throw new ApiError(
      400,
      "Question is required"
    );
  }

  if (!studentAnswer?.trim()) {
    return {
      score: 0,
      feedback:
        "No answer was provided by the candidate.",
    };
  }

  const prompt = `
You are an experienced technical interviewer.

Question:
${question}

Student Answer:
${studentAnswer}

Evaluate based on:
1. Correctness
2. Technical Depth
3. Clarity
4. Completeness

Return ONLY valid JSON:

{
  "score": 85,
  "feedback": "Good understanding of the concept..."
}

Rules:
- score must be between 0 and 100.
- feedback must be concise and actionable.
- Return only JSON.
`;

  try {
    const parsed =
      await generateWithRetry(
        prompt,
        0.3
      );

    return {
      score: Math.max(
        0,
        Math.min(
          100,
          Number(parsed?.score) || 0
        )
      ),
      feedback:
        typeof parsed?.feedback ===
        "string"
          ? parsed.feedback
          : "No feedback generated.",
    };
  } catch (error) {
    console.error(
      "Answer Evaluation Final Error:",
      error
    );

    return {
      score: 50,
      feedback:
        "Unable to evaluate the answer at the moment. Please try again later.",
    };
  }
};