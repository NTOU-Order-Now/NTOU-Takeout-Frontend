const HeaderSkeleton = () => {
    return (
        <header className="fixed z-30 top-0 left-0 w-full flex flex-row items-center justify-between bg-white/30 backdrop-blur-sm transition-shadow duration-300 ease-in-out p-3 font-notoTC shadow-md">
            {/* Left icon skeleton */}
            <div className="absolute left-4 w-6 h-6 bg-gray-200/50 rounded animate-pulse" />

            {/* Title skeleton */}
            <h1 className="ml-12 h-7 w-32 bg-gray-200/50 rounded animate-pulse" />

            {/* Right components skeleton */}
            <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-gray-200/50 rounded animate-pulse" />
                <div className="w-6 h-6 bg-gray-200/50 rounded animate-pulse" />
            </div>
        </header>
    );
};

export default HeaderSkeleton;
