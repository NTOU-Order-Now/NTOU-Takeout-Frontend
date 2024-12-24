import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/cart/getCart";

export const useCartQuery = (enabled = true) => {
    console.debug("isEnable", enabled);
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
        enabled: enabled,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 ** 1, //10 min
    });
    return {
        cartData,
        isLoading,
        isError,
        refetchCart,
    };
};
