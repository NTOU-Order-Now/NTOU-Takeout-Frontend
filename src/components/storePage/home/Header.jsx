import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const Header = ({
    title,
    leftIcon = faList,
    onLeftClick,
    rightComponents = [],
}) => {
    const currentUrl = window.location.href;
    return (
        <header className="fixed z-30 top-0 left-0 w-full flex flex-row items-center justify-between bg-white  transition-shadow duration-300 ease-in-out p-3 font-notoTC shadow-md">
            <div
                className="absolute left-4 text-xl cursor-pointer"
                onClick={onLeftClick}
            >
                <FontAwesomeIcon icon={leftIcon} />
            </div>
            <h1 className="font-bold text-xl ml-12">
                <a href={currentUrl}>{title}</a>
            </h1>
            {rightComponents.length > 0 && (
                <div className="flex items-center gap-4">
                    {rightComponents.map((Component, index) => (
                        <div key={index} className="flex items-center">
                            {Component}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    leftIcon: PropTypes.object,
    onLeftClick: PropTypes.func.isRequired,
    rightComponents: PropTypes.arrayOf(PropTypes.node),
};

export default Header;
