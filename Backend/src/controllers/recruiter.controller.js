import prisma from "../config/prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRecruiterProfile = asyncHandler(async (req, res) => {
  const profile = await prisma.recruiterProfile.findUnique({
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
    .json(
      new ApiResponse(200, profile, "Recruiter profile fetched successfully")
    );
});

export const updateRecruiterProfile = asyncHandler(async (req, res) => {
  const {
    companyName,
    companyWebsite,
    companyLocation,
    companyDescription,
    designation,
  } = req.validatedData;

  const updatedProfile = await prisma.recruiterProfile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      companyName,
      companyWebsite,
      companyLocation,
      companyDescription,
      designation,
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
      new ApiResponse(
        200,
        updatedProfile,
        "Recruiter profile updated successfully"
      )
    );
});