import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/prisma.js";
import { deleteResumeFromCloudinary, uploadResumeToCloudinary } from "../services/cloudinary.service.js";
import { extractTextFromPdf } from "../services/pdf.service.js";
import { analyzeResume } from "../services/gemini.service.js";

export const getMyResume = asyncHandler(async (req, res) => {

    const studentId = req.user.studentProfile.id;

    const existingResume = await prisma.resume.findUnique({
        where: {
            studentId
        },
    })

    if (!existingResume) {
        throw new ApiError(404, "Resume Not Found")
    }

    res.status(200).json(
        new ApiResponse(
            200,
            existingResume,
            "Resume Fetched Successfully"
        ));
})

export const uploadResume = asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    const studentId = req.user.studentProfile.id

    const existingResume = await prisma.resume.findUnique({
        where: {
            studentId
        },
    })

    if (existingResume) {
        await deleteResumeFromCloudinary(
            existingResume.publicId
        );
    }

    const uploadedResume = await uploadResumeToCloudinary(
        req.file.buffer
    );

    if (!uploadedResume?.secure_url ||
        !uploadedResume?.public_id) {
        throw new ApiError(
            500,
            "Failed to upload resume"
        )
    }

    const resume = await prisma.resume.upsert({
        where: {
            studentId
        },

        update: {
            fileName: req.file.originalname,
            fileUrl: uploadedResume.secure_url,
            publicId: uploadedResume.public_id
        },

        create: {
            studentId,
            fileName: req.file.originalname,
            fileUrl: uploadedResume.secure_url,
            publicId: uploadedResume.public_id
        }
    })

    const response = await fetch(resume.fileUrl);

    if (!response.ok) {
        throw new ApiError(500, "Failed to download resume")
    }

    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const resumeText = await extractTextFromPdf(buffer);

    const analysis = await analyzeResume(
        resumeText
    );

    await prisma.resumeAnalysis.upsert({
        where: {
            resumeId: resume.id,
        },

        update: {
            atsScore: analysis.atsScore,
            summary: analysis.summary,
            skills: analysis.skills,

            cgpa: analysis.cgpa,
            tenthPercentage:
                analysis.tenthPercentage,
            twelfthPercentage:
                analysis.twelfthPercentage,

            missingSkills:
                analysis.missingSkills,
            strengths:
                analysis.strengths,
            weaknesses:
                analysis.weaknesses,
            suggestions:
                analysis.suggestions,
        },

        create: {
            resumeId: resume.id,

            atsScore: analysis.atsScore,
            summary: analysis.summary,
            skills: analysis.skills,

            cgpa: analysis.cgpa,
            tenthPercentage:
                analysis.tenthPercentage,
            twelfthPercentage:
                analysis.twelfthPercentage,

            missingSkills:
                analysis.missingSkills,
            strengths:
                analysis.strengths,
            weaknesses:
                analysis.weaknesses,
            suggestions:
                analysis.suggestions,
        },
    });

    res.status(200).json(
        new ApiResponse(
            200,
            {
                resume,
                analysis: {
                    atsScore: analysis.atsScore,
                    skills: analysis.skills,
                    cgpa: analysis.cgpa,
                    tenthPercentage:
                        analysis.tenthPercentage,
                    twelfthPercentage:
                        analysis.twelfthPercentage,
                },
            },
            "Resume uploaded and analyzed successfully"
        )
    );
})

export const extractResumeText = asyncHandler(async (req, res) => {
    const studentId = req.user.studentProfile.id;

    const resume = await prisma.resume.findUnique({
        where: {
            studentId,
        },
    });

    if (!resume) {
        throw new ApiError(404, "Resume not found")
    }

    const response = await fetch(resume.fileUrl);

    if (!response.ok) {
        throw new ApiError(500, "Failed to download resume")
    }

    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const text = await extractTextFromPdf(buffer);

    const data = {
        fileName: resume.fileName,
        extractedText: text.slice(0, 2000),
    };

    res.status(200)
        .json(
            new ApiResponse(
                200,
                data,
                "Text from resume extracted successfully"
            )
        )
})

export const viewResume = asyncHandler(async (req, res) => {
    const studentId = req.user.studentProfile.id;

    const resume = await prisma.resume.findUnique({
        where: {
            studentId,
        },
    });

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    const response = await fetch(resume.fileUrl);

    if (!response.ok) {
        throw new ApiError(500, "Failed to fetch resume");
    }

    const buffer = Buffer.from(
        await response.arrayBuffer()
    );

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `inline; filename="${resume.fileName}"`
    );

    return res.send(buffer);
});