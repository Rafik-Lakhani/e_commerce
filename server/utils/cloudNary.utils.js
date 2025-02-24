import { v2 as cloudinary } from 'cloudinary';

export const ImageUpload  = async (File) => {
    const result = await cloudinary.uploader.upload(File,{
        resource_type:"auto",
    });
    return result;
}