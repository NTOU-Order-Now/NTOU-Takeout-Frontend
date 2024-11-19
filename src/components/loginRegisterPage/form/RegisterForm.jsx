import { useState } from "react";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import registerClient from "../../../api/auth/registerClient";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !phone || !password || !confirmPassword) {
            setError("請填寫所有欄位");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("密碼必須至少包含一個大小寫字母和一個數字，且長度至少為8個字符");
            return;
        }
        if (password !== confirmPassword) {
            setError("兩次輸入的密碼不符合");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            
            const hashedPassword = await CryptoJS.SHA256(password);
            const pPasword = hashedPassword.toString();
            const userDetails = {
                name: username,
                email,
                phoneNumber: phone,
                password: pPasword,
                gender: "OTHER",
                role: "CUSTOMER",
            };
            console.log("passwd regis",pPasword);
            
            const response = await registerClient.registerUser(userDetails);
            console.log("註冊成功:", response);

            navigate("/");
        } catch (err) {
            console.error("註冊失敗:", err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 w-[70vw]">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="名稱"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <input
                    type="email"
                    placeholder="電子信箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <input
                    type="tel"
                    placeholder="電話"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <input
                    type="password"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <input
                    type="password"
                    placeholder="再次輸入密碼"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />

                {error && <p className="text-red-500 text-xs pl-2 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    ) : (
                        "註冊"
                    )}
                </button>
                {/* <button
                    type="submit"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] text-black py-2 rounded-lg border border-gray-600 transition"
                >
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                    使用 Google 帳號登入
                </button> */}
            </form>
        </div>
    );
};

export default RegisterForm;
