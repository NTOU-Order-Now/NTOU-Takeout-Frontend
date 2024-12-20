import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import useUserInfoStore from "../../stores/userInfoStore";
import userInfoStore from "../../stores/user/userInfoStore.js";
import CartIcon from "./CartIcon";
import Cookies from "js-cookie";

// Header Component
const Header = ({ title, onLeftClick = () => {} }) => {
    const navigate = useNavigate();
    const authToken = Cookies.get("authToken");
    const user = userInfoStore((state) => state.user);

    const handleRightClick = () => {
        if (authToken && user !== undefined && user.role === "CUSTOMER") {
            navigate("/cart");
        } else {
            navigate("/auth/login");
        }
    };

    return (
        <header className="fixed z-30  top-0 left-0 w-full flex justify-between items-center bg-white shadow-md transition-shadow duration-300 ease-in-out p-2 font-notoTC">
            <div className="text-xl cursor-pointer" onClick={onLeftClick}>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <h1 className="font-noto font-bold text-2xl m-0">
                <a href="/Order-Now-Frontend/">{title}</a>
            </h1>
            <div className="text-xl cursor-pointer" onClick={handleRightClick}>
                <CartIcon />
            </div>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    onLeftClick: PropTypes.func,
    onRightClick: PropTypes.func,
};

export default Header;
