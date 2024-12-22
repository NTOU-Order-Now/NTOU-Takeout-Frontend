import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEditDishStore from "../../../../stores/EditDishStore";
import CategoryHeader from "./CategoryHeader.jsx";
import { useUpdateDishOrderMutation } from "../../../../hooks/store/useUpdateDishOrderMutation.jsx";
import { useUpdateDishMutation } from "../../../../hooks/store/useUpdateDishMutation.jsx";
import { useDeleteDishMutation } from "../../../../hooks/store/useDeleteDishMutation.jsx";

const CartItemCardSkeleton = lazy(
    () => import("../../../../skeleton/menu/CartItemCardSkeleton"),
);
const MenuItemCard = lazy(() => import("./MenuItemCard"));

function MenuSection({ sectionRefs, categoryData, menuId }) {
    const { updateDishOrder } = useUpdateDishOrderMutation(menuId);
    const { deleteMenuDish } = useDeleteDishMutation(menuId);

    const handleDishMove = async (categoryName, dishId, direction) => {
        const category = categoryData.find(
            (c) => c.categoryName === categoryName,
        );
        const currentIndex = category.dishes.findIndex((d) => d.id === dishId);
        // const newOrder = [...category.dishes].map((d) => d.id);
        const newOrder = [...category.dishes];

        if (direction === "up" && currentIndex > 0) {
            [newOrder[currentIndex], newOrder[currentIndex - 1]] = [
                newOrder[currentIndex - 1],
                newOrder[currentIndex],
            ];
        } else if (direction === "down" && currentIndex < newOrder.length - 1) {
            [newOrder[currentIndex], newOrder[currentIndex + 1]] = [
                newOrder[currentIndex + 1],
                newOrder[currentIndex],
            ];
        } else if (direction === "up" && currentIndex === 0) {
            [newOrder[currentIndex], newOrder[newOrder.length - 1]] = [
                newOrder[newOrder.length - 1],
                newOrder[currentIndex],
            ];
        } else if (
            direction === "down" &&
            currentIndex === newOrder.length - 1
        ) {
            [newOrder[currentIndex], newOrder[0]] = [
                newOrder[0],
                newOrder[currentIndex],
            ];
        }
        await updateDishOrder({ categoryName, newOrder });
    };
    return (
        <div className="font-notoTC relative min-h-screen flex flex-col justify-center container mx-auto p-4">
            {categoryData.map((category, _) => (
                <div
                    key={_}
                    ref={(el) => (sectionRefs.current[_] = el)}
                    className="w-full mb-8"
                >
                    <CategoryHeader categoryData={category} menuId={menuId} />
                    <div className="grid gap-4">
                        {category.dishes.map((dish, _) => (
                            <Suspense
                                key={_}
                                fallback={<CartItemCardSkeleton />}
                            >
                                <MenuItemCard
                                    categoryName={category.categoryName}
                                    food={dish}
                                    onDelete={deleteMenuDish}
                                    onMove={handleDishMove}
                                    // onClick={()=>}
                                />
                            </Suspense>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

MenuSection.propTypes = {
    sectionRefs: PropTypes.object.isRequired,
    categoryData: PropTypes.array.isRequired,
    menuId: PropTypes.string.isRequired,
};

export default MenuSection;
