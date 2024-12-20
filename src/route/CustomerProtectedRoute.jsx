import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import userInfoStore from "../stores/user/userInfoStore.js";

const CustomerProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const user = userInfoStore((state) => state.user);
    if (user === undefined || user?.role === "MERCHANT") {
        console.debug("merchant cant accsss");
        navigate("/auth/login");
        return;
    }
    return children;
};

CustomerProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomerProtectedRoute;
