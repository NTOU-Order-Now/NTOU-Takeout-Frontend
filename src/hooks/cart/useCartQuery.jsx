import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/cart/getCart";

export const useCartQuery = (isEnable = true) => {
    console.debug("useCartQury calling, isEnable:", isEnable);
    const {
        data: cartData,
        isLoading,
        isError,
        refetch: refetchCart,
    } = useQuery({
        queryKey: ["cart"],
        queryFn: async ({ signal }) => {
            const res = await getCart(signal);
            return res.data;
        },
        enabled: isEnable,
        refetchOnWindowFocus: false,
        retry: 5,
    });
    return {
        cartData,
        isLoading,
        isError,
        refetchCart,
    };
};
