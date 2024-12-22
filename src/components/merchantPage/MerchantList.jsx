import { useEffect, Suspense } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useMerchantStore from "../../stores/merchantStore";
import useSelectionStore from "../../stores/selectionStore";
import getStoreClient from "../../api/store/getStoreClient";
import Merchant from "./Merchant";
import MerchantSkeleton from "../../skeleton/merchant/MerchantSkeleton";
function MerchantList() {
    const { addMerchants } = useMerchantStore();
    const LOAD_SIZE = 4;

    const isSubmitted = useSelectionStore((state) => state.isSubmitted);
    const setIsSubmitted = useSelectionStore((state) => state.setIsSubmitted);
    const { ref, inView } = useInView({
        rootMargin: "100px",
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
        data: merchantIdList,
        isLoading: isMerchantIdListLoading,
        isError: isMerchantIdListError,
        error: merchantIdListError,
        isSuccess: isMerchantIdListSuccess,
    } = useQuery({
        queryKey: ["MerchantIdList", sortBy, sortDir, keyword],
        queryFn: async () => {
            const merchants = await getStoreClient.getStoreIdList({
                sortBy,
                sortDir,
                keyword,
            });
            setIsSubmitted(false);
            return merchants.data;
        },
        enabled: isSubmitted,
        staleTime: 1000 * 60 * 10, //10 minutes
    });

    // Use useInfiniteQuery to fetch merchants in pages
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isMerchantsLoading,
        isError: isMerchantsError,
        error: merchantsError,
    } = useInfiniteQuery({
        queryKey: ["merchants", merchantIdList], //will refetch when merchantIdList changes
        queryFn: async ({ pageParam }) => {
            const start = pageParam * LOAD_SIZE;
            const end = start + LOAD_SIZE;
            const idList = merchantIdList.slice(start, end);

            if (idList.length === 0) {
                return [];
            }
            const merchants = await getStoreClient.getMerchantsByIdList(idList);
            addMerchants(merchants.data);
            return merchants.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length;
            const totalMerchants = merchantIdList?.length || 0;

            if (nextPage * LOAD_SIZE < totalMerchants) {
                return nextPage;
            } else {
                return undefined; // No more pages
            }
        },
        enabled: isMerchantIdListSuccess,
    });

    //for infinite scroll
    useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

    //detect error and show error message
    if (isMerchantIdListError || isMerchantsError) {
        return (
            <div className="text-center">
                {isMerchantIdListError && merchantIdListError.message}
                {isMerchantsError && merchantsError.message}
            </div>
        );
    }

    return isMerchantIdListLoading || isMerchantsLoading ? (
        <div className="flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-20">
            {data?.pages.map((page) =>
                page.map((merchant) => {
                    return (
                        <Suspense
                            fallback={<MerchantSkeleton />}
                            key={merchant.id}
                        >
                            <Merchant
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
                {hasNextPage && (
                    <div className="flex justify-center items-center mt-4 fa-2x">
                        <MerchantSkeleton />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MerchantList;
