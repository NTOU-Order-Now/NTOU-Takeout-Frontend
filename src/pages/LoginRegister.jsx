import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ToggleNavBar from "../components/common/ToggleNavBar";
import RegisterForm from "../components/authPage/RegisterForm.jsx";
import LoginForm from "../components/authPage/LoginForm.jsx";
function LoginRegister() {
    const { authType } = useParams();
    const navigate = useNavigate();
    const [curType, setCurType] = useState("login");
    useEffect(() => {
        setCurType(authType);
    }, [authType]);
    console.debug("curType", curType);
    const handleStatusChange = (newCurType) => {
        navigate(`/auth/${newCurType}`, { replace: true }); // replace: true to prevent adding new history
        setCurType(newCurType);
    };
    const options = {
        登入: () => {
            handleStatusChange("login");
        },
        註冊: () => {
            handleStatusChange("register");
        },
    };
    return (
        <div className="min-h-screen bg-white flex justify-center pt-20">
            <div className="flex flex-col font-notoTC ">
                <ToggleNavBar
                    options={options}
                    InitActiveTab={curType === "login" ? "登入" : "註冊"}
                />
                {
                    curType === "register" ? (
                        <RegisterForm/>
                    ):(
                        <LoginForm/>
                    )
                }
            </div>
        </div>
    );
}

export default LoginRegister;
