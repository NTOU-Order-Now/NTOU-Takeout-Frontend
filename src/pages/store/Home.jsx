import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/storePage/home/Header";
import Sidebar from "../../components/storePage/home/Sidebar";
import useSidebarStore from "../../stores/common/sidebarStore";
import userInfoStore from "../../stores/user/userInfoStore.js";
import { useSystemContext } from "../../context/useSystemContext.jsx";
import Dashboard from "./Dashboard.jsx";
function Home() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const setTitle = useSidebarStore((state) => state.setTitle);
    const title = useSidebarStore((state) => state.title);
    const user = userInfoStore((state) => state.user);
    // const { userInfo, merchantData, menuCategoryList } = useSystemContext();
    const location = useLocation();
    // set title based on location
    useEffect(() => {
        switch (true) {
            case location.pathname.includes("menu"):
                setTitle("菜單管理");
                break;
            case location.pathname.includes("order"):
                setTitle("訂單管理");
                break;
            case location.pathname.includes("setting"):
                setTitle("設定");
                break;
            case location.pathname.includes("statistic"):
                setTitle("營業分析");
                break;
            default:
                setTitle("首頁");
        }
    }, [setTitle, location.pathname]);

    return (
        <div className="flex flex-col h-dvh">
            <Header title={title} onLeftClick={toggleSidebar}></Header>
            <Sidebar />
            {title === "首頁" ? (
                <div className="sticky top-[54px] mt-[54px] overflow-auto mt-18 z-0 h-[dvh-34px]">
                    <Dashboard
                        merchantName={user.name}
                        merchantId={user.storeId}
                    />
                </div>
            ) : (
                <></>
            )}
            <Outlet />
        </div>
    );
}

export default Home;
