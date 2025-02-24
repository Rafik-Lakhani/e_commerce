import { ImageUpload } from '../utils/cloudNary.utils.js'


export const handleImageUpload = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Convert each file to Base64 and upload
        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const buffer64 = Buffer.from(file.buffer).toString("base64");
                const url = `data:${file.mimetype};base64,${buffer64}`;
                return await ImageUpload(url);
            })
        );
        res.status(200).json({
            message: "Images uploaded successfully",
            results: uploadedImages,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server Error' });
    }
}