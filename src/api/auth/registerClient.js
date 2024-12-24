const registerClient = {
    registerUser: async (userDetails) => {
        console.debug("registerUser:", userDetails);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/v2/auth/register`,
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
                throw new Error(`註冊失敗: ${response.status}\n`);
            }

            const data = await response.json();
            return data;

        } catch(e) {
            console.error(e);
            throw e;
        }
    },
};

export default registerClient;