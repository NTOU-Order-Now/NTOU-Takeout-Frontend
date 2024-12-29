import { useState, lazy } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
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
        averageSpend,
        rating,
        picture,
        id,
    } = merchantData;
    const merchantId = id;
    const [showMenuInfo, setShowMenuInfo] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <div className="relative h-56 z-0">
                <LazyLoadImage
                    src={picture}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    effect="blur"
                    wrapperClassName="absolute inset-0 z"
                />
                {/* Return button */}
                <button
                    className="pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-slate-800"
                    />
                </button>
                {/* Share button */}
                <div className="pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                    <FontAwesomeIcon
                        icon={faShareNodes}
                        className="text-slate-800"
                    />
                </div>
            </div>
            {/* Store information */}
            <div className="relative z-10 bg-white rounded-t-2xl px-4 pt-4 -mt-8 font-notoTC">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col bg-green">
                        <h2 className="text-xl font-bold mb-5">{name}</h2>
                        <p className="text-gray-400 text-sm">
                            距離您約
                            {distance}
                            公里
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                            平均花費約{Math.floor(averageSpend)}元
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-xl text-gray-500 mb-5">
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                onClick={() => setShowMenuInfo(true)}
                                className="cursor-pointer"
                            />
                        </div>
                        <Link to={`/menu/${merchantId}/review`}>
                            <div className="flex flex-row items-center justify-end">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    size="xs"
                                    className="text-yellow-400"
                                />
                                <span className="font-semibold text-xs">
                                    &nbsp;{rating.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-gray-400 ml-1  underline text-xs">
                                查看評論
                            </span>
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
    merchantData: PropTypes.object,
};

export default MenuHeader;
