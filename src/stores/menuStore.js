import { create } from "zustand";

const useMenuStore = create((set) => ({
    menu: {
        id: "1",
        categories: [
            {
                name: "飲料",
                dishes: [
                    {
                        id: "1",
                        name: "冰淇淋奶茶",
                        picture: "https://picsum.photos/400/300",
                        price: 75,
                        description: "大杯。總糖量: 71克，總熱量: 750大卡。",
                        category: "飲料",
                        salesVolume: 50,
                        dishAttributes: [
                            {
                                name: "甜度",
                                description: "調整甜度",
                                type: "single",
                                isRequired: true,
                                attributeOptions: [
                                    {
                                        name: "3分糖",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "5分糖",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "7分糖",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "9分糖",
                                        extraCost: 10,
                                        isChosen: false,
                                    },
                                ],
                            },
                            {
                                name: "冰塊",
                                description: "調整冰塊量",
                                type: "single",
                                isRequired: true,
                                attributeOptions: [
                                    {
                                        name: "去冰",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "少冰",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "正常冰",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "2",
                        name: "珍珠紅茶",
                        picture: "https://picsum.photos/400/301",
                        price: 50,
                        description: "搭配珍珠，口感更豐富",
                        category: "飲料",
                        salesVolume: 70,
                        dishAttributes: [
                            {
                                name: "甜度",
                                description: "調整甜度",
                                type: "single",
                                isRequired: true,
                                attributeOptions: [
                                    {
                                        name: "3分糖",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "5分糖",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                    {
                                        name: "7分糖",
                                        extraCost: 0,
                                        isChosen: false,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "甜品",
                dishes: [
                    {
                        id: "3",
                        name: "芒果冰沙",
                        picture: "https://picsum.photos/400/302",
                        price: 90,
                        description: "濃郁芒果風味，夏日消暑必備",
                        category: "甜品",
                        salesVolume: 35,
                        dishAttributes: [],
                    },
                    {
                        id: "4",
                        name: "抹茶蛋糕",
                        picture: "https://picsum.photos/400/303",
                        price: 65,
                        description: "日式風味，香濃抹茶",
                        category: "甜品",
                        salesVolume: 40,
                        dishAttributes: [],
                    },
                ],
            },
            {
                name: "主食",
                dishes: [
                    {
                        id: "5",
                        name: "咖哩飯",
                        picture: "https://picsum.photos/400/304",
                        price: 120,
                        description: "香濃咖哩搭配白飯",
                        category: "主食",
                        salesVolume: 80,
                        dishAttributes: [],
                    },
                ],
            },
        ],
    },

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
