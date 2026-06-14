import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getStudentDashboard =
    asyncHandler(async (req, res) => {
        const studentId =
            req.user.studentProfile.id;

        const [
            resume,
            applications,
            interviews,
        ] = await Promise.all([
            prisma.resume.findUnique({
                where: {
                    studentId,
                },

                include: {
                    analysis: true,
                },
            }),

            prisma.application.findMany({
                where: {
                    studentId,
                },

                select: {
                    status: true,
                },
            }),

            prisma.interviewSession.findMany({
                where: {
                    studentId,
                },

                select: {
                    status: true,
                    overallScore: true,
                },
            }),
        ]);

        const resumeScore =
            resume?.analysis?.atsScore || 0;

        const applicationStats = {
            total: applications.length,

            applied:
                applications.filter(
                    (application) =>
                        application.status ===
                        "APPLIED"
                ).length,

            shortlisted:
                applications.filter(
                    (application) =>
                        application.status ===
                        "SHORTLISTED"
                ).length,

            interview:
                applications.filter(
                    (application) =>
                        application.status ===
                        "INTERVIEW"
                ).length,

            rejected:
                applications.filter(
                    (application) =>
                        application.status ===
                        "REJECTED"
                ).length,

            hired:
                applications.filter(
                    (application) =>
                        application.status ===
                        "HIRED"
                ).length,

            withdrawn:
                applications.filter(
                    (application) =>
                        application.status ===
                        "WITHDRAWN"
                ).length,
        };

        const completedInterviews =
            interviews.filter(
                (interview) =>
                    interview.status ===
                    "COMPLETED"
            );

        const totalInterviews =
            interviews.length;

        const completedCount =
            completedInterviews.length;

        const averageScore =
            completedCount > 0
                ? Math.round(
                    completedInterviews.reduce(
                        (sum, interview) =>
                            sum +
                            (interview.overallScore ||
                                0),
                        0
                    ) / completedCount
                )
                : 0;

        const bestScore =
            completedCount > 0
                ? Math.max(
                    ...completedInterviews.map(
                        (interview) =>
                            interview.overallScore ||
                            0
                    )
                )
                : 0;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    resumeScore,

                    applications: {
                        total:
                            applicationStats.total,

                        applied:
                            applicationStats.applied,

                        shortlisted:
                            applicationStats.shortlisted,

                        interview:
                            applicationStats.interview,

                        rejected:
                            applicationStats.rejected,

                        hired:
                            applicationStats.hired,

                        withdrawn:
                            applicationStats.withdrawn
                    },

                    interviews: {
                        total: totalInterviews,

                        completed:
                            completedCount,

                        averageScore,

                        bestScore,

                        latestInterviewScore:
                            completedCount > 0
                                ? completedInterviews[
                                    completedInterviews.length - 1
                                ]?.overallScore || 0
                                : 0
                    },
                },
                "Dashboard data fetched successfully"
            )
        );
    });