import useReviewForm from '../../../stores/AddReviewStore';

function ReviewForm() {
    const {
        storeDescription,
        setStoreDescription,
        storeAverageSpend,
        setstoreAverageSpend,
        storeRating,
        setStoreRating,
    } = useReviewForm();

    const handleRatingChange = (rating) => {
        setStoreRating(rating);
    };

    return (
        <div className="p-4 max-w-screen">
            <form className="p-4 space-y-4 font-semibold font-notoTC">

                {/* Store comment */}
                <div>
                    <label className="block text-gray-700 mb-1">評論：</label>
                    <textarea
                        rows="3"
                        value={storeDescription}
                        onChange={(e) => setStoreDescription(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="請輸入您對這家店的想法"
                    />
                </div>

                {/* Store rating */}
                <div>
                    <label className="block text-gray-700 mb-1">評分：</label>
                    <div className="flex space-x-4 m-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                type="button"
                                className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                                    storeRating === rating
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-gray-200 text-gray-700 border-gray-300'
                                }`}
                                onClick={() => handleRatingChange(rating)}
                            >
                                {rating}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Store average cost */}
                <div>
                    <label className="block text-gray-700 mb-1">平均花費：</label>
                    <input
                        type="number"
                        value={storeAverageSpend}
                        onChange={(e) => setstoreAverageSpend(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="請輸入您的平均花費"
                    />
                </div>

            </form>
        </div>
    );
}

export default ReviewForm;
