import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import CategoryHeader from "./CategoryHeader.jsx";
import { useUpdateDishOrderMutation } from "@/hooks/store/useUpdateDishOrderMutation.jsx";
import { useDeleteDishMutation } from "@/hooks/store/useDeleteDishMutation.jsx";
import { useCategoryNameMutation } from "@/hooks/store/useCategoryNameMutation.jsx";

const CartItemCardSkeleton = lazy(
    () => import("../../../../skeleton/menu/CartItemCardSkeleton"),
);
const MenuItemCard = lazy(() => import("./MenuItemCard"));

function MenuSection({ sectionRefs, categoryData, menuId }) {
    const { updateDishOrder, isPending: isUpdateDishOrderPending } =
        useUpdateDishOrderMutation(menuId);
    const { deleteMenuDish, isPending: isDeleteMenuDishPending } =
        useDeleteDishMutation(menuId);
    const { isPending: isChangeCategoryNamePending } =
        useCategoryNameMutation(menuId);
    if (
        // isChangeCategoryNamePending ||
        // isUpdateDishOrderPending ||
        // isDeleteMenuDishPending
        isUpdateDishOrderPending
    ) {
        return <CartItemCardSkeleton />;
    }
    const handleDishMove = async (categoryName, dishId, direction) => {
        const category = categoryData.find(
            (c) => c.categoryName === categoryName,
        );
        const currentIndex = category.dishes.findIndex((d) => d.id === dishId);
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
        <div className="font-notoTC relative  flex flex-col justify-start container mx-auto p-4">
            {categoryData?.map((category, _) => (
                <div
                    key={_}
                    ref={(el) => (sectionRefs.current[_] = el)}
                    className="w-full mb-8"
                >
                    <CategoryHeader categoryData={category} menuId={menuId} />
                    <div className="grid gap-4">
                        {category?.dishes.map((dish, _) => (
                            <Suspense
                                key={_}
                                fallback={<CartItemCardSkeleton />}
                            >
                                <MenuItemCard
                                    categoryName={category.categoryName}
                                    food={dish}
                                    onMove={handleDishMove}
                                    onDelete={deleteMenuDish}
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
    menuId: PropTypes.string,
};

export default MenuSection;
