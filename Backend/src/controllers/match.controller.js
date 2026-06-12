import prisma from "../config/prisma.js";
import { generateCandidateMatchForApplication } from "../services/CandidateMatch.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const generateMatchForApplication =
  asyncHandler(async (req, res) => {

    const { applicationId } = req.params;

    const result =
      await generateCandidateMatchForApplication(
        applicationId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Candidate match generated successfully"
      )
    );
});

export const getRankedCandidates = asyncHandler(
  async (req, res) => {
    const { jobId } = req.params;

    const recruiterId =
      req.user.recruiterProfile.id;

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      throw new ApiError(
        404,
        "Job not found"
      );
    }

    if (
      job.recruiterId !== recruiterId
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    const applications =
      await prisma.application.findMany({
        where: {
          jobId,
        },

        include: {
          candidateMatch: true,

          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

    const rankedCandidates =
      applications
        .filter(
          (app) => app.candidateMatch
        )
        .sort(
          (a, b) =>
            b.candidateMatch.matchScore -
            a.candidateMatch.matchScore
        )
        .map((app) => ({
          applicationId: app.id,

          student: {
            id: app.student.user.id,
            name: app.student.user.name,
            email: app.student.user.email,
          },

          matchScore:
            app.candidateMatch.matchScore,

          matchedSkills:
            app.candidateMatch
              .matchedSkills,

          missingSkills:
            app.candidateMatch
              .missingSkills,

          reasoning:
            app.candidateMatch.reasoning,

          applicationStatus:
            app.status,
        }));

    return res.status(200).json(
      new ApiResponse(
        200,
        rankedCandidates,
        "Ranked candidates fetched successfully"
      )
    );
  }
);