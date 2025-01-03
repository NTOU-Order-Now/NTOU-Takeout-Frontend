const HomeSkeleton = () => {
    // Create mock merchants for the list
    const mockMerchants = Array(4).fill(null);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Skeleton */}
            <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/30 backdrop-blur-sm border-b border-gray-200 flex items-center px-4 animate-pulse">
                {/* Menu button skeleton */}
                <div className="w-8 h-8 bg-gray-200/50 rounded mr-4" />
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200/50 rounded w-32" />
            </div>

            <div className="py-5" />

            {/* Search Bar Skeleton */}
            <div className="px-4 mt-16 mb-4">
                <div className="w-full h-10 bg-white/30 backdrop-blur-sm border border-gray-200 rounded-lg flex items-center px-4 animate-pulse">
                    {/* Search icon skeleton */}
                    <div className="w-5 h-5 bg-gray-200/50 rounded-full mr-3" />
                    {/* Search input skeleton */}
                    <div className="h-4 bg-gray-200/50 rounded w-48" />
                </div>
            </div>

            {/* MerchantCard List Skeleton */}
            <div className="flex flex-col items-center px-4">
                {mockMerchants.map((_, index) => (
                    <div
                        key={index}
                        className="relative w-[90vw] h-[241px] m-2 bg-white/30 backdrop-blur-sm border-2 
                      border-gray-300 rounded-2xl overflow-hidden animate-pulse"
                    >
                        {/* Image skeleton */}
                        <div className="w-full h-[65%] bg-gray-200/50" />

                        {/* Info section skeleton */}
                        <div className="box-border absolute w-[90vw] h-[87px] left-0 top-[154px] border-t-2 border-gray-300">
                            {/* Store name skeleton */}
                            <div className="absolute h-[22px] left-[12px] top-[9px]">
                                <div className="h-5 bg-gray-200/50 rounded w-40" />
                            </div>

                            {/* Distance skeleton */}
                            <div className="absolute h-[12px] left-[12px] top-[32px]">
                                <div className="h-3 bg-gray-200/50 rounded w-32" />
                            </div>

                            {/* Average spend skeleton */}
                            <div className="absolute h-[12px] left-[12px] top-[57px]">
                                <div className="h-3 bg-gray-200/50 rounded w-36" />
                            </div>

                            {/* Rating skeleton */}
                            <div className="absolute w-[75px] h-[20px] right-[3px] bottom-[11px]">
                                <div className="h-4 bg-gray-200/50 rounded w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeSkeleton;
