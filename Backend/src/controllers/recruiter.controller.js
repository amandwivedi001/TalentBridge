import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRecruiterProfile = asyncHandler(async(req, res) => {
    res.status(201)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Recruiter Profile fetched successfully"
            )
        )
})