import { asyncHandler } from "../utils/asyncHandler.js";

export const getMyResume = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Resume module ready"
    });
})

export const uploadResume = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Resume module ready"
    });
})