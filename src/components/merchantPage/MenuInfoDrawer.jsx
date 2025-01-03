import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faMapMarkerAlt,
    faPhone,
    faClock,
    faCoins,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

const MenuInfoDrawer = ({ merchantData }) => {
    const {
        name,
        description,
        rating,
        address,
        phoneNumber,
        averageSpend,
        businessHours,
    } = merchantData;
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
        <Drawer>
            <DrawerTrigger asChild>
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="cursor-pointer"
                />
            </DrawerTrigger>
            <DrawerContent className="h-[570px] ">
                <DrawerHeader className="text-left">
                    <DrawerTitle>{name}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4">
                    <div className="flex flex-col font-notoTC w-full text-left">
                        <div className="flex items-center mt-1">
                            <div className="text-[13px] leading-[15px] text-gray-600 mb-[-1px]">
                                {rating.toFixed(1)}
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
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="w-4 h-4 mr-2"
                            />
                            電話號碼：{phoneNumber}
                        </div>

                        <div className="flex flex-col items-start mt-2 mb-2">
                            <div className="mb-4 flex">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="w-4 h-4 mr-2 mt-2"
                                />
                                <ul>
                                    {businessHours.map((day, dayIndex) => (
                                        <li key={dayIndex} className="text-lg">
                                            <p className="mr-2">
                                                {daysOfWeek[dayIndex]}
                                            </p>
                                            {day.map((slot, slotIndex) => (
                                                <span key={slotIndex}>
                                                    {slot.first.substring(0, 5)}{" "}
                                                    ~{" "}
                                                    {slot.second.substring(
                                                        0,
                                                        5,
                                                    )}
                                                    {slotIndex <
                                                        day.length - 1 && (
                                                        <span className="mx-1">
                                                            ,
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faCoins}
                                className="w-4 h-4 mr-2"
                            />
                            <span>
                                每人 {costDownLimit} ~ {costUpLimit} 元
                            </span>
                        </div>
                    </div>
                </div>

                <DrawerFooter className="mt-auto">
                    <DrawerClose asChild>
                        <Button className="font-notoTC">關閉</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

MenuInfoDrawer.propTypes = {
    merchantData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MenuInfoDrawer;
