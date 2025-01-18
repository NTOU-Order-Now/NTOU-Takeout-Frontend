import { useState, lazy } from "react";
import { useCartDeleteMutation } from "@/hooks/cart/useCartDeleteMutation.jsx";
import { useCartAddMutation } from "@/hooks/cart/useCartAddMutation.jsx";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import PropTypes from "prop-types";
import useDishDetailStore from "../../../stores/dishDetailStore";
const ConfirmClearCartModal = lazy(() => import("./ConfirmClearCartModal"));

const AddToCart = ({ dishId, onRequiredMissing, onClose }) => {
    const { cartData } = useSystemContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dishes = useDishDetailStore((state) => state.dishes);
    const allDishAttributes = useDishDetailStore(
        (state) => state.allDishAttributes,
    );

    const { deleteCartAsync } = useCartDeleteMutation();
    const { postCartAsync } = useCartAddMutation();
    const handleConfirm = async () => {
        setIsModalOpen(false);
        const dishDetail = dishes[dishId];
        await deleteCartAsync(dishDetail);
        onClose();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dishDetail = dishes[dishId];
        if (!dishDetail) {
            return;
        }

        const choosenAttributes = dishDetail.chosenAttributes || [];
        const requiredAttributes = allDishAttributes[dishId] || [];

        //check if all required attributes are selected
        for (const attr of requiredAttributes) {
            if (attr.isRequired === true) {
                const matched = choosenAttributes.filter(
                    (ca) => ca.attributeName === attr.name,
                );
                if (matched.length === 0) {
                    onRequiredMissing(attr.name);
                    return;
                }
            }
        }

        if (cartData?.storeId && cartData?.storeId !== dishDetail.storeId) {
            setIsModalOpen(true);
            return;
        }
        const payload = {
            dishId: dishDetail.dishId,
            storeId: dishDetail.storeId,
            quantity: dishDetail.quantity,
            note: dishDetail.note,
            chosenAttributes: dishDetail.chosenAttributes,
        };

        await postCartAsync(payload);
        onClose();
    };

    return (
        <div className="flex items-center justify-center">
            <button
                className="shadow-md bg-orange-500 text-white text-md px-6 py-2 rounded-full border border-orange-700 font-notoTC"
                onClick={handleAddToCart}
            >
                加入
            </button>
            <ConfirmClearCartModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
};
AddToCart.propTypes = {
    dishId: PropTypes.string.isRequired,
    onRequiredMissing: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddToCart;
