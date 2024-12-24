import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useUserInfoQuery } from "../hooks/user/useUserInfoQuery.jsx";
import HeaderSkeleton from "../skeleton/common/HeaderSkeleton.jsx";

const MerchantProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const authToken = Cookies.get("authToken");
    const { userInfo, isUserInfoLoading } = useUserInfoQuery(!!authToken);
    if (isUserInfoLoading) {
        return <HeaderSkeleton />;
    }

    if (!authToken || !userInfo) {
        console.debug("user not found", userInfo);
        navigate("/auth/login");
        return;
    }

    if (userInfo.role === "CUSTOMER") {
        navigate("/");
        return;
    }
    return children;
};

MerchantProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MerchantProtectedRoute;
