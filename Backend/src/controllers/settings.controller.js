import bcrypt from "bcrypt";

import prisma from "../config/prisma.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProfile =
    asyncHandler(async (req, res) => {

        const userId = req.user.id;

        const user = await prisma.user.findUnique({

            where: {
                id: userId,
            },

            select: {

                id: true,

                name: true,

                email: true,

                role: true,

                studentProfile: true,

                recruiterProfile: true,

            },

        });

        if (!user) {

            throw new ApiError(
                404,
                "User not found"
            );

        }

        const profile =
            user.role === "STUDENT"

                ? user.studentProfile

                : user.recruiterProfile;

        return res.status(200).json(

            new ApiResponse(

                200,

                {

                    user: {

                        id: user.id,

                        name: user.name,

                        email: user.email,

                        role: user.role,

                    },

                    profile,

                },

                "Profile fetched successfully"

            )

        );

    });

export const updateProfile =
    asyncHandler(async (req, res) => {

        const userId = req.user.id;

        const {

            name,

            ...profileData

        } = req.body;

        await prisma.user.update({

            where: {
                id: userId,
            },

            data: {
                name,
            },

        });

        let profile;

        if (req.user.role === "STUDENT") {

            profile =
                await prisma.studentProfile.update({

                    where: {
                        userId,
                    },

                    data: profileData,

                });

        }

        else {

            profile =
                await prisma.recruiterProfile.update({

                    where: {
                        userId,
                    },

                    data: profileData,

                });

        }

        return res.status(200).json(

            new ApiResponse(

                200,

                profile,

                "Profile updated successfully"

            )

        );

    });

export const changePassword =
    asyncHandler(async (req, res) => {

        const {

            currentPassword,

            newPassword,

        } = req.body;

        const user =
            await prisma.user.findUnique({

                where: {
                    id: req.user.id,
                },

            });

        const isPasswordCorrect =
            await bcrypt.compare(

                currentPassword,

                user.password

            );

        if (!isPasswordCorrect) {

            throw new ApiError(

                400,

                "Current password is incorrect"

            );

        }

        const hashedPassword =
            await bcrypt.hash(

                newPassword,

                10

            );

        await prisma.user.update({

            where: {
                id: req.user.id,
            },

            data: {
                password: hashedPassword,
            },

        });

        return res.status(200).json(

            new ApiResponse(

                200,

                null,

                "Password updated successfully"

            )

        );

    });