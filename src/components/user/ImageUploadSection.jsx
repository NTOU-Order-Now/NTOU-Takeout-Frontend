import { useState } from "react";

const ImageUploadSection = () => {
    const [preview, setPreview] = useState(null);
    const handleFilePreview = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl);
        } else {
            setPreview(null);
        }
    };
    return (
        <>
            {preview && (
                <div className="absolute top-0 left-0 w-full h-full">
                    <label className="w-full h-full cursor-pointer flex items-center justify-center bg-gray-500 bg-opacity-20 hover:bg-opacity-40 transition">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                handleFilePreview(file);
                            }}
                            className="hidden"
                        />
                    </label>
                </div>
            )}
        </>
    );
};

export default ImageUploadSection;
