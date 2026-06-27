import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { evaluateAnswer, generateFinalInterviewReport, generateInterviewQuestions } from "../services/interview.service.js";

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

    if (
      question.session.status ===
      "COMPLETED"
    ) {
      throw new ApiError(
        400,
        "Interview has already been completed"
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

export const completeInterview =
  asyncHandler(async (req, res) => {
    const studentId =
      req.user.studentProfile.id;

    const { sessionId } =
      req.params;

    const session =
      await prisma.interviewSession.findUnique({
        where: {
          id: sessionId,
        },

        include: {
          questions: true,
        },
      });

    if (!session) {
      throw new ApiError(
        404,
        "Interview session not found"
      );
    }

    if (
      session.studentId !== studentId
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    if (
      session.status === "COMPLETED"
    ) {
      throw new ApiError(
        400,
        "Interview already completed"
      );
    }

    const unansweredQuestions =
      session.questions.filter(
        (question) =>
          !question.answer?.trim()
      );

    if (
      unansweredQuestions.length > 0
    ) {
      throw new ApiError(
        400,
        "Please answer all questions before completing interview"
      );
    }

    const totalScore =
      session.questions.reduce(
        (sum, question) =>
          sum +
          (question.score || 0),
        0
      );

    const overallScore =
      Math.round(
        totalScore /
        session.questions.length
      );

    const report =
      await generateFinalInterviewReport(
        session.interviewType,
        session.difficulty,
        session.questions
      );

    const updatedSession =
      await prisma.interviewSession.update({
        where: {
          id: sessionId,
        },

        data: {
          status: "COMPLETED",

          overallScore,

          strengths:
            report.strengths,

          weaknesses:
            report.weaknesses,

          improvementAreas:
            report.improvementAreas,

          overallFeedback:
            report.overallFeedback,
        },
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          overallScore:
            updatedSession.overallScore,

          strengths:
            updatedSession.strengths,

          weaknesses:
            updatedSession.weaknesses,

          improvementAreas:
            updatedSession.improvementAreas,

          overallFeedback:
            updatedSession.overallFeedback,
        },
        "Interview completed successfully"
      )
    );
  });


export const getInterviewHistory =
  asyncHandler(async (req, res) => {
    const studentId =
      req.user.studentProfile.id;

    const interviews =
      await prisma.interviewSession.findMany({
        where: {
          studentId,
        },

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          interviewType: true,
          difficulty: true,
          status: true,
          overallScore: true,
          createdAt: true,

          _count: {
            select: {
              questions: true,
            },
          },
        },
      });

    const formattedInterviews =
      interviews.map((interview) => ({
        id: interview.id,

        interviewType:
          interview.interviewType,

        difficulty:
          interview.difficulty,

        status:
          interview.status,

        overallScore:
          interview.overallScore,

        totalQuestions:
          interview._count.questions,

        createdAt:
          interview.createdAt,
      }));

    return res.status(200).json(
      new ApiResponse(
        200,
        formattedInterviews,
        "Interview history fetched successfully"
      )
    );
  });

export const getInterviewDetails =
  asyncHandler(async (req, res) => {
    const studentId =
      req.user.studentProfile.id;

    const { sessionId } =
      req.params;

    const session =
      await prisma.interviewSession.findUnique({
        where: {
          id: sessionId,
        },

        include: {
          questions: {
            orderBy: {
              createdAt: "asc",
            },

            select: {
              id: true,
              question: true,
              answer: true,
              score: true,
              feedback: true,
            },
          },
        },
      });

    if (!session) {
      throw new ApiError(
        404,
        "Interview session not found"
      );
    }

    if (
      session.studentId !== studentId
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    const answeredQuestions =
      session.questions.filter(
        (question) =>
          question.answer?.trim()
      ).length;

    const totalQuestions =
      session.questions.length;

    const completionPercentage =
      totalQuestions > 0
        ? Math.round(
          (answeredQuestions /
            totalQuestions) *
          100
        )
        : 0;

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          sessionId: session.id,

          interviewType:
            session.interviewType,

          difficulty:
            session.difficulty,

          skill: session.skill,

          status:
            session.status,

          overallScore:
            session.overallScore,

          strengths:
            session.strengths,

          weaknesses:
            session.weaknesses,

          improvementAreas:
            session.improvementAreas,

          overallFeedback:
            session.overallFeedback,

          answeredQuestions,

          totalQuestions,

          completionPercentage,

          createdAt:
            session.createdAt,

          questions:
            session.questions,
        },
        "Interview details fetched successfully"
      )
    );
  });

export const getInterviewStats =
  asyncHandler(async (req, res) => {
    const studentId =
      req.user.studentProfile.id;

    const interviews =
      await prisma.interviewSession.findMany({
        where: {
          studentId,
        },

        select: {
          status: true,
          overallScore: true,
        },
      });

    const totalInterviews =
      interviews.length;

    const completedInterviews =
      interviews.filter(
        (interview) =>
          interview.status ===
          "COMPLETED"
      );

    const completedCount =
      completedInterviews.length;

    const totalScore =
      completedInterviews.reduce(
        (sum, interview) =>
          sum +
          (interview.overallScore || 0),
        0
      );

    const averageScore =
      completedCount > 0
        ? Math.round(
          totalScore /
          completedCount
        )
        : 0;

    const bestScore =
      completedCount > 0
        ? Math.max(
          ...completedInterviews.map(
            (interview) =>
              interview.overallScore || 0
          )
        )
        : 0;

    const worstScore =
      completedCount > 0
        ? Math.min(
          ...completedInterviews.map(
            (interview) =>
              interview.overallScore || 0
          )
        )
        : 0;

      const latestInterviewScore =
            completedCount > 0
              ? completedInterviews[
                completedInterviews.length - 1
              ]?.overallScore || 0
              : 0
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalInterviews,
          completedInterviews:
            completedCount,
          averageScore,
          bestScore,
          worstScore,
          latestInterviewScore,
        },
        "Interview analytics fetched successfully"
      )
    );
  });

export const getInterviewReport =
    asyncHandler(async (req, res) => {

        const studentId =
            req.user.studentProfile.id;

        const { sessionId } =
            req.params;

        const session =
            await prisma.interviewSession.findUnique({

                where: {
                    id: sessionId,
                },

                include: {

                    questions: {

                        orderBy: {
                            createdAt: "asc",
                        },

                        select: {
                            id: true,
                            question: true,
                            answer: true,
                            score: true,
                            feedback: true,
                        },

                    },

                },

            });

        if (!session) {

            throw new ApiError(
                404,
                "Interview report not found."
            );

        }

        if (
            session.studentId !== studentId
        ) {

            throw new ApiError(
                403,
                "Access denied."
            );

        }

        if (
            session.status !==
            "COMPLETED"
        ) {

            throw new ApiError(
                400,
                "Interview has not been completed yet."
            );

        }

        return res.status(200).json(

            new ApiResponse(

                200,

                {

                    sessionId: session.id,

                    interviewType:
                        session.interviewType,

                    difficulty:
                        session.difficulty,

                    skill:
                        session.skill,

                    overallScore:
                        session.overallScore,

                    overallFeedback:
                        session.overallFeedback,

                    strengths:
                        session.strengths,

                    weaknesses:
                        session.weaknesses,

                    improvementAreas:
                        session.improvementAreas,

                    completedAt:
                        session.updatedAt,

                    totalQuestions:
                        session.questions.length,

                    questions:
                        session.questions,

                },

                "Interview report fetched successfully"

            )

        );

    });