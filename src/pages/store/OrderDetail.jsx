import PropTypes from "prop-types";
import useOrderStore from "../../stores/orderStore";
import UserInfo from "../../components/orderPage/UserInfo";
import OrderNote from "../../components/orderPage/OrderNote";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/storePage/home/Header";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSystemContext } from "../../context/useSystemContext.jsx";
import { useCategoryQueries } from "../../hooks/menu/useCategoryQueries.jsx";
import CartItemCard from "../../components/cartPage/CartItemCard.jsx";
import EstimatedTime from "../../components/orderPage/EstimatedTime.jsx";
const OrderDetails = () => {
    const orderData = useOrderStore((state) => state.orderData);
    console.debug("orderData:", orderData);
    const statusConfig = {
        PENDING: { text: "未接單", bgColor: "bg-red-500" },
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

    const { userInfo, merchantData, menuCategoryList } = useSystemContext();
    const { categoryData } = useCategoryQueries(
        menuCategoryList,
        merchantData?.menuId,
        userInfo !== undefined,
    );
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    const findDishPicture = (targetId) => {
        const allDishes = categoryData.flatMap((category) => category.dishes);
        const dish = allDishes.find((dish) => dish.id === targetId);
        return dish ? dish.picture : null;
    };
    if (orderData === null) {
        return <Navigate to="/store/pos/management/order" replace />;
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
                    <UserInfo user={orderData} />
                    <OrderNote note={orderData.note} />
                    {orderData.orderedDishes.map((item, _) => {
                        return (
                            <CartItemCard
                                key={_}
                                dishData={item}
                                imageUrl={findDishPicture(item.dishId)}
                            />
                        );
                    })}
                </div>
                {/* Footer */}
                <div className="fixed bottom-0 left-0 right-0 w-full">
                    <EstimatedTime value={orderData.estimatedPrepTime} />
                </div>
            </div>
        </div>
    );
};

OrderDetails.propTypes = {
    // orderData: PropTypes.shape({
    //     id: PropTypes.string.isRequired,
    //     userId: PropTypes.string.isRequired,
    //     email: PropTypes.string.isRequired,
    //     phone: PropTypes.string.isRequired,
    //     time: PropTypes.string.isRequired,
    //     total: PropTypes.number.isRequired,
    //     note: PropTypes.string.isRequired,
    //     items: PropTypes.arrayOf(
    //         PropTypes.shape({
    //             id: PropTypes.number.isRequired,
    //             name: PropTypes.string.isRequired,
    //             imageUrl: PropTypes.string.isRequired,
    //             price: PropTypes.number.isRequired,
    //             quantity: PropTypes.number.isRequired,
    //         }),
    //     ),
    //     estimatedTime: PropTypes.number.isRequired,
    // }),
};

export default OrderDetails;
