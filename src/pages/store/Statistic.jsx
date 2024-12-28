import { useState } from "react";
import { Outlet } from "react-router-dom";
import ItemCardList from "../../components/storePage/statistic/ItemCardLsist.jsx";
import StatisticChart from "../../components/storePage/statistic/StatisticChart.jsx";
import { useSystemContext } from "../../context/useSystemContext.jsx";
import { useAllCategoriesStatistic } from "../../hooks/statistic/useAllCategoriesStatisticQueries.jsx";
import { useStatisticQuery } from "../../hooks/statistic/useStatisticQuery.jsx";
import CategoryTabs from "../../components/storePage/statistic/CategoryTabs.jsx";
function Statistic() {
    const { merchantData, menuCategoryList } = useSystemContext();
    const menuId = merchantData?.menuId;
    const [activeCategory, setActiveCategory] = useState("all");
    const filteredMenuCategoryList = menuCategoryList.filter(
        (category) => category.categoryName !== "",
    );
    const {
        allData: allSalesData,
        isLoading: isAllLoading,
        isError,
        error,
    } = useAllCategoriesStatistic(menuId, filteredMenuCategoryList);
    const {
        data: categoryData,
        isLoading: isCategoryLoading,
        error: categoryError,
    } = useStatisticQuery(
        menuId,
        activeCategory === "all" ? null : activeCategory,
    );
    const currentData =
        activeCategory === "all"
            ? allSalesData?.flat() || []
            : categoryData?.data || [];

    const isLoading =
        activeCategory === "all" ? isAllLoading : isCategoryLoading;
    // 當有總銷量時才計算百分比
    const totalSales =
        currentData?.reduce((acc, item) => acc + (item.salesVolume || 0), 0) ||
        0;
    const chartData =
        totalSales > 0
            ? currentData?.map((item) => ({
                  name: item.dishName,
                  value: ((item.salesVolume / totalSales) * 100).toFixed(2),
              })) || []
            : [];
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error: {error.message}
            </div>
        );
    }
    return (
        <div className="flex flex-col h-screen">
            <div className="mt-16 flex-1 w-full ">
                <div className="fixed z-30 w-full ">
                    <CategoryTabs
                        categories={filteredMenuCategoryList}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />
                </div>
                <div className="my-4 overflow-auto h-[dvh-34px] ">
                    <StatisticChart data={chartData} />
                    <ItemCardList dishDetailsList={currentData || []} />
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Statistic;
