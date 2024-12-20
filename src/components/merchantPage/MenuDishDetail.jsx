import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useDishDetailStore from "../../stores/dishDetailStore";
import PropTypes from "prop-types";
import userInfoStore from "../../stores/user/userInfoStore.js";

const OptionCardSkeleton = lazy(
    () => import("../../skeleton/menu/dishDetail/OptionCardSkeleton"),
);
const CartRemark = lazy(() => import("../cartPage/CartRemark"));
const OptionCard = lazy(() => import("./dishOptions/OptionCard"));
const CartOption = lazy(() => import("./dishOptions/CartOption"));
const DishDetail = ({ dishData, onClose }) => {
    const {
        id: dishId,
        name,
        price,
        picture: imageUrl,
        description,
        dishAttributes: options,
    } = dishData;

    const { merchantId } = useParams();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isShowError, setIsShowError] = useState(true);
    const setDishDetail = useDishDetailStore((state) => state.setDishDetail);
    const setAllDishAttributes = useDishDetailStore(
        (state) => state.setAllDishAttributes,
    );
    const user = userInfoStore((state) => state.user);
    const optionCardRefs = useRef([]);
    const [remark, setRemark] = useState("");

    useEffect(() => {
        setAllDishAttributes(dishId, options);
        setDishDetail(dishId, {
            storeId: merchantId,
            dishId: dishId,
            dishName: name,
            price: price,
            quantity: 1,
            note: remark,
            chosenAttributes: [],
        });

        setIsVisible(true);
        document.body.style.overflow = "hidden"; // forbid background scroll

        return () => {
            document.body.style.overflow = ""; // restore background scroll
        };
    }, [
        setDishDetail,
        dishId,
        merchantId,
        options,
        setAllDishAttributes,
        name,
        price,
        remark,
    ]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false); // hide the modal
            document.body.style.overflow = ""; // restore background scroll
            if (onClose) onClose();
        }, 500);
    };

    // handle scroll to the OptionCard that has required missing
    const handleRequiredMissing = (missingAttributeName) => {
        // find the index of the missing attribute
        const index = options.findIndex(
            (opt) => opt.name === missingAttributeName,
        );
        if (index !== -1 && optionCardRefs.current[index]) {
            optionCardRefs.current[index].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // handle scroll to the next OptionCard for better user experience
    const handleSelectNext = (currentIndex) => {
        const nextIndex = currentIndex + 1;
        if (optionCardRefs.current[nextIndex]) {
            optionCardRefs.current[nextIndex].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    return (
        <div className={`font-notoTC fixed z-10 top-0 left-0 right-0`}>
            <div
                className={`bg-white shadow-md overflow-hidden h-dvh flex flex-col  transition-transform duration-500 ${isExiting ? "translate-y-full none" : "translate-y-0"}
                                                                                                                            ${isVisible ? "translate-y-0" : "translate-y-full none"}`}
            >
                <div className="flex-1 overflow-y-auto">
                    {/* Top image */}
                    <div className="relative h-48 overflow-hidden">
                        <LazyLoadImage
                            className="w-full h-full object-cover"
                            src={imageUrl}
                            alt={name}
                            effect="blur"
                            wrapperClassName="absolute inset-0"
                        />

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                        >
                            <FontAwesomeIcon icon={faX} className="text-sm" />
                        </button>
                    </div>

                    {/* Dish info */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-lg text-gray-700">${price}</p>
                        <p className="text-sm text-gray-500">{description}</p>

                        {/* Customize options */}
                        {options.map((detail, index) => (
                            <div
                                key={index}
                                ref={(el) =>
                                    (optionCardRefs.current[index] = el)
                                }
                            >
                                <Suspense fallback={<OptionCardSkeleton />}>
                                    <OptionCard
                                        title={detail.name}
                                        description={detail.description}
                                        options={detail.attributeOptions}
                                        type={detail.type}
                                        dishId={dishId}
                                        isRequired={detail.isRequired}
                                        isShowError={isShowError}
                                        setIsShowError={setIsShowError}
                                        onSelectNext={() =>
                                            handleSelectNext(index)
                                        }
                                    />
                                </Suspense>
                            </div>
                        ))}
                        <div className="pb-12">
                            <CartRemark onRemarkChange={setRemark} />
                        </div>
                    </div>
                    <div className="py-5"></div>
                </div>
                {/* Add to cart button */}
                {user !== undefined && user.role === "CUSTOMER" && (
                    <CartOption
                        dishId={dishId}
                        dishAttributes={options}
                        onRequiredMissing={handleRequiredMissing}
                        onClose={handleClose}
                    />
                )}
            </div>
        </div>
    );
};

DishDetail.propTypes = {
    dishData: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    dishId: PropTypes.string,
};

export default DishDetail;
