import { useState, lazy } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faShareNodes,
    faStar,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const MenuInfo = lazy(() => import("./MenuInfo"));
const MenuHeader = ({ merchantData }) => {
    const {
        name,
        distance = 10,
        avarageSpend,
        rating,
        reviewIdList,
        picture,
        id,
    } = merchantData;
    const merchantId = id;
    const [showMenuInfo, setShowMenuInfo] = useState(false);

    return (
        <div >
            <div className="relative h-56 z-0">
                <LazyLoadImage
                    src={picture}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    effect="blur"
                    wrapperClassName="absolute inset-0 z"
                />
                {/* Return button */}
                <Link to={`/`}>
                    <div className="pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                        <FontAwesomeIcon icon={faArrowLeft} className="text-slate-800" />
                    </div>
                </Link>
                {/* Share button */}
                <div className="pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                    <FontAwesomeIcon icon={faShareNodes} className="text-slate-800" />
                </div>
            </div>
            {/* Store information */}
            <div className="relative z-20 bg-white rounded-t-2xl px-4 pt-4 -mt-8 font-notoTC">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col bg-green">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-gray-400 text-sm">
                            距離您約
                            {distance}
                            公里
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                            平均花費約{avarageSpend}元
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-xl text-gray-500 ">
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                onClick={() => setShowMenuInfo(true)}
                                className="cursor-pointer"
                            />
                        </div>
                        <Link to={`/menu/${merchantId}/review`}>
                            {" "}
                            <div className="flex items-center mt-3">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="text-yellow-400 ml-2 mt-1"
                                />
                                <span className="text-xl font-semibold">
                                    &nbsp;{rating}
                                </span>
                                <span className="text-gray-400 ml-1 mt-0.5">
                                    (
                                    <span className="border-b border-gray-400">
                                        {reviewIdList.length}+
                                    </span>
                                    )
                                </span>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
            {showMenuInfo && (
                <MenuInfo
                    merchantData={merchantData}
                    onClose={() => setShowMenuInfo(false)}
                />
            )}
        </div>
    );
};

MenuHeader.propTypes = {
    merchantData: PropTypes.object.isRequired,
};

export default MenuHeader;
