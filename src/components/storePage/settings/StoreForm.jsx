import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import BusinessHoursSelector from "../../authPage/BusinessHoursSelector";
import { useStoreInfoQuery } from "../../../hooks/setting/useStoreInfoQuery.jsx";
import { useStoreInfoMutation } from "../../../hooks/setting/useStoreInfoMutation";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function StoreForm({ storeId }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        file: null,
        filePath: "",
        address: "",
        phoneNumber: "",
        businessHours: Array(7).fill(
            Array(2).fill({
                start: "09:00",
                end: "18:00",
            }),
        ),
    });

    // 獲取商店資訊
    const {
        storeInfo,
        isLoading: isLoadingStore,
        isError: isQueryError,
    } = useStoreInfoQuery(storeId);
    console.debug("storeInfo", storeInfo);
    // 更新商店資訊的 mutation
    const {
        updateStore,
        isPending: isUpdating,
        isError: isMutationError,
    } = useStoreInfoMutation(storeId);

    // 當獲取到商店資訊後，更新表單資料
    useEffect(() => {
        if (storeInfo) {
            setFormData({
                name: storeInfo.name || "",
                description: storeInfo.description || "",
                file: null,
                filePath: storeInfo.picture || "",
                address: storeInfo.address || "",
                phoneNumber: storeInfo.phoneNumber || "",
                businessHours:
                    storeInfo.businessHours || formData.businessHours,
            });
        }
    }, [storeInfo]);

    // 表單欄位更新處理函數
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // 檔案上傳處理
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const localPath = event.target.value;
            setFormData((prev) => ({
                ...prev,
                file: file,
                filePath: localPath,
            }));
        }
    };

    // 表單提交處理
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStore({
                name: formData.name,
                picture: formData.file ? formData.file : formData.filePath, // 如果有新文件就用新文件，否則保持原來的URL
                address: formData.address,
                description: formData.description,
                businessHours: formData.businessHours,
            });
            alert("更新成功！");
        } catch (error) {
            console.error("提交表單時發生錯誤:", error);
        }
    };

    if (isLoadingStore) {
        return <div className="p-4">載入中...</div>;
    }

    if (isQueryError || isMutationError) {
        return <div className="p-4">載入發生錯誤</div>;
    }

    return (
        <div className="p-4 max-w-screen">
            <form
                onSubmit={handleSubmit}
                className="p-4 space-y-4 font-semibold font-notoTC"
            >
                {/* Store name */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        商家名稱：
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            handleInputChange("name", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家名稱"
                    />
                </div>

                {/* Store description */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        商家描述：
                    </label>
                    <textarea
                        rows="3"
                        value={formData.description}
                        onChange={(e) =>
                            handleInputChange("description", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家描述"
                    />
                </div>

                {/* Upload image */}
                <div className="w-full">
                    <label className="block text-gray-700 mb-1">圖片：</label>
                    <div className="flex items-center w-full space-x-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={formData.filePath}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="請選擇圖片"
                            />
                        </div>
                        <div className="flex-none w-30">
                            <label
                                htmlFor="file-upload"
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
                            >
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="mr-1"
                                />
                                上傳圖片
                            </label>
                        </div>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Store address */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        商家地址：
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                            handleInputChange("address", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家地址"
                    />
                </div>

                {/* Store phone number */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        商家電話：
                    </label>
                    <input
                        type="number"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                        }
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家電話"
                    />
                </div>

                {/* Store business hours */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        營業時間：
                    </label>
                    <BusinessHoursSelector
                        businessHours={formData.businessHours}
                        onUpdate={(hours) =>
                            handleInputChange("businessHours", hours)
                        }
                    />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className={`px-6 py-2 bg-orange-500 text-white rounded-lg ${
                            isUpdating
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-orange-600"
                        }`}
                    >
                        {isUpdating ? "更新中..." : "儲存變更"}
                    </button>
                </div>
            </form>
        </div>
    );
}

StoreForm.propTypes = {
    storeId: PropTypes.string.isRequired,
};
export default StoreForm;
