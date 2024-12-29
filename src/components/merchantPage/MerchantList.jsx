import { useEffect, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useMerchantStore from "../../stores/merchantStore";
import useSelectionStore from "../../stores/selectionStore";
import MerchantCard from "./MerchantCard.jsx";
import MerchantSkeleton from "../../skeleton/merchant/MerchantSkeleton";
import { useStoreInfiniteQueries } from "@/hooks/store/useStoreInfiniteQueries.jsx";
function MerchantList() {
    const { addMerchants } = useMerchantStore();
    const LOAD_SIZE = 5;

    const isSubmitted = useSelectionStore((state) => state.isSubmitted);
    const setIsSubmitted = useSelectionStore((state) => state.setIsSubmitted);
    const { ref, inView } = useInView({
        rootMargin: "500px",
    });
    if (localStorage.getItem("selectedSortBy") === "null")
        localStorage.setItem("selectedSortBy", "rating");
    if (localStorage.getItem("selectedSortDir") === "null")
        localStorage.setItem("selectedSortDir", "desc");
    if (localStorage.getItem("selectedKeyword") === "null")
        localStorage.setItem("selectedKeyword", "");
    const sortBy = localStorage.getItem("selectedSortBy");
    const sortDir = localStorage.getItem("selectedSortDir");
    const keyword = localStorage.getItem("selectedKeyword");

    const {
        storeData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useStoreInfiniteQueries(keyword, sortBy, sortDir, LOAD_SIZE);

    //for infinite scroll
    useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
            console.debug("fetchNextPage");
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

    //detect error and show error message
    if (isError) {
        return <div className="text-center">{error}</div>;
    }

    return isLoading ? (
        <div className="flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:p-20 p-8">
            {storeData?.pages.map((page) =>
                page.content.map((merchant) => {
                    return (
                        <Suspense
                            fallback={<MerchantSkeleton />}
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
                    <div className="flex justify-center items-center mt-4 fa-2x">
                        <MerchantSkeleton />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MerchantList;
