import PropTypes from "prop-types";
import useOrderStore from "../../stores/orderStore";
// import Header from "../../components/orderPage/Header";
import UserInfo from "../../components/orderPage/UserInfo";
import OrderNote from "../../components/orderPage/OrderNote";
import OrderItem from "../../components/orderPage/OrderItem";
import Footer from "../../components/orderPage/Footer";
import { useNavigate } from "react-router-dom";
import Header from "../../components/storePage/home/Header";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const OrderDetails = () => {
    const statusConfig = {
        PENDING: { text: "未接單", bgColor: "bg-blue-500" },
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
            className={`${currentStatus.bgColor} text-sm px-3 py-1 rounded-md text-white font-bold`}
        >
            {currentStatus.text}
        </button>
    );

    const orderData = useOrderStore((state) => state.orderData);
    const navigate = useNavigate();
    console.debug("orderData", orderData);
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="sticky mt-[54px] z-20 shadow-sm">
                <Header
                    LeftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                    title={"單號 " + orderData.id.slice(-5)}
                    onLeftClick={handleBackClick}
                    rightComponents={[statusBadge]}
                />
            </div>
            {/* orderData items */}
            <div className="overflow-auto h-[dvh-34px]  ">
                <div className="bg-white text-black flex-1 p-4 overflow-auto">
                    <UserInfo user={orderData} />
                    <OrderNote note={orderData.note} />
                    {orderData.orderedDishes.map((item) => (
                        <OrderItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Footer */}
                <Footer
                    estimatedTime={orderData.estimatedTime}
                    // onTimeChange={(value) => setEstimatedTime(value)}
                />
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
