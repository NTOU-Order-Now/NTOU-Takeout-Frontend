import { useQuery } from "@tanstack/react-query";
import { getMenuById } from "../../api/menu/getMenuById.js";

// Fetch dish details for each category separately
export const useCategoryListQuery = (menuId, isEnable = true) => {
    // Fetch menu category list and dish details
    const { data: menuCategoryList = [] } = useQuery({
        queryKey: ["menuCategoryList", menuId],
        queryFn: async ({ signal }) => {
            const res = await getMenuById(signal, menuId);
            return res.categories;
        },

        enabled: !!menuId && isEnable,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 ** 10, //10 min
    });

    return menuCategoryList;
};
