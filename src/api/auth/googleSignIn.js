export const googleSignIn = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/google`,
        );
        const data = await response.json();
        console.log("獲取的數據:", data);
        return response.data;
    } catch (error) {
        console.error("login error:", error);
    }
};
