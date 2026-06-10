import streamifier from "streamifier"
import cloudinary from "../config/cloudinary.js"

const uploadResumeToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "resumes"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    })
}

const deleteResumeFromCloudinary = async(publicId) => {
    const result = await cloudinary.uploader.destroy(publicId, 
        {
            resource_type: "raw",
        }
    )

    return result.result === "ok";
}

export {
    uploadResumeToCloudinary,
    deleteResumeFromCloudinary
}