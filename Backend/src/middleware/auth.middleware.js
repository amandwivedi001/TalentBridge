import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken||req.headers.authorization;

  if (!token) {
    throw new ApiError(401, "Access denied. No token provided");
  }

  const decoded = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
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

  if (!user) {
    throw new ApiError(401, "Invalid token. User not found");
  }

  req.user = user;
  next();
});

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to access this route");
    }

    next();
  };
};