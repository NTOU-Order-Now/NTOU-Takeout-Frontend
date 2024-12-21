const MenuPageSkeleton = () => {
    // Create mock categories and items
    const mockCategories = Array(3).fill(null);
    const mockItems = Array(4).fill(null);

    return (
        <div className="min-h-screen">
            {/* Menu Header Skeleton */}
            <header className="relative top-0 left-0 w-full">
                {/* Store Image Skeleton */}
                <div className="relative h-64">
                    <div className="absolute inset-0 w-full h-full bg-gray-200/50 animate-pulse" />
                </div>

                {/* Back and Share Buttons Skeleton */}
                <div className="pt-1 pb-1 pl-2 pr-2 absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full w-8 h-8 animate-pulse" />
                <div className="pt-1 pb-1 pl-2 pr-2 absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full w-8 h-8 animate-pulse" />

                {/* Store Info Section Skeleton */}
                <div className="bg-white/30 backdrop-blur-sm rounded-t-2xl p-4 relative -top-8 left-0 right-0 z-10">
                    <div className="flex items-center justify-between">
                        {/* Store Name */}
                        <div className="flex flex-col space-y-2">
                            <div className="h-6 bg-gray-200/50 rounded w-40 animate-pulse" />
                            <div className="h-4 bg-gray-200/50 rounded w-32 animate-pulse" />
                            <div className="h-4 bg-gray-200/50 rounded w-36 animate-pulse" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mt-10 space-x-2">
                            <div className="h-6 w-20 bg-gray-200/50 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Navbar Skeleton */}
            <nav className="bg-white/30 backdrop-blur-sm p-3 w-full animate-pulse">
                <div className="flex space-x-4 overflow-x-auto">
                    {mockCategories.map((_, index) => (
                        <div key={index} className="h-6 bg-gray-200/50 rounded w-20 flex-shrink-0" />
                    ))}
                </div>
            </nav>

            {/* Menu Section Skeleton */}
            <div className="p-4">
                {mockCategories.map((_, categoryIndex) => (
                    <div key={categoryIndex} className="mb-8">
                        {/* Category Title */}
                        <div className="h-8 bg-gray-200/50 rounded w-40 mb-4 animate-pulse" />

                        {/* Menu Items Grid */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {mockItems.map((_, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="bg-white/30 backdrop-blur-sm rounded-lg p-4 animate-pulse"
                                >
                                    {/* Item Image */}
                                    <div className="w-full h-48 bg-gray-200/50 rounded mb-4" />

                                    {/* Item Content */}
                                    <div className="space-y-2">
                                        <div className="h-6 bg-gray-200/50 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200/50 rounded w-1/2" />
                                        <div className="h-4 bg-gray-200/50 rounded w-1/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Button Skeleton */}
            <div className="fixed bottom-4 right-6 z-10">
                <div className="h-12 w-32 bg-gray-200/50 rounded-lg animate-pulse" />
            </div>
        </div>
    );
};

export default MenuPageSkeleton;