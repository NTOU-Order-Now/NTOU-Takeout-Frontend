import { useState } from "react";
import FormPage from "../components/authPage/FormPage.jsx";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    console.debug("ForgetPassword");
    const [step, setStep] = useState(0);
    const titleText = ["輸入 Email","請輸入驗證碼","密碼重設","完成"];
    const description = [
        "請提供您的電子郵件以重設密碼",
        "驗證碼已寄出，請至您的電子信箱查收。",
        "請提供您的新密碼",
        "密碼重設完成，請用新密碼登入。"
    ];
    const formData=[
        { "email":"email"},
        {"token":"驗證碼"},
        {"newPassword":"新密碼","confirmPassword":"再次輸入新密碼"},
    ];
    const errorMessageText=[
        "查無此信箱或信箱錯誤",
        "驗證碼不符合格式",
        "密碼不一致或不符合格式"
    ]
    const navigate = useNavigate();
    // Verify blanks
    const handleOfferEmail = (payload) => {
        // if (currentStep === 0 && !formData.email.trim()) {
        //     setError("請輸入電子信箱");
        //     return;
        // }
        //
        // if (currentStep === 1 && !formData.code.trim()) {
        //     setError("請輸入驗證碼");
        //     return;
        // }
        //
        // if (currentStep === 2) {
        //     const { newPassword, confirmPassword } = formData;
        //
        //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        //     if (!passwordRegex.test(newPassword)) {
        //         setError("密碼必須包含大小寫字母和數字，且長度至少為8個字符");
        //         return;
        //     }
        //
        //     if (newPassword !== confirmPassword) {
        //         setError("兩次輸入的密碼不一致");
        //         return;
        //     }
        // }
        //
        // setError("");
        // if (currentStep < 3) {
        //     setFormData({ email: "", code: "", newPassword: "", confirmPassword: "" });
        //     setCurrentStep(currentStep + 1);
        // }
        console.debug("handleOfferEmail: ",payload);
        setStep(step+1);
    };
    const handleVerify = (payload) => {
        console.debug("Verify payload: ",payload);
        setStep(step+1);
    }

    const handleResetPassword = (payload) => {
        console.debug("Reset password payload: ",payload);
        setStep(step+1);
    }
    const handleFinish = () => {
        console.debug("Finish");
        navigate("/auth/login");
    }
    return (
        <div className="flex flex-col items-center justify-start mt-[4rem] font-notoTC">
            {/*offer email*/}
            {step===0 && <FormPage
                titleText={titleText[step]}
                description={description[step]}
                formData={formData[step]}
                errorMessageText={errorMessageText[step]}
                handleSubmit={handleOfferEmail}
            />}
            {/*verify*/}
            {step===1 && <FormPage
                titleText={titleText[step]}
                description={description[step]}
                formData={formData[step]}
                errorMessageText={errorMessageText[step]}
                handleSubmit={handleVerify}
            />}
            {/*reset password*/}
            {step===2 && <FormPage
                titleText={titleText[step]}
                description={description[step]}
                formData={formData[step]}
                errorMessageText={errorMessageText[step]}
                handleSubmit={handleResetPassword}
            />}
            {/*finsih*/}
            {step===3 && <FormPage
                titleText={titleText[step]}
                description={description[step]}
                continueBtnText={"回登入頁"}
                handleSubmit={handleFinish}
            />}
        </div>
    );
}

export default ForgetPassword;
