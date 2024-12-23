import Header from "../../components/storePage/home/Header.jsx";
import StoreForm from "../../components/storePage/settings/StoreForm.jsx";
import useSidebarStore from "../../stores/common/sidebarStore.js";
import useStoreForm from "../../stores/pos/storeInfoStore.js";
import { useSystemContext } from "../../context/useSystemContext.jsx";

const Settings = () => {
    const title = useSidebarStore((state) => state.title);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    // const storeName = useStoreForm((state) => state.storeName);
    const formState = useStoreForm.getState();
    const { userInfo } = useSystemContext();

    const handleSaveInfoData = () => {
        console.debug("handleSaveInfoData");
        console.debug(formState.storeName);
        console.debug(formState.storeDescription);
        console.debug(formState.storeAddress);
        console.debug(formState.storePhone);
        console.debug(formState.businessHours);
    };
    const saveButton = (
        <button
            onClick={handleSaveInfoData}
            className=" bg-orange-500 text-white rounded-lg px-3 py-1 font-sm shadow-md mr-5"
        >
            儲存
        </button>
    );
    console.debug("storeId:", userInfo?.storeId);
    return (
        <div className="flex flex-col h-screen">
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[saveButton]}
            />
            <div className="sticky top-[54px] mt-[54px] z-20 ">
                <StoreForm storeId={userInfo?.storeId} />
            </div>
        </div>
    );
};

export default Settings;
