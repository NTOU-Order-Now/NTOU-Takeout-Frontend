const LoginRegisterSkeleton = () => {
    return (
        <div className="min-h-screen bg-white flex justify-center pt-10">
            <div className="flex flex-col font-notoTC">
                {/* Status Bar Skeleton */}
                <div className="text-center">
                    {/* Title Skeleton */}
                    <div className="h-8 bg-gray-200/50 rounded w-20 mx-auto mb-6 animate-pulse" />

                    {/* Tab Bar Skeleton */}
                    <div className="border border-neutral-300 rounded-xl relative flex items-center w-[70vw] h-14">
                        {/* Tab Button Skeletons */}
                        <div className="w-1/2 py-2 flex justify-center">
                            <div className="h-5 bg-gray-200/50 rounded w-16 animate-pulse" />
                        </div>
                        <div className="w-1/2 py-2 flex justify-center">
                            <div className="h-5 bg-gray-200/50 rounded w-16 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Form Skeleton */}
                <div className="mt-8 px-4 w-[70vw]">
                    {/* Input Fields Skeleton */}
                    <div className="space-y-6">
                        {/* First Input Group */}
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-200/50 rounded w-24 animate-pulse" />
                            <div className="h-12 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>

                        {/* Second Input Group */}
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-200/50 rounded w-24 animate-pulse" />
                            <div className="h-12 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>

                        {/* Third Input Group (for register form) */}
                        <div className="space-y-2">
                            <div className="h-5 bg-gray-200/50 rounded w-24 animate-pulse" />
                            <div className="h-12 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>

                        {/* Submit Button Skeleton */}
                        <div className="pt-4">
                            <div className="h-12 bg-gray-200/50 rounded w-full animate-pulse" />
                        </div>
                    </div>

                    {/* Additional Links Skeleton */}
                    <div className="mt-4 flex justify-center space-x-4">
                        <div className="h-5 bg-gray-200/50 rounded w-24 animate-pulse" />
                        <div className="h-5 bg-gray-200/50 rounded w-24 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterSkeleton;
