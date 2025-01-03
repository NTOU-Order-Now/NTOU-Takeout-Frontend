import { useEffect, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import MerchantCard from "./MerchantCard.jsx";
import MerchantCardSkeleton from "../../skeleton/merchant/MerchantCardSkeleton";
import { useStoreInfiniteQuery } from "@/hooks/store/useStoreInfiniteQuery.jsx";
import filterStoreDataStore from "@/stores/filterStoreDataStore.js";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";

function MerchantList() {
    const LOAD_SIZE = 5;
    const { ref, inView } = useInView({
        rootMargin: "500px",
    });
    const { keyword, sortBy, sortDir } = filterStoreDataStore();
    const {
        storeData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useStoreInfiniteQuery(keyword, sortBy, sortDir, LOAD_SIZE);

    //for infinite scroll
    useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

    //detect error and show error message
    if (isError) {
        return <div className="text-center">{error}</div>;
    }
    if (isLoading) {
        return (
            <div className="py-2 flex items-center justify-center text-lg">
                <FontAwesomeIcon
                    icon={faEllipsis}
                    beatFade
                    size="lg"
                    className="mr-2"
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:p-20 p-8">
            {storeData?.pages.map((page) =>
                page.content.map((merchant) => {
                    return (
                        <Suspense
                            fallback={<MerchantCardSkeleton />}
                            key={merchant.id}
                        >
                            <MerchantCard
                                id={merchant.id}
                                name={merchant.name}
                                averageSpend={merchant.averageSpend}
                                rating={merchant.rating}
                                reviews={merchant.reviewIdList}
                                picture={merchant.picture}
                                className="w-full h-full bg-white border border-gray-300 rounded-xl shadow-lg"
                            />
                        </Suspense>
                    );
                }),
            )}
            <div ref={ref}>
                {hasNextPage && isFetchingNextPage && (
                    <div className="flex items-center justify-center text-lg">
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            beatFade
                            size="lg"
                            className="mr-2"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MerchantList;
