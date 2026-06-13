import prisma from "../config/prisma.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import { evaluateAnswer, generateInterviewQuestions } from "../services/interview.service.js";

export const startInterview = asyncHandler(
    async (req, res) => {
        const {
            interviewType,
            difficulty,
            skill,
        } = req.body;

        const studentId =
            req.user.studentProfile.id;

        let resumeAnalysis = null;

        if (
            interviewType === "RESUME_BASED"
        ) {
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

            resumeAnalysis =
                await prisma.resumeAnalysis.findUnique({
                    where: {
                        resumeId: resume.id,
                    },
                });

            if (!resumeAnalysis) {
                throw new ApiError(
                    404,
                    "Resume analysis not found"
                );
            }
        }

        const questions =
            await generateInterviewQuestions(
                interviewType,
                difficulty,
                skill,
                resumeAnalysis
            );

        const session =
            await prisma.interviewSession.create({
                data: {
                    studentId,
                    interviewType,
                    difficulty,
                    skill,
                },
            });

        await prisma.interviewQuestion.createMany({
            data: questions.map((question) => ({
                sessionId: session.id,
                question,
            })),
        });

        const interview =
            await prisma.interviewSession.findUnique({
                where: {
                    id: session.id,
                },

                select: {
                    id: true,
                    interviewType: true,
                    difficulty: true,

                    questions: {
                        select: {
                            id: true,
                            question: true,
                        },
                    },
                },
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                interview,
                "Interview started successfully"
            )
        );
    }
);

export const submitAnswer = asyncHandler(
  async (req, res) => {
    const studentId =
      req.user.studentProfile.id;

    const { questionId } = req.params;

    const { answer } = req.body;

    const question =
      await prisma.interviewQuestion.findUnique({
        where: {
          id: questionId,
        },

        include: {
          session: true,
        },
      });

    if (!question) {
      throw new ApiError(
        404,
        "Question not found"
      );
    }

    if (
      question.session.studentId !==
      studentId
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    const evaluation =
      await evaluateAnswer(
        question.question,
        answer
      );

    const updatedQuestion =
      await prisma.interviewQuestion.update({
        where: {
          id: questionId,
        },

        data: {
          answer,
          score: evaluation.score,
          feedback:
            evaluation.feedback,
        },
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          questionId:
            updatedQuestion.id,

          score:
            updatedQuestion.score,

          feedback:
            updatedQuestion.feedback,
        },
        "Answer evaluated successfully"
      )
    );
  }
);