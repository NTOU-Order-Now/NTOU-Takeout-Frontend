import Cookies from "js-cookie";
const loginClient = {
    loginUser: async (userDetails) => {
        console.debug("login user:", userDetails);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/v2/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    credentials: 'include',
                    body: JSON.stringify(userDetails),
                }
            );

            // check response status
            if (!response.ok) {
                throw new Error(`密碼錯誤: ${response.status}\n`);
            }
            const res = await response.json();
            const data = res.data;
            const authHeader =  data.token;

            // parse token
            const token = authHeader ? authHeader.replace("Bearer ", "") : null;
            if (!token) {
                throw new Error("未授權錯誤");
            }
            // set cookie
            Cookies.set("authToken", token, {
                secure: true,
                sameSite: "strict",
            });

            return data;
        } catch(e) {
            console.error(e);
            throw e;
        }
    },
};

export default loginClient;