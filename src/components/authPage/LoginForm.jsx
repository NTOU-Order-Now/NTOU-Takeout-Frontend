import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useLoginMutation } from "../../hooks/loginRegisterPage/useLoginMutation.jsx";
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginMutation, isLoading } = useLoginMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("請填寫所有欄位");
            return;
        }

        setError("");

        try {
            await loginMutation({
                email,
                password,
            });

            setEmail("");
            setPassword("");
        } catch (err) {
            setError(err.message || "登入失敗，請稍後再試");
        }
    };
    return (
        <div className="mt-8 w-[70vw]">
            <form>
                <input
                    type="email"
                    placeholder="電子信箱"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />
                <input
                    type="password"
                    placeholder="密碼"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />

                {error && (
                    <p className="text-red-500 text-xs pl-2 mb-1">{error}</p>
                )}
                <button
                    className="text-sm ml-2 text-gray-600 underline"
                    onClick={() => {
                        navigate("/auth/reset/password");
                    }}
                >
                    忘記密碼
                </button>

                <button
                    type="submit"
                    className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="mr-2"
                        />
                    ) : (
                        "登入"
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

export default LoginForm;
