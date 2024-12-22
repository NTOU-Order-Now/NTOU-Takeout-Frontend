import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/storePage/home/Header.jsx";
import Sidebar from "../../components/storePage/home/Sidebar.jsx";
import ItemCardList from "../../components/storePage/statistic/ItemCardLsist.jsx";
import useSidebarStore from "../../stores/common/sidebarStore.js";
import StatisticChart from "../../components/storePage/statistic/StatisticChart.jsx";
function Statistic() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const setTitle = useSidebarStore((state) => state.setTitle);
    const title = useSidebarStore((state) => state.title);
    const location = useLocation();

    const dishDetailsList = [
        { dishId: 1, dishName: "好難吃水餃", salesVolume: 150 },
        { dishId: 2, dishName: "不好吃水餃", salesVolume: 200 },
        { dishId: 3, dishName: "沒有牛肉麵", salesVolume: 120 },
        { dishId: 4, dishName: "沒有老婆餅", salesVolume: 180 },
        { dishId: 5, dishName: "沒有太陽餅", salesVolume: 220 },
        { dishId: 6, dishName: "虫合", salesVolume: 220 },
    ];

    const totalSales = dishDetailsList.reduce((acc, item) => acc + item.salesVolume, 0);

    const chartData = dishDetailsList.map((item) => ({
        name: item.dishName,
        value: ((item.salesVolume / totalSales) * 100).toFixed(2), // Convert to percentage
    }));

    // Set title based on location
    useEffect(() => {
        switch (true) {
            case location.pathname.includes("menu"):
                setTitle("菜單管理");
                break;
            case location.pathname.includes("order"):
                setTitle("訂單管理");
                break;
            default:
                setTitle("營業分析");
        }
    }, [setTitle, location.pathname]);

    return (
        <div className="p-4">
            <Header title={title} onLeftClick={toggleSidebar} />
            <Sidebar merchantName="" />
            <div className="my-4 mt-16">
                <StatisticChart data={chartData} />
            </div>
            <ItemCardList dishDetailsList={dishDetailsList} />
            <Outlet />
        </div>
    );
}

export default Statistic;
