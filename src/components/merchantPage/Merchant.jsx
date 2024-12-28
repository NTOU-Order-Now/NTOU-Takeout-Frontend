import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons/faStar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Merchant = (props) => {
    const { id, name, averageSpend, rating, picture, reviews } = props;

    // const randomDistance = Math.floor(Math.random() * 30) + 1;
    const randomDistance = 10;
    return (
        <Link key={id} to={`/menu/${id}`}>
            <div className="font-notoTC relative  h-60 bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="object-cover w-full h-full">
                    <LazyLoadImage
                        src={picture}
                        alt={name}
                        effect="blur"
                        className="relative w-full h-[65%] object-cover"
                        wrapperClassName="object-cover w-full h-full"
                    />
                </div>

                <div className="absolute  h-[87px] w-full top-[154px] border-gray-300 mt-1 ">
                    <div className="flex flex-col">
                        <div className="absolute h-[22px] left-[12px] top-[9px] text-black font-bold text-lg leading-5 line-clamp-3 overflow-hidden break-words transition">
                            {name}
                        </div>
                        <div className="absolute h-[12px] left-[12px] top-[32px] text-gray-500 font-semibold text-xs leading-[12px]">
                            距離您約 {randomDistance} 公里
                        </div>
                    </div>
                    <div className="flex flex-row w-full relative justify-between -bottom-14 items-center mx-4 ">
                        <div className=" text-green-700 font-bold text-xs leading-[12px]">
                            平均花費約 {Math.floor(averageSpend)} 元
                        </div>

                        <div className="flex flex-row mr-7">
                            <FontAwesomeIcon
                                icon={solidStar}
                                style={{ color: "#FFD43B" }}
                                className="h-[0.80em] w-[0.80em] "
                            />
                            <span className="font-medium text-[13px] leading-[15px] text-gray-600 mb-[-1px]">
                                {rating.toFixed(1)} ({reviews.length})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
Merchant.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // distance: PropTypes.string.isRequired,
    averageSpend: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
};
export default Merchant;
