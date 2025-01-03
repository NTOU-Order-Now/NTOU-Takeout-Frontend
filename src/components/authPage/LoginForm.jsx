import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../hooks/loginRegisterPage/useLoginMutation.jsx";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { googleSignIn } from "@/api/auth/googleSignIn.js";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loginMutation, isPending, isLoginSuccess } = useLoginMutation();

    const loginButtonRef = useRef(null);

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
    useEffect(() => {
        if (loginButtonRef.current) {
            loginButtonRef.current.focus();
        }
    }, []);

    return (
        <div className="mt-8 w-[70vw]">
            <form onSubmit={handleSubmit}>
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
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter") {
                            handleSubmit(e);
                        }
                    }}
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300"
                />

                {error && (
                    <p className="text-red-500 text-xs pl-2 mb-1">{error}</p>
                )}
                <p
                    className="text-sm ml-2 text-gray-600 underline"
                    onClick={() => {
                        navigate("/auth/reset/password");
                    }}
                >
                    忘記密碼
                </p>
                <div className="fixed bottom-[2rem] left-1/2 transform -translate-x-1/2 h-[140px] flex flex-col justify-between w-[70vw]">
                    <button
                        ref={loginButtonRef}
                        type="submit"
                        className="w-full bg-white border-orange-500 border-2 text-orange-500 py-1 rounded-lg hover:bg-gray-200 transition"
                        disabled={isPending}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        {isPending ? (
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                beatFade
                                size="lg"
                                className="mr-2"
                            />
                        ) : (
                            "返回首頁"
                        )}
                    </button>
                    <button
                        onClick={googleSignIn}
                        className="w-full text-center text-black py-1 rounded-lg border-2 border-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        Google 登入
                    </button>
                    <button
                        ref={loginButtonRef}
                        type="submit"
                        className="w-full bg-orange-500 text-white py-1 rounded-lg hover:bg-orange-600 transition"
                        disabled={isPending}
                        onClick={handleSubmit}
                    >
                        {isPending ? (
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                beatFade
                                size="lg"
                                className="mr-2"
                            />
                        ) : (
                            "登入"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
