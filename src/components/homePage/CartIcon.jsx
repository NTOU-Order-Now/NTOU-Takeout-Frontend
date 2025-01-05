import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSystemContext } from "../../context/useSystemContext.jsx";
const CartIcon = () => {
    const { cartCount, refetchCart, userInfo } = useSystemContext();
    if (userInfo && cartCount === undefined) {
        refetchCart();
    }
    return (
        <div className="relative inline-flex items-center right-2 top-1">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] text-xs bg-red-500 text-white rounded-full px-1">
                    {cartCount}
                </span>
            )}
        </div>
    );
};

export default CartIcon;
