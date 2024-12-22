import PropTypes from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DishOptionGroup from "./DishOptionGroup.jsx";

const DishOptionList = ({ groups, onGroupsChange }) => {
    const handleDeleteGroup = (groupIndex) => {
        const newGroups = groups.filter((_, i) => i !== groupIndex);
        onGroupsChange(newGroups);
    };
    const handleUpdateGroup = (groupIndex, updatedGroup) => {
        const newGroups = groups.map((grp, i) =>
            i === groupIndex ? updatedGroup : grp,
        );
        onGroupsChange(newGroups);
    };

    const handleAddGroup = () => {
        const newGroup = {
            name: "新選項標題",
            description: "",
            type: "single",
            isRequired: false,
            attributeOptions: [],
        };
        onGroupsChange([...groups, newGroup]);
    };

    return (
        <div className="p-4 bg-white mt-4">
            {groups.map((group, index) => (
                <DishOptionGroup
                    key={index}
                    groupIndex={index}
                    group={group}
                    onUpdateGroup={(updatedGroup) =>
                        handleUpdateGroup(index, updatedGroup)
                    }
                    onDeleteGroup={() => handleDeleteGroup(index)}
                />
            ))}
            {/* Add Group button */}
            <div className="flex justify-center mt-6 z-50">
                <button
                    className="text-orange-500 hover:text-orange-700 flex items-center"
                    onClick={handleAddGroup}
                >
                    <FontAwesomeIcon icon={faPlus} size="lg" className="mr-2" />
                    新增客製化選項
                </button>
            </div>
        </div>
    );
};

DishOptionList.propTypes = {
    groups: PropTypes.array.isRequired,
    onGroupsChange: PropTypes.func.isRequired,
};

export default DishOptionList;
