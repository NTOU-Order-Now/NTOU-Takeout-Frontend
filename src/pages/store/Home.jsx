import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/storePage/home/Header";
import Sidebar from "../../components/storePage/home/Sidebar";
import useSidebarStore from "../../stores/common/sidebarStore";
import userInfoStore from "../../stores/user/userInfoStore.js";
import { useSystemContext } from "../../context/useSystemContext.jsx";
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
        <div>
            <Header title={title} onLeftClick={toggleSidebar}></Header>
            <Sidebar merchantName={user.name}></Sidebar>
            <div className="relative top-20 flex flex-col items-center justify-center z-0">
                {/*    {user.name}*/}

                {/*    {user.id}*/}

                {/*    {user.email}*/}

                {/*    {user.storeId}*/}
            </div>
            <Outlet />
        </div>
    );
}

export default Home;
