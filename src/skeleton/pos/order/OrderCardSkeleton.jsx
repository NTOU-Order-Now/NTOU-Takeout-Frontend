import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const OrderCardSkeleton = () => {
    return (
        <div className="relative flex justify-between rounded-lg p-4 shadow-lg mb-6 bg-gray-50">
            {/* Order Info */}
            <div className="flex flex-col items-start text-start">
                {/* Order ID */}
                <div className="mb-2">
                    <Skeleton className="w-32 h-7" /> {/* 對應單號 */}
                </div>
                {/* Estimated Time */}
                <div className="mb-1">
                    <Skeleton className="w-48 h-5" /> {/* 對應預估製作時間 */}
                </div>
                {/* Order Time */}
                <div className="mb-2">
                    <Skeleton className="w-40 h-5" /> {/* 對應下單時間 */}
                </div>
                {/* Detail Button */}
                <Skeleton className="w-20 h-8 mt-6" /> {/* 對應訂單內容按鈕 */}
            </div>

            {/* Status */}
            <div className="flex flex-col items-end">
                {/* Status Badge */}
                <div className="flex items-center mb-2">
                    <Skeleton className="w-16 h-8" /> {/* 對應狀態按鈕 */}
                </div>

                {/* Action Buttons */}
                {/*<div className="flex gap-2">*/}
                {/*    <Skeleton className="w-16 h-8" /> /!* 對應拒絕按鈕 *!/*/}
                {/*    <Skeleton className="w-16 h-8" /> /!* 對應接單按鈕 *!/*/}
                {/*</div>*/}
            </div>

            {/* Total Price */}
            <div className="absolute bottom-4 right-4">
                <Skeleton className="w-32 h-6" /> {/* 對應總金額 */}
            </div>
        </div>
    );
};

export default OrderCardSkeleton;
