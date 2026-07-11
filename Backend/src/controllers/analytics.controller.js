import prisma from "../config/prisma.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getRecruiterAnalytics =
    asyncHandler(async (req, res) => {

        const recruiterId =
            req.user.recruiterProfile.id;

        const recruiterJobs =
            await prisma.job.findMany({

                where: {
                    recruiterId,
                },

                select: {
                    id: true,
                    title: true,
                    isActive: true,
                },

            });

        const jobIds =
            recruiterJobs.map(
                (job) => job.id
            );

        const [
            applications,
            candidateMatches,
        ] = await Promise.all([

            prisma.application.findMany({

                where: {
                    jobId: {
                        in: jobIds,
                    },
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

                    job: {

                        select: {
                            title: true,
                        },

                    },

                    candidateMatch: true,

                },

                orderBy: {
                    createdAt: "desc",
                },

            }),

            prisma.candidateMatch.findMany({

                where: {

                    application: {

                        job: {

                            recruiterId,

                        },

                    },

                },

            }),

        ]);

        // -------------------------
        // Overview
        // -------------------------

        const overview = {

            totalJobs:
                recruiterJobs.length,

            activeJobs:
                recruiterJobs.filter(
                    (job) => job.isActive
                ).length,

            closedJobs:
                recruiterJobs.filter(
                    (job) => !job.isActive
                ).length,

            totalApplications:
                applications.length,

            avgMatchScore:
                candidateMatches.length
                    ? Math.round(

                        candidateMatches.reduce(

                            (sum, match) =>
                                sum +
                                match.matchScore,

                            0

                        ) /

                        candidateMatches.length

                    )
                    : 0,

        };

        // -------------------------
        // Pipeline
        // -------------------------

        const pipeline = {

            APPLIED: 0,

            SHORTLISTED: 0,

            INTERVIEW: 0,

            HIRED: 0,

            REJECTED: 0,

            WITHDRAWN: 0,

        };

        applications.forEach(
            (application) => {

                pipeline[
                    application.status
                ]++;

            }
        );

        // -------------------------
        // Top Jobs
        // -------------------------

        const topJobs =
            recruiterJobs.map(
                (job) => {

                    const jobApplications =
                        applications.filter(
                            (application) =>
                                application.jobId ===
                                job.id
                        );

                    const scores =
                        jobApplications
                            .filter(
                                (application) =>
                                    application.candidateMatch
                            )
                            .map(
                                (application) =>
                                    application.candidateMatch.matchScore
                            );

                    return {

                        id: job.id,

                        title: job.title,

                        applications:
                            jobApplications.length,

                        avgMatchScore:
                            scores.length

                                ? Math.round(

                                    scores.reduce(
                                        (sum, score) =>
                                            sum + score,
                                        0
                                    ) /
                                    scores.length

                                )

                                : 0,

                    };

                }
            )

            .sort(
                (a, b) =>
                    b.applications -
                    a.applications
            )

            .slice(0, 5);

        // -------------------------
        // Top Candidates
        // -------------------------

        const topCandidates =
            applications

                .filter(
                    (application) =>
                        application.candidateMatch
                )

                .sort(
                    (a, b) =>
                        b.candidateMatch.matchScore -
                        a.candidateMatch.matchScore
                )

                .slice(0, 5)

                .map(
                    (application) => ({

                        applicationId:
                            application.id,

                        studentName:
                            application.student.user.name,

                        email:
                            application.student.user.email,

                        jobTitle:
                            application.job.title,

                        matchScore:
                            application.candidateMatch.matchScore,

                    })
                );

        // -------------------------
        // Recent Applications
        // -------------------------

        const recentApplications =
            applications

                .slice(0, 5)

                .map(
                    (application) => ({

                        id:
                            application.id,

                        studentName:
                            application.student.user.name,

                        jobTitle:
                            application.job.title,

                        status:
                            application.status,

                        createdAt:
                            application.createdAt,

                    })
                );

        return res.status(200).json(

            new ApiResponse(

                200,

                {

                    overview,

                    pipeline,

                    topJobs,

                    topCandidates,

                    recentApplications,

                },

                "Recruiter analytics fetched successfully"

            )

        );

    });