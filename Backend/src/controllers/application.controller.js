import prisma from "../config/prisma.js";
import { generateCandidateMatchForApplication } from "../services/CandidateMatch.service.js";
import { createNotification } from "../services/notification.service.js";

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

        include: {
            recruiter: {
                select: {
                    userId: true,
                },
            },
        },
    });

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (!job.isActive) {
        throw new ApiError(400, "Job is no longer accepting applications");
    }

    const student = await prisma.studentProfile.findUnique({
        where: {
            id: studentId,
        },
        include: {
            resume: {
                include: {
                    analysis: true,
                },
            },
        },
    });

    if (!student.resume) {
        throw new ApiError(
            400,
            "Please upload your resume before applying"
        );
    }

    if (!student.resume.analysis) {
        throw new ApiError(
            400,
            "Resume analysis is required before applying"
        );
    }

    try {
        const application =
            await prisma.application.create({
                data: {
                    studentId,
                    jobId,
                },
            });

        await generateCandidateMatchForApplication(
            application.id
        );

        await createNotification(
            job.recruiter.userId,
            "New Application",
            `${req.user.name} applied for ${job.title}`,
            "APPLICATION_APPLIED"
        );

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

                            resume: {
                                include: {
                                    analysis: {
                                        select: {
                                            atsScore: true,
                                            cgpa: true,
                                            skills: true,
                                        },
                                    },
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

export const withdrawApplication =
    asyncHandler(async (req, res) => {

        const { jobId } = req.params;

        const job =
            await prisma.job.findUnique({
                where: {
                    id: jobId,
                },

                include: {
                    recruiter: {
                        select: {
                            userId: true,
                        },
                    },
                },
            });

        if (!job) {
            throw new ApiError(404, "Job not found");
        }

        const studentId =
            req.user.studentProfile.id;

        const application =
            await prisma.application.findUnique({
                where: {
                    studentId_jobId: {
                        studentId,
                        jobId,
                    },
                },
            });

        if (!application) {
            throw new ApiError(
                404,
                "Application not found"
            );
        }

        if (
            application.status !==
            "APPLIED"
        ) {
            throw new ApiError(
                400,
                `Application cannot be withdrawn because current status is ${application.status}`
            );
        }

        const updatedApplication =
            await prisma.application.update({
                where: {
                    id: application.id,
                },

                data: {
                    status: "WITHDRAWN",
                },
            });

        await createNotification(
            job.recruiter.userId,
            "Application Withdrawn",
            `${req.user.name} withdrew application for ${job.title}`,
            "APPLICATION_WITHDRAWN"
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedApplication,
                "Application withdrawn successfully"
            )
        );
    });

export const updateApplicationStatus =
    asyncHandler(async (req, res) => {

        const { applicationId } = req.params;

        const { status } = req.body;

        const recruiterId =
            req.user.recruiterProfile.id;

        const allowedStatuses = [
            "SHORTLISTED",
            "INTERVIEW",
            "HIRED",
            "REJECTED",
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            throw new ApiError(
                400,
                "Invalid application status"
            );
        }

        const application =
            await prisma.application.findUnique({
                where: {
                    id: applicationId,
                },

                include: {
                    student: true,
                    job: true,
                },
            });

        if (!application) {
            throw new ApiError(
                404,
                "Application not found"
            );
        }

        if (
            application.job.recruiterId !==
            recruiterId
        ) {
            throw new ApiError(
                403,
                "Access denied"
            );
        }

        if (
            application.status ===
            "WITHDRAWN"
        ) {
            throw new ApiError(
                400,
                "Cannot update a withdrawn application"
            );
        }

        if (application.status === status) {
            throw new ApiError(
                400,
                `Application is already ${status}`
            );
        }

        const updatedApplication =
            await prisma.application.update({
                where: {
                    id: applicationId,
                },

                data: {
                    status,
                },
            });

        const studentUserId =
            application.student.userId;

        switch (status) {
            case "SHORTLISTED":
                await createNotification(
                    studentUserId,
                    "Congratulations 🎉",
                    `You have been shortlisted for ${application.job.title}`,
                    "APPLICATION_SHORTLISTED"
                );
                break;

            case "INTERVIEW":
                await createNotification(
                    studentUserId,
                    "Interview Round",
                    `You have moved to the interview stage for ${application.job.title}`,
                    "APPLICATION_INTERVIEW"
                );
                break;

            case "HIRED":
                await createNotification(
                    studentUserId,
                    "Congratulations 🎉",
                    `You have been selected for ${application.job.title}`,
                    "APPLICATION_HIRED"
                );
                break;

            case "REJECTED":
                await createNotification(
                    studentUserId,
                    "Application Update",
                    `Your application for ${application.job.title} was not shortlisted`,
                    "APPLICATION_REJECTED"
                );
                break;

            default:
                break;
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedApplication,
                "Application status updated successfully"
            )
        );
    });


export const getApplicationPipeline = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
    });

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (
        job.recruiterId !==
        req.user.recruiterProfile.id
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

                candidateMatch: true,
            },
        });

    const pipeline = {
        applied: [],
        shortlisted: [],
        interview: [],
        hired: [],
        rejected: [],
        withdrawn: [],
    };

    for (const application of applications) {
        const candidate = {
            applicationId: application.id,

            student: {
                id: application.student.user.id,
                name: application.student.user.name,
                email: application.student.user.email,
            },

            status: application.status,

            matchScore:
                application.candidateMatch
                    ?.matchScore || 0,

            reasoning:
                application.candidateMatch?.reasoning || null,

            updatedAt: application.updatedAt,
        };

        switch (application.status) {
            case "APPLIED":
                pipeline.applied.push(candidate);
                break;

            case "SHORTLISTED":
                pipeline.shortlisted.push(candidate);
                break;

            case "INTERVIEW":
                pipeline.interview.push(candidate);
                break;

            case "HIRED":
                pipeline.hired.push(candidate);
                break;

            case "REJECTED":
                pipeline.rejected.push(candidate);
                break;

            case "WITHDRAWN":
                pipeline.withdrawn.push(candidate);
                break;

            default:
                break;
        }
    }

    Object.values(pipeline).forEach((group) => {
        group.sort(
            (a, b) => b.matchScore - a.matchScore
        );
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            pipeline,
            "Application pipeline fetched successfully"
        )
    );
})

export const getApplicationStats =
    asyncHandler(async (req, res) => {
        const studentId =
            req.user.studentProfile.id;

        const applications =
            await prisma.application.findMany({
                where: {
                    studentId,
                },

                select: {
                    status: true,
                },
            });

        const stats = {
            total: applications.length,

            applied: 0,
            shortlisted: 0,
            interview: 0,
            hired: 0,
            rejected: 0,
            withdrawn: 0,
        };

        for (const application of applications) {
            switch (application.status) {
                case "APPLIED":
                    stats.applied++;
                    break;

                case "SHORTLISTED":
                    stats.shortlisted++;
                    break;

                case "INTERVIEW":
                    stats.interview++;
                    break;

                case "HIRED":
                    stats.hired++;
                    break;

                case "REJECTED":
                    stats.rejected++;
                    break;

                case "WITHDRAWN":
                    stats.withdrawn++;
                    break;

                default:
                    break;
            }
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                stats,
                "Application analytics fetched successfully"
            )
        );
    });

export const getRecruiterApplications =
    asyncHandler(async (req, res) => {

        const recruiterId =
            req.user.recruiterProfile.id;

        const applications =
            await prisma.application.findMany({
                where: {

                    job: {
                        recruiterId,
                    },

                },

                include: {

                    job: {

                        select: {
                            id: true,
                            title: true,
                            role: true,
                        },

                    },

                    student: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },

                            resume: {
                                include: {
                                    analysis: {
                                        select: {
                                            atsScore: true,
                                            cgpa: true,
                                            skills: true,
                                        },
                                    },
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

                applications,

                "Applications fetched successfully"

            )

        );

    });

export const getApplicationDetails =
    asyncHandler(async (req, res) => {

        const { applicationId } = req.params;

        const recruiterId =
            req.user.recruiterProfile.id;

        const application =
            await prisma.application.findUnique({

                where: {
                    id: applicationId,
                },

                include: {
                    
                    candidateMatch: true,
                    
                    job: {
                        select: {
                            id: true,
                            title: true,
                            role: true,
                            recruiterId: true,
                        },
                    },

                    student: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },

                            resume: {
                                select: {
                                    fileName: true,
                                    fileUrl: true,
                                    uploadedAt: true,

                                    analysis: {
                                        select: {
                                            atsScore: true,
                                            summary: true,
                                            skills: true,
                                            strengths: true,
                                            weaknesses: true,
                                            missingSkills: true,
                                            suggestions: true,
                                            cgpa: true,
                                            tenthPercentage: true,
                                            twelfthPercentage: true,
                                            createdAt: true,
                                        },
                                    },
                                },
                            },
                        },
                    },

                },

            });

        if (!application) {

            throw new ApiError(
                404,
                "Application not found"
            );

        }

        if (
            application.job.recruiterId !==
            recruiterId
        ) {

            throw new ApiError(
                403,
                "Access denied"
            );

        }

        return res.status(200).json(

            new ApiResponse(

                200,

                application,

                "Application details fetched successfully"

            )

        );

    });