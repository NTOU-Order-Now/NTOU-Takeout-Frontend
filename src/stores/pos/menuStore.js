import { create } from "zustand";

const useMenuStore = create((set) => ({
    menu: null,
    selectedDish: null,
    setSelectedDish: (dishData) => set({ selectedDish: dishData }),
    // 更新菜單
    setMenu: (newMenu) => set({ menu: newMenu }),

    updateDishById: (id, newDish) =>
        set((state) => ({
            menu: {
                ...state.menu,
                categories: state.menu.categories.map((category) => ({
                    ...category,
                    dishes: category.dishes.map((dish) =>
                        dish.id === id ? { ...dish, ...newDish } : dish,
                    ),
                })),
            },
        })),

    removeDishFromCategory: (categoryName, dishId) =>
        set((state) => ({
            menu: {
                ...state.menu,
                categories: state.menu.categories.map((category) => {
                    if (category.name === categoryName) {
                        return {
                            ...category,
                            dishes: category.dishes.filter(
                                (dish) => dish.id !== dishId,
                            ),
                        };
                    }
                    return category;
                }),
            },
        })),

    addDishToCategory: (categoryName, dish) =>
        set((state) => ({
            menu: {
                ...state.menu,
                categories: state.menu.categories.map((category) => {
                    if (category.name === categoryName) {
                        return {
                            ...category,
                            dishes: [...category.dishes, dish],
                        };
                    }
                    return category;
                }),
            },
        })),
}));

export default useMenuStore;
