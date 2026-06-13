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

export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await prisma.job.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      recruiter: {
        select: {
          id: true,
          companyName: true,
          companyLocation: true,
          designation: true,
        },
      },
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

export const updateJob = asyncHandler(async (req, res) => {
  const recruiterId = req.user.recruiterProfile.id;
  const { jobId } = req.params;

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

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
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

  if (
    job.recruiterId !==
    req.user.recruiterProfile.id
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  const updateData = await prisma.job.update({
    where: {
      id : jobId,
    },

    data: {
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
  })

  return res.status(200).json(
    new ApiResponse(
      200,
      updateData,
      "Job Updated successfully"
    )
  );
})

export const deleteJob = asyncHandler(async (req, res) => {
  const recruiterId = req.user.recruiterProfile.id;

  const { jobId } = req.params;

  const job = await prisma.job.findUnique({
    where: {
      id : jobId,
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

  if (
    job.recruiterId !==
    req.user.recruiterProfile.id
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  await prisma.job.delete({
    where: {
      id: jobId,
    }
  })

  return res.status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Job deleted successfully"
      )
    )
})