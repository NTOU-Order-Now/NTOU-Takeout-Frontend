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
                <div className="w-64 overflow-hidden aspect-auto">
                    <LazyLoadImage
                        src={picture}
                        alt={name}
                        className="object-cover w-full h-full"
                        effect="blur"
                        wrapperClassName="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="relative flex flex-col w-2/3 py-4 pl-2 pr-1">
                    <div className="flex-1">
                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-2 text-black">
                            {name}
                        </h2>

                        {/* Description */}
                        <p className="text-sm text-gray-600 line-clamp-3 text-ellipsis ">
                            {description}
                        </p>
                    </div>
                    <div className="mt-auto flex justify-between items-center w-full pb-1 pr-2">
                        {/* Price */}
                        <p className="text-2xl font-bold text-gray-800 py-2">
                            ${price}
                        </p>

                        {/* Add button */}
                        {user !== undefined && user.role === "CUSTOMER" && (
                            <div className="flex justify-end  ">
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
