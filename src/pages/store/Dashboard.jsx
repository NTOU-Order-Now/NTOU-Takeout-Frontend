import { useNavigate } from "react-router-dom";
import {
    Store,
    Home,
    FolderOpen,
    MessageSquare,
    PieChart,
    Settings,
    LogOut,
} from "lucide-react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import userInfoStore from "../../stores/user/userInfoStore.js";
import useSidebarStore from "../../stores/common/sidebarStore.js";
const Dashboard = ({ merchantName = "商家名稱" }) => {
    const navigate = useNavigate();
    const setUser = userInfoStore((state) => state.setUser);
    const closeSidebar = useSidebarStore((state) => state.closeSidebar);
    const menuItems = [
        {
            icon: FolderOpen,
            label: "訂單管理",
            path: "/store/pos/management/order",
            color: "bg-green-100",
        },
        {
            icon: FolderOpen,
            label: "菜單管理",
            path: "/store/pos/management/menu",
            color: "bg-yellow-100",
        },
        {
            icon: MessageSquare,
            label: "評論",
            path: "/menu/review",
            color: "bg-purple-100",
        },
        {
            icon: PieChart,
            label: "營業分析",
            path: "/store/pos/statistic",
            color: "bg-pink-100",
        },
        {
            icon: Settings,
            label: "設定",
            path: "/store/pos/setting",
            color: "bg-gray-100",
        },
        {
            icon: LogOut,
            label: "登出",
            Click: () => {
                Cookies.remove("authToken");
                setUser(undefined);
                navigate("/auth/login");
                closeSidebar();
            },

            color: "bg-red-100",
        },
        // { icon: LogOut, label: "登出", path: "/store/pos", color: "bg-red-100" },
    ];

    const handleLogout = () => {
        // Add logout logic here
        navigate("/auth/login");
    };

    return (
        <div className="px-4 h-[calc(100vh-4rem)] min-w-full">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center  bg-white rounded-xl p-6 mb-5">
                    <Store className="w-8 h-8 text-blue-800 mr-4" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        {merchantName}
                    </h1>
                </header>

                <div className="font-notoTC grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (item.Click) {
                                    item.Click();
                                } else {
                                    navigate(item.path);
                                }
                            }}
                            className={`${item.color} h-32 rounded-xl shadow-lg hover:shadow-md 
                transition-all duration-200 flex flex-col items-center justify-center gap-4
                hover:scale-105 group`}
                        >
                            <div className="bg-white p-4 rounded-full">
                                <item.icon className="w-6 h-6 text-gray-700" />
                            </div>
                            <span className="text-lg font-medium text-gray-800">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    merchantName: PropTypes.string.isRequired,
};
export default Dashboard;
