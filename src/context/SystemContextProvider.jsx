import { createContext, useContext, useEffect, useState } from "react";
import { useCartQuery } from "../hooks/cart/useCartQuery";
import { useMerchantDataQuery } from "../hooks/merchant/useMerchantDataQuery";
import { useCategoryListQuery } from "../hooks/menu/useCategoryListQuery";
import { useUserInfoQuery } from "../hooks/user/useUserInfoQuery.jsx";
import { SystemContext } from "./SystemContext.jsx";
import PropTypes from "prop-types";
import userInfoStore from "../stores/user/userInfoStore.js";
import Cookies from "js-cookie";

export const SystemContextProvider = ({ children }) => {
    console.debug("SystemContextProvider mounted");
    const authToken = Cookies.get("authToken");
    const { userInfo, isUserInfoLoading } = useUserInfoQuery(
        authToken !== undefined,
    );
    console.debug("userInfo : ", userInfo);
    const setUser = userInfoStore((state) => state.setUser);
    useEffect(() => {
        if (userInfo) {
            setUser(userInfo);
        }
    }, [userInfo, setUser]);
    const {
        cartData,
        isLoading: isCartLoading,
        isError: isCartError,
        refetchCart,
    } = useCartQuery(
        // don't need fetch when user is undefined or role is MERCHANT
        userInfo !== undefined && userInfo?.role === "CUSTOMER",
    );

    const { merchantData, isMerchantLoading, refetchMerchantData } =
        useMerchantDataQuery(
            cartData?.storeId ?? null,
            // don't need fetch when user is undefined or role is MERCHANT
            userInfo !== undefined && userInfo?.role === "CUSTOMER",
        );

    const menuCategoryList = useCategoryListQuery(
        merchantData?.menuId ?? null,
        // don't need fetch when user is undefined or role is MERCHANT
        userInfo !== undefined && userInfo?.role === "CUSTOMER",
    );

    // // Calculate total spend
    const [totalSpend, setTotalSpend] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        if (cartData?.orderedDishes) {
            let tmpQuantity = 0;
            const totalSpend = cartData.orderedDishes.reduce((sum, dish) => {
                tmpQuantity += dish.quantity;
                return sum + dish.price * dish.quantity;
            }, 0);

            setTotalQuantity(tmpQuantity);

            const totalExtraCost = cartData.orderedDishes.reduce(
                (sum, dish) => {
                    const costs = dish.chosenAttributes.reduce(
                        (acc, attr) => acc + attr.extraCost,
                        0,
                    );
                    return sum + costs * dish.quantity;
                },
                0,
            );

            setTotalSpend(totalSpend + totalExtraCost);
        }
    }, [cartData?.orderedDishes]);
    const cartCount = cartData?.orderedDishes?.length;
    console.debug("cartCount:", cartCount);
    console.debug("cartData:", cartData);
    console.debug("merchantData:", merchantData);
    console.debug("totalSpend:", totalSpend);
    console.debug("totalQuantity:", totalQuantity);
    return (
        <SystemContext.Provider
            value={{
                userInfo,
                isUserInfoLoading,
                cartData,
                cartCount,
                isCartLoading,
                isCartError,
                merchantData,
                menuCategoryList,
                isMerchantLoading,
                totalSpend,
                totalQuantity,
                refetchCart,
                refetchMerchantData,
            }}
        >
            {children}
        </SystemContext.Provider>
    );
};
SystemContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
