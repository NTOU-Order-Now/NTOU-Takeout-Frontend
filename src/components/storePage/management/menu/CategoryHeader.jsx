import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
const CategoryHeader = ({ categoryData, onUpdateName, menuId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(categoryData.categoryName);

    const handleSubmit = () => {
        onUpdateName(menuId, ...categoryData);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center mb-5">
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className="border-b-2 border-gray-400 focus:outline-none text-2xl font-notoTC font-bold"
                    autoFocus
                />
            ) : (
                <p className="text-2xl font-notoTC mt-3 mb-3 font-bold">
                    {newName}
                </p>
            )}
            <FontAwesomeIcon
                className="ml-2 cursor-pointer"
                icon={faEdit}
                onClick={() => setIsEditing(true)}
            />
        </div>
    );
};

CategoryHeader.propTypes = {
    categoryData: PropTypes.string.isRequired,
    onUpdateName: PropTypes.func.isRequired,
    menuId: PropTypes.string.isRequired,
};
export default CategoryHeader;
