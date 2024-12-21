import Header from "./Header";
import StoreForm from "./StoreForm";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BasicInfo = () => {
    const title = '基本資訊'
    const navigate = useNavigate();
    const rightComponents = ['儲存'];

    const handleReturn = () => {
        navigate(-1);
    };


    return (
        <div className="min-h-screen">
            <Header title={title}
                onLeftClick={handleReturn}
                leftIcon={faArrowLeft}
                rightComponents={rightComponents}
            />
            <StoreForm/>
        </div>
    );
};

export default BasicInfo;