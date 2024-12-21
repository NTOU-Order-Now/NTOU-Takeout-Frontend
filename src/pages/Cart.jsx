import { useMemo, useState } from "react";
import CartOrderSection from "../components/cartPage/CartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
import CartItemCardList from "../components/cartPage/CartItemCardList";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries";
import { useSystemContext } from "../context/useSystemContext.jsx";
import CartRemark from "../components/cartPage/CartRemark";
import CartSkeleton from "../skeleton/cart/CartSkeleton.jsx";
import userInfo from "../components/orderPage/UserInfo.jsx";
const Cart = () => {
    const {
        cartData,
        isCartError: isError,
        merchantData,
        isMerchantLoading,
        menuCategoryList,
        totalSpend,
        totalQuantity,
        refetchCart,
    } = useSystemContext();
    if (cartData === undefined) {
        console.error("Cart not found, refetchCart");
        refetchCart();
    }
    console.debug("Cart loaded merchantData:", merchantData);
    const { categoryData, isQueriesSuccess } = useCategoryQueries(
        menuCategoryList,
        userInfo?.role === "CUSTOMER" ? cartData?.menuId : userInfo?.storeId,
        userInfo !== undefined,
    );
    const [remark, setRemark] = useState("");
    // Create a map of dishes for easy access
    const dishesMap = useMemo(() => {
        if (!categoryData) return {};

        return categoryData.reduce((acc, category) => {
            category.dishes.forEach((dish) => {
                acc[dish.id] = dish;
            });
            return acc;
        }, {});
    }, [categoryData]);
    // console.debug("cartData:", cartData);
    // console.debug("merchantData:", merchantData);
    // console.debug("isMerchantLoading:", isMerchantLoading);
    // console.debug("isQueriesSuccess:", isQueriesSuccess);
    // console.debug("dishesMap:", dishesMap);
    if (cartData === undefined) {
        return <CartSkeleton />;
    }
    let predictedTime = 10 * totalQuantity;
    if (predictedTime > 150 && predictedTime < 300) {
        predictedTime = Math.floor(predictedTime * 0.7);
    } else if (predictedTime >= 300) {
        predictedTime = Math.floor(predictedTime * 0.5);
    }
    if (isError) {
        return (
            <div className="flex justify-center items-center mt-28 fa-2x">
                <CartPageHeader />
                購物車資料讀取失敗:(
            </div>
        );
    }
    return (
        <div className="mt-3">
            <div className="flex-none">
                <CartPageHeader />
                <CartTotalSpend
                    orderDetail={{
                        cartData: cartData,
                        merchantName: merchantData?.name,
                        totalSpend: totalSpend,
                    }}
                />
            </div>
            <div className="flex-1 overflow-auto pb-[120px] ">
                <CartItemCardList cartData={cartData} dishesMap={dishesMap} />
                <div className="px-4">
                    <CartRemark onRemarkChange={setRemark} />
                </div>
            </div>
            <div className="flex-none">
                <CartOrderSection
                    orderDetail={{
                        cartData: cartData,
                        totalSpend: totalSpend,
                        estimateTime:
                            predictedTime - (totalQuantity > 2 ? 30 : 0),
                    }}
                />
            </div>
        </div>
    );
};

export default Cart;
