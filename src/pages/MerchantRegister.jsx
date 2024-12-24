import { useState } from "react";
import TitleText from "../components/authPage/TitleText.jsx";
import DataForm from "../components/authPage/DataForm.jsx";
import { Link } from "react-router-dom";
import BusinessHoursSelector from "../components/authPage/BusinessHoursSelector.jsx";

const MerchantRegister = () => {
    const titleText = "商家資訊設定";
    const description = "";

    const dataInput = [["驗證碼"], ["上傳商家圖片", "商家電話", "商家地址"]];
    const continueBtn = ["繼續", "繼續", "回到登入頁面"];

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        uploadImage: "",
        phoneNumber: "",
        address: "",
    });
    const [error, setError] = useState("");

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileChange = (field, file) => {
        setFormData({ ...formData, [field]: file });
    };

    const validateStep = () => {
        if (currentStep === 0 && !formData.code.trim()) {
            setError("請輸入驗證碼");
            return false;
        }
        if (currentStep === 1) {
            if (!formData.uploadImage) {
                setError("請上傳商家圖片");
                return false;
            }
            if (!formData.phoneNumber.trim()) {
                setError("請輸入商家電話");
                return false;
            }
            if (!formData.address.trim()) {
                setError("請輸入商家地址");
                return false;
            }
        }
        return true;
    };

    const handleContinue = () => {
        if (!validateStep()) return;

        setError("");
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };
    const [businessHours, setBusinessHours] = useState(
        Array(7)
            .fill()
            .map(() =>
                Array(2)
                    .fill()
                    .map(() => ({
                        start: "",
                        end: "",
                    })),
            ),
    );
    console.debug("businessHours", businessHours);
    return (
        <div className="flex flex-col items-center justify-start mt-[4rem] min-h-[50vh] font-notoTC">
            <TitleText titleData={[titleText, description]} />
            {/*{currentStep < 2 && (*/}
            {/*    <DataForm*/}
            {/*        formData={dataInput[currentStep]}*/}
            {/*        inputValues={formData}*/}
            {/*        currentStep={currentStep}*/}
            {/*        onInputChange={handleInputChange}*/}
            {/*        onFileChange={handleFileChange}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{error && <p className="text-red-500 text-sm mt-2">{error}</p>}*/}
            {/*{currentStep < 2 ? (*/}
            {/*    <button*/}
            {/*        onClick={handleContinue}*/}
            {/*        className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"*/}
            {/*    >*/}
            {/*        {continueBtn[currentStep]}*/}
            {/*    </button>*/}
            {/*) : (*/}
            {/*    <Link*/}
            {/*        to="/loginRegister"*/}
            {/*        className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition block text-center"*/}
            {/*    >*/}
            {/*        {continueBtn[currentStep]}*/}
            {/*    </Link>*/}
            {/*)}*/}
            <BusinessHoursSelector
                businessHours={businessHours}
                onUpdate={setBusinessHours}
            />
        </div>
    );
};

export default MerchantRegister;
