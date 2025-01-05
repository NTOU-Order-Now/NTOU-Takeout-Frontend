import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCardList from "../components/reviewPage/ReviewCardList";
import RatingBar from "../components/reviewPage/RatingBar";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useStoreQuery } from "@/hooks/store/useStoreQuery.jsx";
import { useReviewNumberQuery } from "@/hooks/review/useReviewNumberQuery.jsx";

const Review = () => {
    const { merchantId } = useParams();
    const navigate = useNavigate();
    const { reviewNumberData } = useReviewNumberQuery(merchantId);
    const handleClose = () => {
        navigate(-1);
    };
    const { storeData: merchantData, isLoading: isMerchantLoading } =
        useStoreQuery([merchantId]);

    return isMerchantLoading ? (
        <div className="font-notoTC flex justify-center items-center mt-4 fa-2x">
            <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
    ) : (
        <div className="overflow-y-auto font-notoTC fixed top-0 left-0 w-full h-full  bg-white flex flex-col justify-start items-start">
            <div className="w-full mt-8 relative">
                <div className="flex justify-between items-start px-4 mb-4">
                    <div className="flex-1 flex justify-center">
                        <h2 className="text-xl font-bold text-black text-center max-w-[80%]">
                            {merchantData?.[0].name}的評論
                        </h2>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 ml-4 shrink-0"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-8 h-8" />
                    </button>
                </div>
                <div className="title flex flex-col items-center">
                    <div className="flex items-center mt-4 text-left">
                        <span className="text-3xl font-bold">
                            {Number(merchantData?.[0].rating.toFixed(1))}
                        </span>
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-300 ml-2 w-8 h-8"
                        />
                    </div>

                    <div className="mt-4 text-left w-3/4 max-w-md mx-5">
                        {[5, 4, 3, 2, 1].map((starCount, index) => {
                            const count = reviewNumberData?.data[index];
                            const totalReviews = reviewNumberData?.data.reduce(
                                (acc, curr) => acc + curr,
                                0,
                            );
                            const percentage =
                                totalReviews > 0
                                    ? ((count / totalReviews) * 100).toFixed(1)
                                    : 0;

                            return (
                                <RatingBar
                                    key={starCount}
                                    stars={starCount}
                                    percentage={Number(percentage)}
                                    count={count}
                                />
                            );
                        })}
                    </div>
                </div>

                <ReviewCardList merchantId={merchantId}></ReviewCardList>
            </div>
        </div>
    );
};

export default Review;
