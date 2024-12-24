import PropTypes from "prop-types";
import Cookies from "js-cookie";

const MenuItemCard = ({ food, onClick }) => {
    const { name, picture, price, description } = food;

    const authToken = Cookies.get("authToken");

    return (
        <div
            className="font-notoTC menu-item block cursor-pointer"
            onClick={() => onClick(food)}
        >
            <div className=" h-[17rem] flex m-8 max-w-xl bg-white text-white rounded-lg overflow-hidden shadow-lg font-notoTC">
                {/* Image */}
                <div className="w-64 overflow-hidden aspect-[5/3]">
                    {" "}
                    <img
                        src={picture}
                        alt="Dish Image"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="relative w-2/3 p-4">
                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-2 text-black">
                        {name}
                    </h2>

                    {/* Price */}
                    <p className="text-xl text-gray-800">${price}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 text-ellipsis">{description}</p>

                    {/* Add button */}
                    {authToken && ( // Only visible when the user is logged in
                        <div className="flex justify-end mt-4 absolute bottom-[15px] right-[15px]">
                            <button className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-2xl font-bold mb-1">+</span>
                            </button>
                        </div>
                    )}
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
