import useOrderStore from "../stores/orderStore";
import UserInfo from "../components/orderPage/UserInfo";
import OrderNote from "../components/orderPage/OrderNote";
import { useNavigate } from "react-router-dom";
import Header from "../components/storePage/home/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSystemContext } from "../context/useSystemContext.jsx";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries.jsx";
import CartItemCard from "../components/cartPage/CartItemCard.jsx";
import EstimatedTime from "../components/orderPage/EstimatedTime.jsx";
import { useStoreQuery } from "../hooks/store/useStoreQuery.jsx";
import HeaderSkeleton from "../skeleton/common/HeaderSkeleton.jsx";
import { useCategoryListQuery } from "../hooks/menu/useCategoryListQuery.jsx";
import { useEffect, useState } from "react";
import AddReview from "../components/history/AddReview.jsx";
import AddReviewBtn from "../components/history/AddReviewBtn.jsx";
const CustomerOrderDetail = () => {
    const orderData = useOrderStore((state) => state.orderData);
    const navigate = useNavigate();
    const [showAddReview, setShowAddReview] = useState(false);
    const { userInfo } = useSystemContext();
    useEffect(() => {
        if (orderData === null) {
            navigate("/history/order");
        }
    }, [orderData, navigate]);

    if (orderData === null) {
        return <HeaderSkeleton />;
    }
    const statusConfig = {
        PENDING: { text: "未接單", bgColor: "bg-stone-600" },
        PROCESSING: { text: "製作中", bgColor: "bg-blue-500" },
        COMPLETED: { text: "未取餐", bgColor: "bg-yellow-500" },
        PICKED_UP: { text: "已取餐", bgColor: "bg-green-500" },
        CANCELED: { text: "取消", bgColor: "bg-gray-300" },
    };

    const currentStatus = (status) =>
        statusConfig[status] || {
            text: "default",
            bgColor: "bg-gray-200",
        };

    const statusBadge = (
        <button
            className={`${currentStatus(orderData?.status).bgColor} text-sm px-3 py-1 rounded-md text-white font-bold`}
        >
            {currentStatus(orderData?.status).text}
        </button>
    );

    const {
        storeData,
        isLoading: isStoreDataLoading,
        isError: isStoreDataError,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useStoreQuery([orderData.storeId]);

    const menuId = storeData ? storeData[0].menuId : null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { menuCategoryList } = useCategoryListQuery(menuId);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { categoryData } = useCategoryQueries(
        menuCategoryList,
        menuId,
        userInfo !== undefined && menuId !== undefined,
    );
    const handleBackClick = async () => {
        await navigate(-1);
    };
    const findDishPicture = (targetId) => {
        const allDishes = categoryData.flatMap((category) => category.dishes);
        const dish = allDishes.find((dish) => dish.id === targetId);
        return dish ? dish.picture : null;
    };

    if (isStoreDataLoading || storeData === undefined || isStoreDataError) {
        return <HeaderSkeleton />;
    }

    if (orderData?.status === "PICKED_UP" && showAddReview && storeData) {
        return (
            <AddReview
                storeName={storeData[0]?.name}
                setShowAddReview={setShowAddReview}
                storeId={orderData.storeId}
            />
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky mt-[54px] z-50 shadow-sm">
                <Header
                    LeftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    title={"單號 " + orderData.id.slice(-5)}
                    onLeftClick={handleBackClick}
                    rightComponents={[statusBadge]}
                />
            </div>
            <div className="flex-1 overflow-auto pb-[48px]">
                {/* orderData items */}

                <div className="bg-white text-black flex-1 p-4 overflow-auto">
                    <UserInfo
                        user={orderData}
                        storeData={storeData[0]}
                        role={userInfo.role}
                    />
                    <OrderNote note={orderData.note} />
                    {orderData.orderedDishes.map((item, _) => {
                        return (
                            <CartItemCard
                                key={_}
                                dishData={item}
                                imageUrl={findDishPicture(item.dishId)}
                                showAdjustBtn={false}
                            />
                        );
                    })}
                </div>
                {/* Footer */}
                {orderData?.status === "PICKED_UP" ? (
                    <div className="fixed bottom-0 left-0 right-0 w-full">
                        <AddReviewBtn setShowAddReview={setShowAddReview} />
                    </div>
                ) : (
                    <div className="fixed bottom-0 left-0 right-0 w-full">
                        <EstimatedTime value={orderData.estimatedPrepTime} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerOrderDetail;
