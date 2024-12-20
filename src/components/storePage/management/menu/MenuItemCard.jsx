import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faTrash,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const MenuItemCard = ({ food, onClick, onDelete, onUp, onDown }) => {
    const { id, name, picture, price, description } = food;
    const authToken = Cookies.get("authToken");

    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log("Add to cart clicked");
    };

    return (
        <div
            className="w-full h-[17rem] flex cursor-pointer relative rounded-lg  overflow-hidden bg-gray-50 shadow-lg "
            onClick={() => onClick(food)}
        >
            {/*move arrow button*/}
            <div className="flex flex-col justify-center absolute mb-10 left-0 h-full p-2  bg-white">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onUp();
                    }}
                    className="mb-16"
                >
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        size="lg"
                        className="text-gray-600 hover:text-black"
                    />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDown();
                    }}
                    className="mt-16"
                >
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        size="lg"
                        className="text-gray-600 hover:text-black"
                    />
                </button>
            </div>

            {/* Lazy loaded Image */}
            <div className="w-64 overflow-hidden aspect-auto ml-9 relative">
                <LazyLoadImage
                    src={picture}
                    alt={name}
                    className="object-cover w-full h-full"
                    effect="blur"
                    wrapperClassName="object-cover w-full h-full"
                />
            </div>

            {/* Content */}
            <div className="relative w-2/3 p-4">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-2 text-black">{name}</h2>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-4 line-clamp-3 text-ellipsis">
                    {description}
                </p>
                <div className="absolute bottom-4  space-x-2 flex flex-row justify-between w-full">
                    <p className="text-xl text-gray-800 relative items-start font-bold">
                        ${price}
                    </p>
                    <div className="pr-8">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className="text-red-500 hover:text-red-600 mr-4"
                        >
                            <FontAwesomeIcon icon={faTrash} size="xl" />
                        </button>
                        <button className="text-orange-500 hover:text-orange-600">
                            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

MenuItemCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    food: PropTypes.object.isRequired,
    onUp: PropTypes.func,
    onDown: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

export default MenuItemCard;
