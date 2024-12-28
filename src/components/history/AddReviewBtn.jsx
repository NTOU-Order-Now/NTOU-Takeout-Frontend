import PropTypes from "prop-types";
import { MessageSquareDiff } from "lucide-react";

const AddReviewBtn = ({ setShowAddReview }) => {
    return (
        <footer
            className="cursor-pointer font-notoTC  bg-orange-500 p-4 text-center text-white flex justify-center items-center"
            onClick={() => setShowAddReview(true)}
        >
            <span className="text-xl px-2 pt-1">
                <MessageSquareDiff />
            </span>
            <span className="text-xl font-bold mr-2">撰寫評論</span>
        </footer>
    );
};

AddReviewBtn.propTypes = {
    setShowAddReview: PropTypes.func.isRequired,
};

export default AddReviewBtn;
