import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false,
                error: true
            });
        }

        // Pass the file path to Cloudinary
        const uploadImage = await uploadImageCloudinary(file.path);

        return res.json({
            message: "Upload done",
            data: uploadImage,   // contains Cloudinary URL
            success: true,
            error: false
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export default uploadImageController;
