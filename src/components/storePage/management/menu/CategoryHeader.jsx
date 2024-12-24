import { useEffect, useState } from "react";
import { Edit2, Save } from "lucide-react";
import PropTypes from "prop-types";
import { useCategoryNameMutation } from "../../../../hooks/store/useCategoryNameMutation.jsx";
const CategoryHeader = ({ categoryData, menuId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(
        categoryData?.categoryName || "未命名類別",
    );
    const { changeCategoryName } = useCategoryNameMutation(menuId);
    // 當 categoryData 改變時更新 newName
    useEffect(() => {
        setNewName(categoryData?.categoryName || "未命名類別");
    }, [categoryData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
            newName.trim() !== "" &&
            newName.trim() !== categoryData?.categoryName
        ) {
            try {
                await changeCategoryName({
                    oldCategoryName: categoryData?.categoryName,
                    newCategoryName: newName.trim(),
                });
            } catch (error) {
                console.error("Failed to update category name:", error);
            }
        } else if (newName.trim() === "") {
            alert("不可為空");
        }
        setIsEditing(false);
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await handleSubmit(e);
        } else if (e.key === "Escape") {
            setNewName(categoryData?.categoryName || "未命名類別");
            setIsEditing(false);
        }
    };

    const handleEditClick = () => {
        if (isEditing) {
            handleSubmit();
        } else {
            setIsEditing(true);
        }
    };

    return (
        <div className="flex items-center gap-2 py-3 ">
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                    className="border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none text-2xl font-bold px-1 bg-transparent h-10 w-full"
                    autoFocus
                />
            ) : (
                <h2 className="text-2xl font-bold h-10 flex items-center px-1">
                    {categoryData?.categoryName || "未命名類別"}
                </h2>
            )}

            <button
                onClick={handleEditClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors right-3 relative"
                title={isEditing ? "儲存" : "編輯"}
            >
                {isEditing ? (
                    <Save className="w-5 h-5 text-blue-600" />
                ) : (
                    <Edit2 className="w-5 h-5 text-gray-600" />
                )}
            </button>
        </div>
    );
};

CategoryHeader.propTypes = {
    categoryData: PropTypes.shape({
        categoryName: PropTypes.string,
        dishes: PropTypes.array,
    }),
    menuId: PropTypes.string.isRequired,
};
export default CategoryHeader;
