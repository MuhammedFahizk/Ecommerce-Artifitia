
import cloudinary from 'cloudinary';

export const uploadImageCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'Posts',
      });
      return result;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };
  