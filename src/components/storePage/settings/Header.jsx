import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
    title,
    leftIcon,
    onLeftClick,
    rightComponents,
}) => {
    return (
        <div className="bg-orange-500 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={leftIcon}
                    onClick={onLeftClick}
                    className="text-lg" />
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            <button className="bg-white text-gray-700 px-4 py-1 rounded-md font-semibold text-sm">
                {rightComponents}
            </button>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    leftIcon: PropTypes.object,
    onLeftClick: PropTypes.func.isRequired,
    rightComponents: PropTypes.arrayOf(PropTypes.node),
};

export default Header;
