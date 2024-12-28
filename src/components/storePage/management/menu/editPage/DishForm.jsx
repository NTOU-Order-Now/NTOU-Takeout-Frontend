import PropTypes from "prop-types";
import { useImageUploadMutation } from "../../../../../hooks/image/useImageUploadMutation.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";

const DishForm = ({
    defaultName,
    defaultDescription,
    defaultPrice,
    defaultCategory,
    defaultImage,
    categoryNames = [],
    onNameChange,
    onDescriptionChange,
    onPriceChange,
    onCategoryChange,
    onImageChange,
}) => {
    const {
        uploadImage,
        isPending: isImageUploaing,
        isError: isImageUploadError,
    } = useImageUploadMutation();
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // 開始上傳
                onImageChange({ url: null });
                console.debug("file:", file);
                // 上傳圖片
                const imageUrl = await uploadImage(file);

                // 更新圖片 URL
                onImageChange({ url: imageUrl });
            } catch (error) {
                console.error("upload Failed:", error);
                onImageChange({ url: null });
            }
        }
    };
    return (
        <div className="mt-10 p-6 bg-white">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">名稱：</label>
                <input
                    type="text"
                    defaultValue={defaultName}
                    placeholder="請輸入名稱"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => onNameChange(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    商品描述：
                </label>
                <textarea
                    defaultValue={defaultDescription}
                    placeholder="請輸入商品描述"
                    className="w-full h-24 px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => onDescriptionChange(e.target.value)}
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">圖片：</label>
                <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={defaultImage || ""}
                            placeholder="請選擇圖片"
                            readOnly
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <label
                        htmlFor="dish-image-upload"
                        className={`
                            flex-shrink-0 px-6 py-2 rounded-md
                            ${
                                isImageUploaing
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-orange-400 hover:bg-orange-600 cursor-pointer"
                            }
                            text-white transition-colors duration-200
                        `}
                    >
                        {isImageUploaing ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="mr-2 animate-spin"
                                />
                                上傳中
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="mr-2"
                                />
                                上傳圖片
                            </>
                        )}
                    </label>
                    <input
                        id="dish-image-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                        disabled={isImageUploaing}
                    />
                </div>
                {/* 圖片預覽 */}
                {defaultImage && (
                    <div className="mt-2">
                        <img
                            src={defaultImage}
                            alt="商品圖片"
                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                        />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">價格：</label>
                <input
                    type="number"
                    defaultValue={defaultPrice}
                    placeholder="請輸入價格"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => onPriceChange(Number(e.target.value))}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">類別：</label>
                <input
                    type="text"
                    defaultValue={defaultCategory}
                    placeholder="請輸入類別"
                    list="category-options"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => onCategoryChange(e.target.value)}
                />
                <datalist id="category-options">
                    {categoryNames.map((cat, idx) => (
                        <option key={idx} value={cat} />
                    ))}
                </datalist>
            </div>
        </div>
    );
};

DishForm.propTypes = {
    defaultName: PropTypes.string,
    defaultDescription: PropTypes.string,
    defaultPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultImage: PropTypes.string,
    defaultCategory: PropTypes.string,
    onImageUpload: PropTypes.func,
    categoryNames: PropTypes.arrayOf(PropTypes.string),
    onNameChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
};

export default DishForm;
