import PropTypes from "prop-types";
import useNavStore from "../../stores/merchantMenuNav";

const Navbar = ({ onNavClick, isNavbarFixed }) => {
    const { navbarItems, nowPage, setNowPage } = useNavStore();

    const handleNavClick = (index) => {
        setNowPage(index);
        if (onNavClick) {
            onNavClick(index);
        }
    };

    return (
        <nav
            className={`font-notoTC bg-white px-4 pb-3 flex transition-all w-full duration-300  ${
                isNavbarFixed
                    ? "fixed top-0 left-0 w-full z-10 shadow-lg"
                    : "relative"
            }`}
        >
            <ul
                className={`z-10 pt-3 pb-2 flex w-full space-x-4 text-gray-400 text-lg font-notoTC overflow-x-auto whitespace-nowrap scrollbar-transparent ${isNavbarFixed ? "" : "relative "} bg-white cursor-pointer`}
            >
                {navbarItems.map((item, index) => (
                    <li
                        key={index}
                        className={` ${
                            index === nowPage
                                ? "text-black font-bold border-b-2 border-black hover:border-black"
                                : ""
                        } hover:text-gray-800 cursor-pointer`}
                        onClick={() => handleNavClick(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    onNavClick: PropTypes.func.isRequired,
    isNavbarFixed: PropTypes.bool.isRequired,
};
export default Navbar;
