import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReviewCard from "./ReviewCard";
import PropTypes from "prop-types";
import { useReviewInfiniteQueries } from "@/hooks/review/useReviewInfiniteQueries.jsx";

const ReviewCardList = ({ merchantId }) => {
    const LOAD_SIZE = 5;
    const { ref, inView } = useInView({
        rootMargin: "100px",
    });
    const {
        reviews,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useReviewInfiniteQueries(merchantId, LOAD_SIZE);
    //for infinite scroll
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return isLoading ? (
        <div className="font-notoTC w-screen flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon
                icon={faSpinner}
                spinPulse
                className="flex justify-center items-center"
            />
        </div>
    ) : (
        <div className="font-notoTC flex flex-col items-center ">
            {reviews?.pages.map((page) =>
                page.content.map((reviewCard) => {
                    return (
                        <ReviewCard
                            key={reviewCard.id}
                            name={reviewCard.userName}
                            starNumber={reviewCard.rating}
                            date={reviewCard.date}
                            description={reviewCard.comment}
                        />
                    );
                }),
            )}
            <div ref={ref} className="my-5"></div>
            {hasNextPage ? (
                <div className="flex justify-center items-center mt-4 fa-2x">
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                </div>
            ) : (
                "沒有更多評論"
            )}
        </div>
    );
};
ReviewCardList.propTypes = {
    merchantId: PropTypes.string.isRequired,
};

export default ReviewCardList;
