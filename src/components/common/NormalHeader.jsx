import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

// Header Component
const NormalHeader = ({ leftIcon, title, handleClick = () => {} }) => {
    const navigate = useNavigate();
    const handleClose = () => {
        console.debug("handleClose");
        if (handleClose) {
            handleClick();
            return;
        }
        navigate(-1);
    };
    return (
        <header className="h-12 fixed z-30 top-0 left-0 w-full flex justify-between items-center bg-white shadow-md transition-shadow duration-300 ease-in-out p-2 font-notoTC">
            <div className="flex ml-3 items-center text-xl ">
                <FontAwesomeIcon
                    icon={leftIcon}
                    size="sm"
                    className="mr-4 -ml-1 cursor-pointer "
                    onClick={handleClose}
                />
                <h1 className="font-noto font-bold text-xl">{title}</h1>
            </div>
        </header>
    );
};

NormalHeader.propTypes = {
    leftIcon: PropTypes.object,
    title: PropTypes.string,
    handleClick: PropTypes.func,
};
export default NormalHeader;
