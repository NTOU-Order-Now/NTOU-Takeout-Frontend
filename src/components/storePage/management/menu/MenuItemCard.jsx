import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faTrash,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const MenuItemCard = ({ categoryName, food, onDelete, onMove }) => {
    const { id, name, picture, price, description } = food;
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete({ dishId: id, categoryName });
    };

    const handleClickMove = async (e, dir) => {
        e.stopPropagation();
        await onMove(categoryName, id, dir);
    };
    return (
        <div
            className="w-full h-[17rem] flex cursor-pointer relative rounded-lg  overflow-hidden bg-gray-50 shadow-lg "
            // onClick={() => onClick(food)}
        >
            {/*move arrow button*/}
            <div className="flex flex-col justify-center absolute mb-10 left-0 h-full p-2  bg-white">
                <button
                    onClick={(e) => handleClickMove(e, "up")}
                    className="mb-16 py-2 cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        size="lg"
                        className="text-gray-600 hover:text-black"
                    />
                </button>
                <button
                    onClick={(e) => handleClickMove(e, "down")}
                    className="mt-16 py-2 cursor-pointer"
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
            <div className="relative w-full p-4">
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
                            <FontAwesomeIcon
                                icon={faTrash}
                                size="xl"
                                onClick={handleDelete}
                            />
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
    // onClick: PropTypes.func.isRequired,
    categoryName: PropTypes.string.isRequired,
    food: PropTypes.object.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default MenuItemCard;
