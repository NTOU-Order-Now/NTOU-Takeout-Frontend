import PropTypes from "prop-types";
import Header from "../components/orderPage/addReview/Header";
import ReviewForm from "../components/orderPage/addReview/ReviewForm";
import SubmitButton from "../components/orderPage/addReview/SubmitButton";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddReview = ({ storeId = "海洋大學店" }) => {
    const title = `對 ${storeId} 新增評論`;
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen">
            <Header
                title={title}
                onLeftClick={handleReturn}
                leftIcon={faArrowLeft}
            />
            <ReviewForm />
            <SubmitButton/>
        </div>
    );
};

AddReview.propTypes = {
    storeId: PropTypes.string,
};

export default AddReview;
