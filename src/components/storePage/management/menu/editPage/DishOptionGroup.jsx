import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import DishOptionItem from "./DishOptionItem";
import DishToggleNavBar from "../../../../common/DishToggleNavBar";

/**
 * DishOptionGroup 負責單一 group 的編輯邏輯：名稱、必選、單/複選、刪除 group、以及 options 列表
 */
const DishOptionGroup = ({
    group,
    groupIndex,
    onUpdateGroup,
    onDeleteGroup,
}) => {
    const [isEditingGroupName, setIsEditingGroupName] = useState(false);
    const [groupName, setGroupName] = useState(group.name);
    const [isNeedSelect, setIsNeedSelect] = useState(group.isRequired);
    const [isSingleSelect, setIsSingleSelect] = useState(group.type);
    const [options, setOptions] = useState(group.attributeOptions || []);

    const handleGroupNameSave = () => {
        setIsEditingGroupName(false);
        handleUpdateGroup(); // 重新回傳到父層
    };

    const handleAddOption = () => {
        const newOption = {
            name: "新選項",
            extraCost: 0,
            isChosen: false,
        };
        const updatedOptions = [...options, newOption];
        setOptions(updatedOptions);
        handleUpdateGroup({ attributeOptions: updatedOptions });
    };

    const handleDeleteOption = (optionIndex) => {
        const updatedOptions = options.filter((_, i) => i !== optionIndex);
        setOptions(updatedOptions);
        handleUpdateGroup({ attributeOptions: updatedOptions });
    };

    const handleUpdateOption = (optionIndex, newOptionData) => {
        const updatedOptions = options.map((opt, i) =>
            i === optionIndex ? { ...opt, ...newOptionData } : opt,
        );
        setOptions(updatedOptions);
        handleUpdateGroup({ attributeOptions: updatedOptions });
    };

    // 整合所有變動 & 回傳給父層
    const handleUpdateGroup = (partialData) => {
        const updatedGroup = {
            ...group,
            name: groupName,
            isRequired: isNeedSelect,
            type: isSingleSelect,
            attributeOptions: options,
            ...partialData, // 若有要局部更新的
        };
        onUpdateGroup(updatedGroup);
    };

    // 切換 單/複 選
    const selectOptions = {
        單選: () => {
            setIsSingleSelect("single");
            handleUpdateGroup({ type: "single" });
        },
        複選: () => {
            setIsSingleSelect("multiple");
            handleUpdateGroup({ type: "multiple" });
        },
    };
    const currentSelectedKey = isSingleSelect === "single" ? "單選" : "複選";

    // 切換是否必選
    const toggleNeedSelect = () => {
        const newValue = !isNeedSelect;
        setIsNeedSelect(newValue);
        handleUpdateGroup({ isRequired: newValue });
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
                        <h3 className="font-bold text-xl">{groupName}</h3>
                        <span
                            className={`px-2 py-1 rounded-lg text-white text-sm cursor-pointer ${
                                isNeedSelect ? "bg-red-500" : "bg-gray-500"
                            }`}
                            onClick={toggleNeedSelect}
                        >
                            必選
                        </span>
                    </div>
                )}

                <div className="flex space-x-2">
                    <button
                        className="text-orange-500 hover:text-orange-700 text-xl"
                        onClick={() => {
                            if (isEditingGroupName) {
                                handleGroupNameSave();
                            } else {
                                setIsEditingGroupName(true);
                            }
                        }}
                    >
                        <FontAwesomeIcon
                            icon={isEditingGroupName ? faSave : faEdit}
                        />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={onDeleteGroup}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

            {/* Options 列表 */}
            {options.map((option, index) => (
                <DishOptionItem
                    key={index}
                    option={option}
                    onDelete={() => handleDeleteOption(index)}
                    onUpdate={(newData) => handleUpdateOption(index, newData)}
                />
            ))}

            {/* 新增 Option 按鈕 */}
            <button
                className="text-orange-500 mt-2 text-lg"
                onClick={handleAddOption}
            >
                新增選項...
            </button>

            {/* Toggle Single/Multi Select */}
            <div className="flex justify-end space-x-4 mt-4">
                <div className="flex w-[120px] h-10 overflow-hidden">
                    <DishToggleNavBar
                        options={selectOptions}
                        selectedOption={currentSelectedKey}
                        onChange={(key) => {
                            selectOptions[key]();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

DishOptionGroup.propTypes = {
    group: PropTypes.object.isRequired,
    groupIndex: PropTypes.number.isRequired,
    onUpdateGroup: PropTypes.func.isRequired,
    onDeleteGroup: PropTypes.func.isRequired,
};

export default DishOptionGroup;
