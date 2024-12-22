import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ orderId, status, onBackClick }) => {
    const statusConfig = {
        PENDING: { text: "未接單", bgColor: "bg-blue-500" },
        PROCESSING: { text: "製作中", bgColor: "bg-blue-500" },
        COMPLETED: { text: "未取餐", bgColor: "bg-yellow-500" },
        PICKED_UP: { text: "已取餐", bgColor: "bg-green-500" },
        CANCELED: { text: "取消", bgColor: "bg-gray-300" },
    };

    const currentStatus = statusConfig[status] || {
        text: "default",
        bgColor: "bg-gray-200",
    };

    return (
        <header className="bg-orange-500 px-6 py-4 flex  justify-between z-50">
            {/* Back icon */}
            <button onClick={onBackClick} className="text-white text-2xl mr-4">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {/* Order Info */}
            <h1 className="text-xl font-bold">單號 {orderId.slice(-5)}</h1>

            {/* Status Button */}
            <button
                className={`${currentStatus.bgColor} text-sm px-3 py-1 rounded-md text-white font-bold`}
            >
                {currentStatus.text}
            </button>
        </header>
    );
};

Header.propTypes = {
    orderId: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "PICKED_UP",
        "CANCELED",
    ]).isRequired,
    onBackClick: PropTypes.func.isRequired,
};

export default Header;
