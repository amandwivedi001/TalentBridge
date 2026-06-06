import prisma from "../config/prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getStudentProfile = asyncHandler(async (req, res) => {
  const profile = await prisma.studentProfile.findUnique({
    where: {
      userId: req.user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(new ApiResponse(200, profile, "Student profile fetched successfully"));
});

export const updateStudentProfile = asyncHandler(async (req, res) => {
  const {
    phone,
    college,
    degree,
    branch,
    graduationYear,
    skills,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    bio,
  } = req.validatedData;

  const updatedProfile = await prisma.studentProfile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      phone,
      college,
      degree,
      branch,
      graduationYear,
      skills,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      bio,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedProfile, "Student profile updated successfully")
    );
});