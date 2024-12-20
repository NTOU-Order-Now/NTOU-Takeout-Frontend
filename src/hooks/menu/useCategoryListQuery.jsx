import { useQuery } from "@tanstack/react-query";
import getMenuClient from "../../api/menu/getMenuClient";

// Fetch dish details for each category separately
export const useCategoryListQuery = (menuId, isEnable) => {
    // Fetch menu category list and dish details
    const { data: menuCategoryList = [] } = useQuery({
        queryKey: ["menuCategoryList", menuId],
        queryFn: async () => {
            const res = await getMenuClient.getMenuByMenuId(menuId);
            return res.data.categories;
        },

        enabled: !!menuId && isEnable,
        refetchOnWindowFocus: false,
    });

    return menuCategoryList;
};
