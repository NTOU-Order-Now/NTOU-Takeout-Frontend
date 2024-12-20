import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleNavBar from "../../../../common/ToggleNavBar";
import useEditDishStore from "../../../../../stores/EditDishStore";

const DishOptionList = ({ group, groupIndex, onDeleteGroup }) => {
    const setGroup = useEditDishStore((state) => state.setAttribute);

    const [options, setOptions] = useState(group.attributeOptions);
    const [groupName, setGroupName] = useState(group.name);

    const [isEditingGroupName, setIsEditingGroupName] = useState(false);
    const [editingOptionIndex, setEditingOptionIndex] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [isSingleSelect, setIsSingleSelect] = useState(group.type);
    const [isNeedSelect, setIsNeedSelect] = useState(group.isRequired);

    const inputRef = useRef(null);

    const dish = useEditDishStore((state) => state.dish);
    const updateGroupName = useEditDishStore(
        (state) => state.updateAttributeName,
    );

    useEffect(() => {
        setGroup(groupIndex, {
            name: groupName,
            attributeOptions: options,
            type: isSingleSelect ? "single" : "multiple",
            isRequired: isNeedSelect ? true : false,
        });
    }, [
        options,
        groupName,
        isSingleSelect,
        groupIndex,
        setGroup,
        isNeedSelect,
    ]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingOptionIndex, editingField]);

    const handleDeleteOption = (index) => {
        setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    };

    const handleOptionSave = (e, index) => {
        const newValue = e.target.value;
        if (e.type === "keydown" && e.key !== "Enter") {
            return;
        }
        setOptions((prevOptions) =>
            prevOptions.map((option, i) =>
                i === index
                    ? {
                          ...option,
                          [editingField]:
                              editingField === "price"
                                  ? parseFloat(newValue) || 0
                                  : newValue,
                      }
                    : option,
            ),
        );
        setEditingOptionIndex(null);
        setEditingField(null);
    };

    const extraCostSave = (e, index) => {
        const newValue = e.target.value;
        if (e.type === "keydown" && e.key !== "Enter") {
            return;
        }
        setOptions((prevOptions) =>
            prevOptions.map((option, i) =>
                i === index
                    ? {
                          ...option,
                          extraCost: parseFloat(newValue) || 0,
                      }
                    : option,
            ),
        );
        setEditingField(null);
    };

    const handleSetGroupName = (value) => {
        updateGroupName(groupIndex, value);
        setGroupName(value);
    };

    const seleteOptions = {
        單選: () => setIsSingleSelect("single"),
        複選: () => setIsSingleSelect("multiple"),
    };

    const toggleNeedSelect = () => {
        setIsNeedSelect((prevIsNeedSelect) =>
            prevIsNeedSelect ? false : true,
        );
    };

    const handleGroupNameSave = () => {
        handleSetGroupName(groupName);
        setIsEditingGroupName(false);
    };

    return (
        <div className="p-4 bg-white border rounded-lg shadow-md mb-6">
            {/* Group Header */}
            <div className="flex justify-between items-center mb-4">
                {isEditingGroupName ? (
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleGroupNameSave();
                            }
                        }}
                        className="border rounded px-2 py-1 text-lg font-bold focus:ring-orange-500 focus:outline-none"
                    />
                ) : (
                    <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-lg">{groupName}</h3>
                        <span
                            className={`px-2 py-1 rounded-lg text-white text-sm cursor-pointer ${
                                isNeedSelect ? "bg-red-500" : "bg-gray-500"
                            }`}
                            onClick={toggleNeedSelect}
                        >
                            {"必選"}
                        </span>
                    </div>
                )}

                <div className="flex space-x-2">
                    <button
                        className="text-orange-500 hover:text-orange-700 text-xl"
                        onClick={() => {
                            if (isEditingGroupName) {
                                // 點擊存檔按鈕時儲存
                                handleGroupNameSave();
                            } else {
                                // 如果不在編輯，點擊則進入編輯模式
                                setIsEditingGroupName(true);
                            }
                        }}
                    >
                        <FontAwesomeIcon
                            icon={isEditingGroupName ? faSave : faEdit}
                            size="base"
                        />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={onDeleteGroup}
                    >
                        <FontAwesomeIcon icon={faTrash} size="base" />
                    </button>
                </div>
            </div>

            {/* Options */}
            {options.map((option, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                >
                    <div className="flex items-center space-x-4">
                        {editingOptionIndex === index &&
                        editingField === "name" ? (
                            <input
                                ref={inputRef}
                                type="text"
                                defaultValue={option.name}
                                onBlur={(e) => handleOptionSave(e, index)}
                                onKeyDown={(e) => handleOptionSave(e, index)}
                                className="border rounded px-2 py-1 text-sm focus:ring-orange-400"
                            />
                        ) : (
                            <span
                                onClick={() => {
                                    setEditingOptionIndex(index);
                                    setEditingField("name");
                                }}
                                className="cursor-pointer hover:underline"
                            >
                                {option.name}
                            </span>
                        )}
                        {editingOptionIndex === index &&
                        editingField === "price" ? (
                            <input
                                ref={inputRef}
                                type="number"
                                defaultValue={option.extraCost}
                                onBlur={(e) => extraCostSave(e, index)}
                                onKeyDown={(e) => extraCostSave(e, index)}
                                className="border rounded px-2 py-1 text-sm focus:ring-orange-400"
                            />
                        ) : (
                            <span
                                onClick={() => {
                                    setEditingOptionIndex(index);
                                    setEditingField("price");
                                }}
                                className="px-3 border rounded-xl text-black border-black cursor-pointer hover:underline"
                            >
                                + {option.extraCost}元
                            </span>
                        )}
                    </div>
                    <button
                        className="text-red-400 hover:text-red-700"
                        onClick={() => handleDeleteOption(index)}
                    >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                </div>
            ))}

            {/* Add Option */}
            <button
                className="text-orange-500 mt-2"
                onClick={() =>
                    setOptions((prev) => [
                        ...prev,
                        { name: "新選項", price: 0 },
                    ])
                }
            >
                新增選項...
            </button>

            {/* Toggle Single/Multi Select */}
            <div className="flex justify-end space-x-4 mt-4">
                <div className="flex border-black border-[2px] rounded-2xl overflow-hidden">
                    <ToggleNavBar options={seleteOptions} />
                </div>
            </div>
        </div>
    );
};

DishOptionList.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        attributeOptions: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
            }),
        ).isRequired,
        type: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired,
    }).isRequired,
    groupIndex: PropTypes.number.isRequired,
    onDeleteGroup: PropTypes.func.isRequired,
};

export default DishOptionList;
