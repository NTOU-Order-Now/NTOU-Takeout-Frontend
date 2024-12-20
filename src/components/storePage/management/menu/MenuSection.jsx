import { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEditDishStore from "../../../../stores/EditDishStore";

const CartItemCardSkeleton = lazy(
    () => import("../../../../skeleton/menu/CartItemCardSkeleton"),
);
const MenuItemCard = lazy(() => import("./MenuItemCard"));

function MenuSection({
    sectionRefs,
    categoryData,
    selectedDish,
    setSelectedDish,
}) {
    const [localCategoryData, setLocalCategoryData] = useState(categoryData);
    const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    const setDish = useEditDishStore((state) => state.setDish);

    const handleMenuItemClick = (item) => {
        setDish(item);
        setSelectedDish(item);
    };

    const handleCardDelete = (categoryIndex, dishIndex) => {
        setLocalCategoryData((prevCategories) => {
            const newCategories = prevCategories.map((category, index) => {
                if (index === categoryIndex) {
                    const newDishes = category.dishes.filter(
                        (_, i) => i !== dishIndex,
                    );
                    return {
                        ...category,
                        dishes: newDishes,
                    };
                }
                return category;
            });
            const filteredCategories = newCategories.filter(
                (category) => category.dishes.length > 0,
            );

            return filteredCategories;
        });
    };

    const handleCardUp = (categoryIndex, dishIndex) => {
        if (dishIndex === 0) {
            setLocalCategoryData((prevCategories) =>
                prevCategories.map((category, index) => {
                    if (index === categoryIndex) {
                        const newDishes = [
                            ...category.dishes.slice(1),
                            category.dishes[0],
                        ];
                        return { ...category, dishes: newDishes };
                    }
                    return category;
                }),
            );
        } else {
            setLocalCategoryData((prevCategories) =>
                prevCategories.map((category, index) => {
                    if (index === categoryIndex) {
                        const newDishes = [...category.dishes];
                        [newDishes[dishIndex], newDishes[dishIndex - 1]] = [
                            newDishes[dishIndex - 1],
                            newDishes[dishIndex],
                        ];
                        return { ...category, dishes: newDishes };
                    }
                    return category;
                }),
            );
        }
    };

    const handleCardDown = (categoryIndex, dishIndex) => {
        if (dishIndex === localCategoryData[categoryIndex].dishes.length - 1) {
            setLocalCategoryData((prevCategories) =>
                prevCategories.map((category, index) => {
                    if (index === categoryIndex) {
                        const { dishes } = category;
                        const newDishes = [
                            dishes[dishes.length - 1],
                            ...dishes.slice(0, dishes.length - 1),
                        ];
                        return { ...category, dishes: newDishes };
                    }
                    return category;
                }),
            );
        } else {
            setLocalCategoryData((prevCategories) =>
                prevCategories.map((category, index) => {
                    if (index === categoryIndex) {
                        const newDishes = [...category.dishes];
                        [newDishes[dishIndex], newDishes[dishIndex + 1]] = [
                            newDishes[dishIndex + 1],
                            newDishes[dishIndex],
                        ];
                        return { ...category, dishes: newDishes };
                    }
                    return category;
                }),
            );
        }
    };

    const startEditingCategoryName = (categoryIndex, currentName) => {
        setEditingCategoryIndex(categoryIndex);
        setNewCategoryName(currentName);
    };

    const saveCategoryName = (categoryIndex, name) => {
        setLocalCategoryData((prevCategories) =>
            prevCategories.map((category, index) =>
                index === categoryIndex ? { ...category, name } : category,
            ),
        );
        setEditingCategoryIndex(null);
    };

    return (
        <div className="font-notoTC relative min-h-screen flex flex-col justify-center container mx-auto p-4">
            {localCategoryData.map((category, categoryIndex) => (
                <div
                    key={category?.categoryName || `section-${categoryIndex}`}
                    ref={(el) => (sectionRefs.current[categoryIndex] = el)}
                    className="w-full mb-8"
                >
                    <div className="flex items-center mb-5">
                        {editingCategoryIndex === categoryIndex ? (
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                onBlur={() =>
                                    saveCategoryName(
                                        categoryIndex,
                                        newCategoryName,
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        saveCategoryName(
                                            categoryIndex,
                                            newCategoryName,
                                        );
                                    }
                                }}
                                className="border-b-2 border-gray-400 focus:outline-none text-2xl font-notoTC font-bold"
                                autoFocus
                            />
                        ) : (
                            <p className="text-2xl font-notoTC mt-3 mb-3 font-bold">
                                {category.name}
                            </p>
                        )}
                        <FontAwesomeIcon
                            className="ml-2 cursor-pointer"
                            icon={faEdit}
                            onClick={() =>
                                startEditingCategoryName(
                                    categoryIndex,
                                    category.name,
                                )
                            }
                        />
                    </div>
                    <div className="grid gap-4">
                        {category.dishes.map((food, dishIndex) => (
                            <Suspense
                                fallback={<CartItemCardSkeleton />}
                                key={dishIndex}
                            >
                                <MenuItemCard
                                    food={food}
                                    onDown={() =>
                                        handleCardDown(categoryIndex, dishIndex)
                                    }
                                    onUp={() =>
                                        handleCardUp(categoryIndex, dishIndex)
                                    }
                                    onDelete={() =>
                                        handleCardDelete(
                                            categoryIndex,
                                            dishIndex,
                                        )
                                    }
                                    onClick={handleMenuItemClick}
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
    selectedDish: PropTypes.object,
    setSelectedDish: PropTypes.func.isRequired,
};

export default MenuSection;
