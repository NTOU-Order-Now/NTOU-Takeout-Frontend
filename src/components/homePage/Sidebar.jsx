import { useNavigate } from "react-router-dom";
import useSidebarStore from "../../stores/common/sidebarStore";
import SidebarButton from "./SidebarButton";
import useThemeStore from "../../stores/themeStore";
import Cookies from "js-cookie";
import {
    faHistory,
    faHeart,
    faLanguage,
    faCog,
    faSignOutAlt,
    faStore,
    faUser,
    faCircleQuestion,
    faMoon,
    faSun,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import userInfoStore from "../../stores/user/userInfoStore.js";
const Sidebar = () => {
    const isOpen = useSidebarStore((state) => state.isOpen);
    const theme = useThemeStore((state) => state.themeMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const closeSidebar = useSidebarStore((state) => state.closeSidebar);
    const navigate = useNavigate();
    const authToken = Cookies.get("authToken");
    const user = userInfoStore((state) => state.user);
    const setUser = userInfoStore((state) => state.setUser);
    let username = "登入";
    if (authToken && user !== undefined) {
        username = user.name;
    } else {
        username = "登入";
    }

    const handleLogout = () => {
        Cookies.remove("authToken");
        setUser(undefined);
        navigate("/auth/login");
        closeSidebar();
    };

    return (
        <>
            {isOpen && (
                <div
                    className={`fixed top-0 z-40 min-h-screen min-w-full transition-all duration-300  ${
                        isOpen ? "bg-slate-950 bg-opacity-20" : ""
                    }`}
                    onClick={closeSidebar}
                ></div>
            )}
            <div
                className={`font-notoTC z-50 fixed inset-y-0 left-0 bg-white w-3/5 shadow-lg border-zinc-400 border-r-1 max-w-md ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 min-w-48`}
            >
                <div className="p-4 overflow-hidden">
                    <SidebarButton
                        text={username}
                        textStyle={"text-2xl px-2 "}
                        icon={faUser}
                        iconSize="2xl"
                        iconColor={"#053766"}
                        style={"py-8"}
                        path="/auth/login"
                    />
                    {/*<SidebarButton*/}
                    {/*    text="商家瀏覽紀錄"*/}
                    {/*    icon={faStore}*/}
                    {/*    iconSize="lg"*/}
                    {/*    iconColor={"#053766"}*/}
                    {/*    style={"px-4 py-4"}*/}
                    {/*/>*/}
                    <SidebarButton
                        text="瀏覽商家"
                        icon={faStore}
                        iconSize="lg"
                        iconColor={"#053766"}
                        style={"px-4 py-4"}
                        path="/"
                    />
                    {authToken && user !== undefined && (
                        <SidebarButton
                            text="歷史訂單"
                            icon={faHistory}
                            iconSize="lg"
                            iconColor={"#053766"}
                            style={"px-4 py-4"}
                            path="/history/order"
                        />
                    )}
                    {authToken && user !== undefined && (
                        <SidebarButton
                            text="購物車"
                            icon={faCartShopping}
                            iconSize="lg"
                            iconColor={"#053766"}
                            style={"px-4 py-4"}
                            path="/cart"
                        />
                    )}
                    {/*<SidebarButton*/}
                    {/*    text="收藏店家"*/}
                    {/*    icon={faHeart}*/}
                    {/*    iconSize="lg"*/}
                    {/*    iconColor={"#053766"}*/}
                    {/*    style={"px-4 py-4"}*/}
                    {/*/>*/}
                    <SidebarButton
                        text="問題回報"
                        icon={faCircleQuestion}
                        iconSize="lg"
                        iconColor={"#053766"}
                        style={"px-4 py-4"}
                        onClick={() => {
                            window.location.href =
                                "mailto:ntoutakeout@gmail.com";
                        }}
                    />
                    {/*<SidebarButton*/}
                    {/*    text="語言"*/}
                    {/*    icon={faLanguage}*/}
                    {/*    iconSize="lg"*/}
                    {/*    iconColor={"#606162"}*/}
                    {/*    style={"px-4 py-4"}*/}
                    {/*/>*/}
                    {authToken && user !== undefined && (
                        <SidebarButton
                            text="設定"
                            icon={faCog}
                            iconSize="lg"
                            iconColor={"#606162"}
                            style={"px-4 py-4"}
                        />
                    )}
                </div>
                <div className="px-4 absolute bottom-8 left-0 right-2 flex justify-between">
                    {authToken && user !== undefined && (
                        <SidebarButton
                            text="登出"
                            icon={faSignOutAlt}
                            iconSize="lg"
                            iconColor={"#606162"}
                            onClick={handleLogout}
                        />
                    )}
                    {/*<SidebarButton*/}
                    {/*    icon={theme === "light" ? faMoon : faSun}*/}
                    {/*    text="切換主題"*/}
                    {/*    textStyle={"w-0  invisible"}*/}
                    {/*    iconSize="lg"*/}
                    {/*    iconColor={theme === "light" ? "#606162" : "#FFD43B"}*/}
                    {/*    onClick={toggleTheme}*/}
                    {/*/>*/}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
