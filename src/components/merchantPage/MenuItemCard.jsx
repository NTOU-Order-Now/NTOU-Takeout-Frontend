import MenuItemButton from "./MenuItemButton";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import userInfoStore from "../../stores/user/userInfoStore.js";

const MenuItemCard = ({ food, onClick }) => {
    const { id, name, picture, price, description } = food;
    const user = userInfoStore((state) => state.user);

    const handleButtonClick = (e) => {
        onClick(food);
        e.stopPropagation();
    };
    return (
        <div
            className="w-full cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={() => onClick(food)}
        >
            <div className=" h-[17rem] flex max-w-xl bg-white text-white">
                {/* Lazy loaded Image */}
                <div className="w-40 flex-shrink-0 overflow-hidden aspect-auto relative">
                    <LazyLoadImage
                        src={picture}
                        alt={name}
                        className="object-cover w-full h-full"
                        effect="blur"
                        wrapperClassName="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 relative w-full p-4">
                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-2 text-black truncate">
                        {name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-4 line-clamp-3 overflow-hidden break-words">
                        {description}
                    </p>
                    <div className="absolute bottom-4  left-4 right-4 space-x-2 flex flex-row justify-between w-full">
                        {/* Price */}
                        <p className="text-xl text-gray-800 relative content-center font-bold">
                            ${price}
                        </p>

                        {/* Add button */}
                        {user !== undefined && user.role === "CUSTOMER" && (
                            <div className="pr-8 ">
                                <MenuItemButton
                                    dishId={id}
                                    onClick={handleButtonClick}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

MenuItemCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    food: PropTypes.object.isRequired,
};

export default MenuItemCard;
