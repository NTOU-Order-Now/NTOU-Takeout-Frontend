import { create } from "zustand";

const useEditDishStore = create((set) => ({
    dish: {
        id: null,
        name: "",
        picture: "",
        price: 0,
        description: "",
        category: "",
        salesVolume: 0,
        dishAttributes: [],
    },

    // 設置整個 dish
    setDish: (newDish) => set({ dish: newDish }),

    // 更新單一欄位
    updateDishName: (name) =>
        set((state) => ({ dish: { ...state.dish, name } })),
    updateDishPicture: (picture) =>
        set((state) => ({ dish: { ...state.dish, picture } })),
    updateDishPrice: (price) =>
        set((state) => ({ dish: { ...state.dish, price } })),
    updateDishDescription: (description) =>
        set((state) => ({ dish: { ...state.dish, description } })),
    updateDishCategory: (category) =>
        set((state) => ({ dish: { ...state.dish, category } })),
    updateDishSalesVolume: (salesVolume) =>
        set((state) => ({ dish: { ...state.dish, salesVolume } })),

    // 管理 dishAttributes
    setAttribute: (index, updatedAttribute) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: state.dish.dishAttributes.map((attr, i) =>
                    i === index ? updatedAttribute : attr,
                ),
            },
        })),
    addAttribute: (attribute) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: [...state.dish.dishAttributes, attribute],
            },
        })),
    deleteAttribute: (index) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: state.dish.dishAttributes.filter(
                    (_, i) => i !== index,
                ),
            },
        })),

    // 添加空的 Attribute
    addEmptyAttribute: () =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: [
                    ...state.dish.dishAttributes,
                    {
                        name: "新options",
                        description: "",
                        type: "single",
                        isRequired: false,
                        attributeOptions: [],
                    },
                ],
            },
        })),

    // 管理 attributeOptions
    addOptionToAttribute: (attrIndex, newOption) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: state.dish.dishAttributes.map((attr, i) =>
                    i === attrIndex
                        ? {
                              ...attr,
                              attributeOptions: [
                                  ...attr.attributeOptions,
                                  newOption,
                              ],
                          }
                        : attr,
                ),
            },
        })),
    updateOptionInAttribute: (attrIndex, optionIndex, updatedOption) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: state.dish.dishAttributes.map((attr, i) =>
                    i === attrIndex
                        ? {
                              ...attr,
                              attributeOptions: attr.attributeOptions.map(
                                  (option, j) =>
                                      j === optionIndex
                                          ? updatedOption
                                          : option,
                              ),
                          }
                        : attr,
                ),
            },
        })),
    deleteOptionFromAttribute: (attrIndex, optionIndex) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: state.dish.dishAttributes.map((attr, i) =>
                    i === attrIndex
                        ? {
                              ...attr,
                              attributeOptions: attr.attributeOptions.filter(
                                  (_, j) => j !== optionIndex,
                              ),
                          }
                        : attr,
                ),
            },
        })),

    // 更新 attribute 名稱
    updateAttributeName: (attrIndex, newName) =>
        set((state) => ({
            dish: {
                ...state.dish,
                dishAttributes: state.dish.dishAttributes.map((attr, i) =>
                    i === attrIndex ? { ...attr, name: newName } : attr,
                ),
            },
        })),
}));

export default useEditDishStore;
