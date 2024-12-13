import PropTypes from "prop-types";
import { useCartUpdateMutation } from "../../hooks/cart/useCartUpdateMutation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const CartItemCard = ({ dishData, imageUrl }) => {
    const {
        id,
        dishName,
        price,
        quantity,
        chosenAttributes,
        note
    } = dishData;
    const [nowQuantity, setNowQuantity] = useState(quantity);
    const { patchCartAsync } = useCartUpdateMutation();

    const handleQuantityChange = (change) => {
        const newQ = nowQuantity + change;
        if (newQ < 0 || newQ > 25) return;



        // optimistic update
        if (newQ > 0) {
            setNowQuantity(newQ);
        }
        // update cart
        patchCartAsync({ orderedDishId: id, newQuantity: newQ });
    };

    let totalExtraCost = 0;
    const formattedAttributes = chosenAttributes?.length
        ? chosenAttributes.map(attr => {
            totalExtraCost += attr.extraCost || 0;
            return attr.chosenOption;
        }).join(", ")
        : "";

    return (
        nowQuantity <= 0 ? null :
            <div className="relative flex rounded-lg p-4 w-full items-start ">
                <img
                    src={imageUrl}
                    alt={dishName}
                    className="w-20 h-26 object-cover rounded-lg flex-shrink-0"
                />
                <div className="ml-4 flex min-w-0 flex-col h-full" >
                    <h2 className="text-lg font-semibold truncate">{dishName}</h2>
                    {formattedAttributes && <p className="text-sm text-gray-500 truncate">
                        {formattedAttributes}(+${totalExtraCost})
                    </p>}
                    {note && <p className="text-sm text-gray-500 line-clamp-2">{note}</p>}
                    <p className="text-xl mt-2 absolute bottom-[15px]">
                        $ {price}
                    </p>
                </div>
                <div className="absolute bottom-[15px] right-[15px] flex items-end border border-gray-300 rounded-md">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-2 py-0 text-lg rounded-l-md w-7"
                    >
                        {
                            quantity <= 1 ?
                                <FontAwesomeIcon icon={faTrashCan} size="xs" style={{ color: "#d00b0b", }} /> :
                                "-"
                        }
                    </button>
                    <span className="px-4 py-0.5">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-2 py-0 text-lg rounded-r-md w-7"
                    >
                        +
                    </button>
                </div>
            </div>
    );
};

CartItemCard.propTypes = {
    dishData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dishId: PropTypes.string.isRequired,
        dishName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        chosenAttributes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,

        })),
        note: PropTypes.string,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired || PropTypes.object.isRequired,
};

export default CartItemCard;
