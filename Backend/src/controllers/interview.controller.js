import prisma from "../config/prisma.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import { generateInterviewQuestions } from "../services/interview.service.js";

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