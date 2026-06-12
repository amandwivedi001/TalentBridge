import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { checkEligibility } from "./eligibility.service.js";
import { generateCandidateMatch } from "./match.service.js";

export const generateCandidateMatchForApplication = async (
    applicationId
) => {

    const application = await prisma.application.findUnique({
        where: {
            id: applicationId,
        },

        include: {
            job: true,

            student: {
                include: {
                    resume: {
                        include: {
                            analysis: true,
                        },
                    },
                },
            },
        },
    });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    if (!application.job) {
        throw new ApiError(404, "Job not found");
    }

    if (!application.student?.resume) {
        throw new ApiError(404, "Resume not found");
    }

    if (!application.student.resume.analysis) {
        throw new ApiError(404, "Resume analysis report not found");
    }

    const eligibility =
    await checkEligibility(
        application.student.resume.analysis,
        application.job
    );

    console.log("Eligibility:", eligibility);
    
    if (!eligibility.eligible) {
        const savedMatchReport =
            await prisma.candidateMatch.upsert({
                where: {
                    applicationId,
                },

                update: {
                    matchScore: 0,
                    matchedSkills: [],
                    missingSkills: [],
                    reasoning: eligibility.reason,
                },

                create: {
                    applicationId,
                    matchScore: 0,
                    matchedSkills: [],
                    missingSkills: [],
                    reasoning: eligibility.reason,
                },
            });

        return savedMatchReport;
    }

    const matchCandidateReport = await generateCandidateMatch(
        application.student.resume.analysis,
        application.job
    );

    if (!matchCandidateReport) {
        throw new ApiError(
            500,
            "Candidate match report generation failed"
        );
    }

    const savedMatchReport = await prisma.candidateMatch.upsert({
        where: {
            applicationId,
        },

        update: {
            matchScore: matchCandidateReport.matchScore,
            matchedSkills: matchCandidateReport.matchedSkills,
            missingSkills: matchCandidateReport.missingSkills,
            reasoning: matchCandidateReport.reasoning,
        },

        create: {
            applicationId,
            matchScore: matchCandidateReport.matchScore,
            matchedSkills: matchCandidateReport.matchedSkills,
            missingSkills: matchCandidateReport.missingSkills,
            reasoning: matchCandidateReport.reasoning,
        },
    });

    return savedMatchReport;
}