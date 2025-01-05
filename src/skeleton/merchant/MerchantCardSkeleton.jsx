import { Skeleton } from "@/components/ui/skeleton";

const MerchantCardSkeleton = () => {
    return (
        <div className="font-notoTC relative h-60 bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* Image skeleton */}
            <Skeleton className="w-full h-[65%]" />

            {/* Content area */}
            <div className="absolute h-[87px] w-full top-[154px] border-gray-300 mt-1">
                <div className="flex flex-col">
                    {/* Restaurant name skeleton */}
                    <div className="absolute h-[22px] left-[12px] top-[9px]">
                        <Skeleton className="w-48 h-5" />
                    </div>

                    {/* Distance skeleton */}
                    <div className="absolute h-[12px] left-[12px] top-[32px]">
                        <Skeleton className="w-32 h-3" />
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex flex-row w-full relative justify-between -bottom-14 items-center mx-4">
                    {/* Average spend skeleton */}
                    <div>
                        <Skeleton className="w-28 h-3" />
                    </div>

                    {/* Rating skeleton */}
                    <div className="flex items-center mr-7">
                        <Skeleton className="w-12 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantCardSkeleton;
