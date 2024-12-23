import Header from "../../components/storePage/home/Header.jsx";
import StoreForm from "../../components/storePage/settings/StoreForm.jsx";
import useSidebarStore from "../../stores/common/sidebarStore.js";
import { useSystemContext } from "../../context/useSystemContext.jsx";
import { useState } from "react";
import { useStoreInfoMutation } from "../../hooks/setting/useStoreInfoMutation.jsx";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Settings = () => {
    const title = useSidebarStore((state) => state.title);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    // const storeName = useStoreForm((state) => state.storeName);
    const { userInfo } = useSystemContext();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        file: null,
        filePath: "",
        address: "",
        phoneNumber: "",
        businessHours: Array(7)
            .fill()
            .map(() =>
                Array(2)
                    .fill()
                    .map(() => ({
                        first: "09:00",
                        second: "18:00",
                    })),
            ),
    });
    const {
        updateStore,
        isPending: isUpdating,
        isError: isMutationError,
    } = useStoreInfoMutation(userInfo?.storeId);
    const handleSaveInfoData = async (e) => {
        e.preventDefault();
        try {
            await updateStore({
                name: formData.name,
                picture: formData.file ? formData.file : formData.filePath, // 如果有新文件就用新文件，否則保持原來的URL
                address: formData.address,
                description: formData.description,
                businessHours: formData.businessHours,
            });
        } catch (error) {
            console.error("提交表單時發生錯誤:", error);
        }
    };
    const saveButton = (
        <button
            onClick={handleSaveInfoData}
            className=" bg-orange-500 text-white rounded-lg px-3 py-1 font-sm shadow-md relative right-4  w-[60px]"
        >
            {isUpdating ? (
                <FontAwesomeIcon icon={faEllipsis} beatFade size="lg" />
            ) : (
                "儲存"
            )}
        </button>
    );
    return (
        <div className="flex flex-col h-screen">
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[saveButton]}
            />
            <div className="sticky top-[54px] mt-[54px] z-20 ">
                <StoreForm
                    storeId={userInfo?.storeId}
                    formData={formData}
                    setFormData={setFormData}
                    isUpdating={isUpdating}
                    isMutationError={isMutationError}
                />
            </div>
        </div>
    );
};

export default Settings;
