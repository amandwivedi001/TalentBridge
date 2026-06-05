import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { hashPassword } from "../utils/password.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  if (!["STUDENT", "RECRUITER"].includes(role)) {
    throw new ApiError(400, "Role must be STUDENT or RECRUITER");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      studentProfile: role === "STUDENT" ? { create: {} } : undefined,
      recruiterProfile: role === "RECRUITER" ? { create: {} } : undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      studentProfile: true,
      recruiterProfile: true,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      createdAt: true,
      studentProfile: true,
      recruiterProfile: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { password: _, ...safeUser } = user;

  const token = generateToken(safeUser);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: safeUser,
        token,
      },
      "Login successful"
    )
  );
});

export const getMe = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});