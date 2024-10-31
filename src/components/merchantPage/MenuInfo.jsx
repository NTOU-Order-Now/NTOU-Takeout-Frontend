import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faStar,
    faMapMarkerAlt,
    faPhone,
    faClock,
    faCoins,
} from "@fortawesome/free-solid-svg-icons";

const MenuInfo = ({ merchantData, onClose }) => {
    const { name, rating, address, phoneNumber, averageSpend, businessHours } =
        merchantData;
    const solidStar = Math.round(rating);
    const daysOfWeek = [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
    ];

    const locationURL =
        "https://www.google.com/maps/search/?api=1&query=" + address;
    const costDownLimit = averageSpend - 100 < 0 ? 0 : averageSpend - 100;
    const costUpLimit = averageSpend + 100;
    return (
        <div className="font-notoTC fixed z-50 left-1/2 w-[80%] transform -translate-x-1/2 -translate-y-1/2 max-w-sm p-4 bg-white shadow-md rounded-xl mx-auto">
            <div className="absolute top-2 right-2 rounded-lg flex justify-center items-center">
                <button className="text-gray-500 hover:text-gray-700 p-2">
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={onClose}
                        className="w-7 h-7"
                    />
                </button>
            </div>
            <h2 className="text-2xl font-bold text-black">{name}</h2>
            <div className="flex items-center mt-1">
                <div className="text-[13px] leading-[15px] text-gray-600 mb-[-1px]">
                    {rating}
                </div>
                <div className="text-yellow-500">
                    {[...Array(solidStar)].map((_, i) => (
                        <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="inline-block h-4 w-4"
                        />
                    ))}
                    {[...Array(5 - solidStar)].map((_, i) => (
                        <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="inline-block h-4 w-4 text-gray-300"
                        />
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <a
                    href={locationURL}
                    className="flex items-center text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="w-4 h-4 mr-2"
                    />
                    {address}
                </a>
            </div>
            <div className="mt-2 flex items-center">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2" />
                {phoneNumber}
            </div>

            <div className="flex flex-col items-start mt-2 -mb-2">
                <div className="mb-4 flex">
                    <FontAwesomeIcon
                        icon={faClock}
                        className="w-4 h-4 mr-2 mt-2"
                    />
                    <ul>
                        {businessHours.map((day, dayIndex) => (
                            <li key={dayIndex} className="text-lg">
                                <p className=" mr-2">{daysOfWeek[dayIndex]}</p>
                                {day.map((slot, slotIndex) => (
                                    <span key={slotIndex}>
                                        {slot.first.substring(0, 5)} ~{" "}
                                        {slot.second.substring(0, 5)}
                                        {slotIndex < day.length - 1 && (
                                            <span className="mx-1">,</span>
                                        )}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCoins} className="w-4 h-4 mr-2" />
                <span>
                    每人 {costDownLimit} ~ {costUpLimit} 元
                </span>
            </div>
        </div>
    );
};

MenuInfo.propTypes = {
    merchantData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MenuInfo;
