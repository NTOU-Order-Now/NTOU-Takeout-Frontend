import PropTypes from "prop-types";
import { useState } from "react";

const DataForm = ({ formData, inputValues, currentStep, onInputChange, onFileChange }) => {
    const [preview, setPreview] = useState(null);
    const fieldKeys = currentStep === 0 ? ["code"] : ["uploadImage", "phoneNumber", "address"];

    const handleFilePreview = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="mt-8 w-[70vw]">
            <form>
                {formData.map((placeholder, index) => {
                    const fieldKey = fieldKeys[index];
                    const isFileInput = fieldKey === "uploadImage";

                    return (
                        <div key={index} className="mb-4">
                            {isFileInput ? (
                                <div
                                    className="w-full h-36 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 relative"
                                >
                                    <label className="w-full h-full flex items-center justify-center cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*" // image only
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                handleFilePreview(file);
                                                onFileChange(fieldKey, file);
                                            }}
                                            className="hidden"
                                        />
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="圖片預覽"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <span className="text-gray-500">
                                                上傳商家圖片
                                            </span>
                                        )}
                                    </label>
                                    {/* image will cover upload section */}
                                    {preview && (
                                        <div className="absolute top-0 left-0 w-full h-full">
                                            <label className="w-full h-full cursor-pointer flex items-center justify-center bg-gray-500 bg-opacity-20 hover:bg-opacity-40 transition">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        handleFilePreview(file);
                                                        onFileChange(fieldKey, file);
                                                    }}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    placeholder={placeholder}
                                    value={inputValues[fieldKey] || ""}
                                    onChange={(e) => onInputChange(fieldKey, e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                                />
                            )}
                        </div>
                    );
                })}
            </form>
        </div>
    );
};

DataForm.propTypes = {
    formData: PropTypes.arrayOf(PropTypes.string).isRequired,
    inputValues: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
        .isRequired,
    currentStep: PropTypes.number.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
};

export default DataForm;
