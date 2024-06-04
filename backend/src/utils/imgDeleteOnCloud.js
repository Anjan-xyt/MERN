import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImageOnCloud = async (imageURL) => {
  try {
    if (!imageURL) return null;
    const publicID = imageURL.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicID);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default deleteImageOnCloud;
