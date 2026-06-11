import prisma from "../config/prisma.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { extractTextFromPdf } from "../services/pdf.service.js";
import { analyzeResume } from "../services/gemini.service.js";

export const analyzeMyResume = asyncHandler(async (req, res) => {
  const studentId = req.user.studentProfile.id;

  const resume = await prisma.resume.findUnique({
    where: {
      studentId,
    },
  });

  if (!resume) {
    throw new ApiError(
      404,
      "Resume not found"
    );
  }

  let response;

  try {
    response = await fetch(resume.fileUrl);
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to fetch resume"
    );
  }

  if (!response.ok) {
    throw new ApiError(
      500,
      "Failed to download resume"
    );
  }

  const arrayBuffer = await response.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const resumeText = await extractTextFromPdf(buffer);
  

  const analysis = await analyzeResume(
    resumeText
  );

  const savedAnalysis =
  await prisma.resumeAnalysis.upsert({
    where: {
      resumeId: resume.id,
    },

    update: {
      atsScore: analysis.atsScore,
      summary: analysis.summary,
      skills: analysis.skills,
      missingSkills: analysis.missingSkills,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
    },

    create: {
      resumeId: resume.id,
      atsScore: analysis.atsScore,
      summary: analysis.summary,
      skills: analysis.skills,
      missingSkills: analysis.missingSkills,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      savedAnalysis,
      "Resume analyzed successfully"
    )
  );
});


export const getMyAnalysis = asyncHandler(
  async (req, res) => {
    const studentId =
      req.user.studentProfile.id;

    const resume =
      await prisma.resume.findUnique({
        where: {
          studentId,
        },
      });

    if (!resume) {
      throw new ApiError(
        404,
        "Resume not found"
      );
    }

    const analysis =
      await prisma.resumeAnalysis.findUnique({
        where: {
          resumeId: resume.id,
        },
      });

    if (!analysis) {
      throw new ApiError(
        404,
        "Resume analysis not found"
      );
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        analysis,
        "Resume analysis fetched successfully"
      )
    );
  }
);