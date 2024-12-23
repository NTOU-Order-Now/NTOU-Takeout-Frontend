import PropTypes from "prop-types";
import CartItemCard from "./CartItemCard";

const CartItemCardList = ({ cartData, dishesMap }) => {
    if (!cartData.orderedDishes || cartData.orderedDishes.length === 0) {
        return (
            <div className="flex justify-center items-center mt-4 fa-2x">
                目前購物車是空的:)
            </div>
        );
    }
    return (
        <div>
            {cartData.orderedDishes.map((dish, _) => (
                <CartItemCard
                    key={_}
                    dishData={dish}
                    imageUrl={dishesMap[dish?.dishId]?.picture}
                />
            ))}
        </div>
    );
};

CartItemCardList.propTypes = {
    cartData: PropTypes.object.isRequired,
    dishesMap: PropTypes.object.isRequired,
};

export default CartItemCardList;
