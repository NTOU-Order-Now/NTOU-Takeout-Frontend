import PropTypes from "prop-types";
import AddToCart from "./AddToCart";
import QuantitySelector from "./QuantitySelector";

const CartOption = ({ dishId, onRequiredMissing, onClose }) => {

    return (
        <div className="flex fixed z-20 bottom-8 right-6">
            <QuantitySelector dishId={dishId} />
            <AddToCart
                dishId={dishId}
                onRequiredMissing={onRequiredMissing}
                onClose={onClose}
            />
        </div>
    );
};

CartOption.propTypes = {
    dishId: PropTypes.string.isRequired,
    onRequiredMissing: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CartOption;
