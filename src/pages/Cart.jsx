import { useMemo, useState } from "react";
import CartOrderSection from "../components/cartPage/CartOrderSection";
import NormalHeader from "../components/common/NormalHeader.jsx";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
import CartItemCardList from "../components/cartPage/CartItemCardList";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries";
import { useSystemContext } from "../context/useSystemContext.jsx";
import CartRemark from "../components/cartPage/CartRemark";
import CartSkeleton from "../skeleton/cart/CartSkeleton.jsx";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const {
        userInfo,
        cartData,
        isCartError: isError,
        merchantData,
        isMerchantLoading,
        menuCategoryList,
        totalSpend,
        totalQuantity,
        refetchCart,
    } = useSystemContext();
    if (userInfo && cartData === undefined) {
        console.error("Cart not found, refetchCart");
        refetchCart();
    }

    const { categoryData, isQueriesSuccess } = useCategoryQueries(
        menuCategoryList,
        merchantData?.menuId,
        userInfo !== undefined && userInfo?.role === "CUSTOMER",
    );

    const [remark, setRemark] = useState("");
    const navigate = useNavigate();
    // Create a map of dishes for easy access
    const dishesMap = useMemo(() => {
        if (!categoryData) return {};
        return categoryData?.reduce((acc, category) => {
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
    if (cartData === undefined || !isQueriesSuccess) {
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
                <NormalHeader />
                購物車資料讀取失敗:(
            </div>
        );
    }

    return (
        <div className="mt-3">
            <div className="flex-none">
                <NormalHeader
                    leftIcon={faTimes}
                    title={"購物車"}
                    handleClick={async () => await navigate(-1)}
                />
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
                    <CartRemark onRemarkChange={setRemark} value={remark} />
                </div>
            </div>
            <div className="flex-none">
                <CartOrderSection
                    orderDetail={{
                        cartData: cartData,
                        totalSpend: totalSpend,
                        remark,
                        estimateTime:
                            predictedTime - (totalQuantity > 2 ? 30 : 0),
                    }}
                    handleChangeRemark={setRemark}
                />
            </div>
        </div>
    );
};

export default Cart;
