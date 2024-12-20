import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSystemContext } from "../../context/useSystemContext.jsx";
const MenuItemButton = ({ dishId, onClick }) => {
    const { merchantId } = useParams();
    const { cartData } = useSystemContext();
    let displayText = "+";
    if (cartData?.storeId === merchantId) {
        const totalQuantity = cartData?.orderedDishes
            .filter((d) => d.dishId === dishId)
            .reduce((sum, d) => sum + d.quantity, 0);
        if (totalQuantity > 0) displayText = totalQuantity;
    }
    const isPlus = displayText === "+";
    const btnClasses = isPlus
        ? "bg-orange-500 text-white"
        : " bg-slate-400 text-white ";
    const textClasses = isPlus ? "text-3xl" : "text-xl";
    return (
        <button
            className={`${btnClasses} rounded-full w-10 h-10 flex items-center justify-center`}
            onClick={onClick}
        >
            <span className={`${textClasses} text-center font-bold mb-1`}>
                {displayText}
            </span>
        </button>
    );
};

MenuItemButton.propTypes = {
    dishId: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default MenuItemButton;
