import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSystemContext } from "../../context/useSystemContext.jsx";
import userInfoStore from "../../stores/user/userInfoStore.js";
const ViewCartButton = () => {
    const navigate = useNavigate();
    const { cartData, cartCount, totalSpend } = useSystemContext();
    const user = userInfoStore((state) => state.user);
    const isLogin = user !== undefined && user.role === "CUSTOMER";

    const handleClick = () => {
        if (!isLogin) return navigate("/auth/login");
        navigate("/cart");
    };

    if (isLogin === true && (cartData === undefined || totalSpend === 0))
        return null;

    return (
        <div className="fixed bottom-4 right-6 flex z-10 ">
            <button
                className={`${!isLogin ? "bg-orange-500" : "bg-white"} border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center space-x-2 text-black shadow-lg`}
                onClick={handleClick}
            >
                {isLogin ? (
                    <>
                        {cartCount > 0 && (
                            <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-md font-bold">
                                {cartCount}
                            </span>
                        )}
                        <FontAwesomeIcon icon={faCartShopping} size="lg" />
                        <span className="font-notoTC">${totalSpend}</span>
                    </>
                ) : (
                    <span className="font-notoTC text-white">請登入後點餐</span>
                )}
            </button>
        </div>
    );
};

ViewCartButton.propTypes = {
    totalCost: PropTypes.number,
    cartCount: PropTypes.number,
};

export default ViewCartButton;
