import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DishOptionItem = ({ option, onDelete, onUpdate }) => {
    // 針對 option 的單筆資料進行編輯
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current && (isEditingName || isEditingPrice)) {
            inputRef.current.focus();
        }
    }, [isEditingName, isEditingPrice]);

    const handleNameSave = (e) => {
        const newValue = e.target.value;
        if (e.type === "keydown" && e.key !== "Enter") return;
        setIsEditingName(false);
        onUpdate({ name: newValue });
    };

    const handlePriceSave = (e) => {
        const newValue = e.target.value;
        if (e.type === "keydown" && e.key !== "Enter") return;
        setIsEditingPrice(false);
        onUpdate({ extraCost: parseFloat(newValue) || 0 });
    };

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
                {/* Option Name */}
                {isEditingName ? (
                    <input
                        ref={inputRef}
                        type="text"
                        defaultValue={option.name}
                        onBlur={handleNameSave}
                        onKeyDown={handleNameSave}
                        className="border rounded px-2 py-1 text-sm focus:ring-orange-400"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditingName(true)}
                        className="cursor-pointer hover:underline"
                    >
                        {option.name}
                    </span>
                )}

                {/* Option Price */}
                {isEditingPrice ? (
                    <input
                        ref={inputRef}
                        type="number"
                        defaultValue={option.extraCost}
                        onBlur={handlePriceSave}
                        onKeyDown={handlePriceSave}
                        className="border rounded px-2 py-1 text-sm focus:ring-orange-400"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditingPrice(true)}
                        className="px-3 border rounded-xl text-black border-black cursor-pointer hover:underline"
                    >
                        + {option.extraCost}元
                    </span>
                )}
            </div>

            <button
                className="text-red-400 hover:text-red-700"
                onClick={onDelete}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

DishOptionItem.propTypes = {
    option: PropTypes.shape({
        name: PropTypes.string.isRequired,
        extraCost: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default DishOptionItem;
