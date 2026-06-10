import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getMyResume = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Resume module ready"
    });
})

export const uploadResume = asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    const data = {
        fileName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        bufferSize: req.file.buffer.length
    }

    res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Resume Uploaded successfully"
        )
    )
})