import prisma from "../config/prisma.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const applyToJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const studentId = req.user.studentProfile.id;

    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
    });

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (!job.isActive) {
        throw new ApiError(400, "Job is no longer accepting applications");
    }

    try {
        const application =
            await prisma.application.create({
                data: {
                    studentId,
                    jobId,
                },
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                application,
                "Applied successfully"
            )
        );
    } catch (error) {
        if (error.code === "P2002") {
            throw new ApiError(
                409,
                "You have already applied to this job"
            );
        }

        throw error;
    }
});

export const getMyApplications =
    asyncHandler(async (req, res) => {
        const studentId =
            req.user.studentProfile.id;

        const applications =
            await prisma.application.findMany({
                where: {
                    studentId,
                },

                include: {
                    job: {
                        select: {
                            id: true,
                            title: true,
                            role: true,
                            location: true,
                            salary: true,
                            isActive: true,
                        },
                    },
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

        return res.status(200).json(
            new ApiResponse(
                200,
                applications,
                "Applications fetched successfully"
            )
        );
    });

export const getApplicantsForJob =
    asyncHandler(async (req, res) => {
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

        const applicants =
            await prisma.application.findMany({
                where: {
                    jobId,
                },

                include: {
                    student: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

        return res.status(200).json(
            new ApiResponse(
                200,
                applicants,
                "Applicants fetched successfully"
            )
        );
    });