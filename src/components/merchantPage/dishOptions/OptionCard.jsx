import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import useDishDetailStore from "../../../stores/dishDetailStore";
import PropTypes from "prop-types";

const OptionCard = ({
    title,
    description,
    options = [],
    type,
    dishId,
    isRequired,
    onSelectNext,
}) => {
    const addChosenAttribute = useDishDetailStore(
        (state) => state.addChosenAttribute,
    );
    const removeChosenAttributeOption = useDishDetailStore(
        (state) => state.removeChosenAttributeOption,
    );
    const sortChosenAttributes = useDishDetailStore(
        (state) => state.sortChosenAttributes,
    );
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isError, setIsError] = useState(false);

    //handle error is show
    useEffect(() => {
        if (isRequired && selectedOptions.length === 0) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [selectedOptions, isRequired, setIsError]);

    const handleCheckboxChange = (option, index) => {
        let updatedOptions = [...selectedOptions];
        const optionId = `${option.name}-${index}`;
        if (type === "single") {
            updatedOptions = [optionId];
            //remove all other options from store
            options.forEach((o, i) => {
                if (i !== index) {
                    removeChosenAttributeOption(dishId, title, o.name);
                }
            });
            //update store with selected option
            addChosenAttribute(dishId, {
                attributeName: title,
                chosenOption: option.name,
                extraCost: option.extraCost || 0,
            });
            onSelectNext();
        } else {
            if (updatedOptions.includes(optionId)) {
                updatedOptions = updatedOptions.filter((id) => id !== optionId);
                //remove option from store
                removeChosenAttributeOption(dishId, title, optionId);
            } else {
                updatedOptions.push(optionId);
                //update store with selected option
                addChosenAttribute(dishId, {
                    attributeName: title,
                    chosenOption: option.name,
                    extraCost: option.extraCost || 0,
                });
            }
        }

        sortChosenAttributes(dishId);
        setSelectedOptions(updatedOptions);
    };

    return (
        <div className="border rounded-lg p-4 max-w-sm mx-auto mb-8 mt-8 font-notoTC">
            <h3 className="text-lg font-semibold "> {title}</h3>
            {isRequired && (
                <p
                    className={`text-xs font-bold ${isError ? "text-red-500" : "text-gray-500"}`}
                >
                    {"必選"}
                </p>
            )}
            <p className="text-sm text-gray-500">{description}</p>

            <div className="mt-4 space-y-2">
                {options.map((option, index) => (
                    <label
                        key={`${option.name}-${index}`}
                        className="block cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedOptions.includes(
                                `${option.name}-${index}`,
                            )} // render checkbox based on selection
                            onChange={() => handleCheckboxChange(option, index)} // handle checkbox change
                        />
                        <span className="flex items-center justify-between">
                            <span className="flex items-center">
                                <FontAwesomeIcon
                                    icon={
                                        selectedOptions.includes(
                                            `${option.name}-${index}`,
                                        )
                                            ? faCheckSquare
                                            : faSquare
                                    }
                                    className="text-gray-500 mr-2"
                                />
                                {option.name}
                            </span>
                            <span className="text-gray-600">
                                {option.extraCost > 0
                                    ? `+${option.extraCost}元`
                                    : "免費"}
                            </span>
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

OptionCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            extraCost: PropTypes.number,
        }),
    ),
    type: PropTypes.oneOf(["single", "multiple"]),
    dishId: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    isShowError: PropTypes.bool,
    setIsShowError: PropTypes.func,
    onSelectNext: PropTypes.func,
};

export default OptionCard;
