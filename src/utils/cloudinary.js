import { v2 as cloudinary } from "cloudinary";
import exp from "constants";
// File System
import fs from "fs";

// File Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (loacalFilePath) => {
    try {
        if (!loacalFilePath) return null;
        // Upload the file on CLoudinary
        const response = await cloudinary.uploader.upload(loacalFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded succesfully
        // console.log("File is Uploaded on Cloudinary", response.url);
        fs.unlinkSync(loacalFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(loacalFilePath) // remove the locally saved temporary file as the upload operation got failed 
        return null
    }
}


// delete image from cloudinary
const deleteCloudinaryImage = async (imageUrl) => {
    try {
        if (!imageUrl) {
            throw new Error("Image URL is missing");
        }
        
        // Extract public_id from the image URL
        const publicId = imageUrl.split('/').pop().split('.')[0];
        
        if (!publicId) {
            throw new Error("Invalid image URL");
        }

        // Delete the image from Cloudinary
        const response = await cloudinary.uploader.destroy(publicId);

        if (response.result !== 'ok') {
            throw new Error("Failed to delete image from Cloudinary");
        }

        // Image deletion successful
        return true;
    } catch (error) {
        // Error occurred during image deletion
        console.error("Error deleting image from Cloudinary:", error.message);
        return false;
    }
};


export {
    uploadOnCloudinary,
    deleteCloudinaryImage
} 