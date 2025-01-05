import axios from "axios";
export const postImage = async (signal, image) => {
    const API_URL = import.meta.env.VITE_IMAGE_SERVICE_URL;
    try {
        const res = await axios.post(`${API_URL}/api/images/upload`, image, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            signal,
        });
        return res.data.imageUrl;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("POST image request cancelled");
            return;
        } else {
            console.error("POST image error:", error);
        }
        throw error;
    }
};
