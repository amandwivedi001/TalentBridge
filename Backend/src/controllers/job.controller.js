import prisma from "../config/prisma.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createJob = asyncHandler(async (req, res) => {
  const recruiterId = req.user.recruiterProfile.id;

  const {
    title,
    role,
    description,
    requiredSkills,
    location,
    salary,
    minCgpa,
    minTenthPercentage,
    minTwelfthPercentage,
  } = req.body;

  const job = await prisma.job.create({
    data: {
      recruiterId,
      title,
      role,
      description,
      requiredSkills,
      location,
      salary,
      minCgpa,
      minTenthPercentage,
      minTwelfthPercentage,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      job,
      "Job created successfully"
    )
  );
});

export const getMyJobs = asyncHandler(async (req, res) => {
  const recruiterId = req.user.recruiterProfile.id;

  const jobs = await prisma.job.findMany({
    where: {
      recruiterId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      jobs,
      "Jobs fetched successfully"
    )
  );
});

export const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      recruiter: {
        select: {
          id: true,
          companyName: true,
          designation: true,
          companyLocation: true,
        },
      },
    },
  });

  if (!job) {
    throw new ApiError(
      404,
      "Job not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      job,
      "Job fetched successfully"
    )
  );
});