import { useEffect, useState } from "react";
import { Edit2, Save } from "lucide-react";
import PropTypes from "prop-types";
import { useUpdateDishMutation } from "../../../../hooks/store/useUpdateDishMutation.jsx";
const CategoryHeader = ({ categoryData, menuId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(
        categoryData?.categoryName || "未命名類別",
    );
    const { updateDish } = useUpdateDishMutation(menuId);
    // console.debug("categoryData", categoryData);
    // 當 categoryData 改變時更新 newName
    useEffect(() => {
        setNewName(categoryData?.categoryName || "未命名類別");
    }, [categoryData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (newName.trim() !== "") {
            let dishes = categoryData.dishes;
            dishes = dishes.map((dish) => ({
                ...dish,
                category: newName.trim(),
            }));
            const updatedData = dishes;
            console.debug("dishes", dishes);
            try {
                await updateDish(dishes);
                setIsEditing(false);
            } catch (error) {
                console.error("Failed to update category name:", error);
            }
        } else {
            alert("不可為空");
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await handleSubmit();
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
        <div className="flex items-center gap-2 py-3">
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                    className="border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none text-2xl font-bold px-1 bg-transparent h-10"
                    autoFocus
                />
            ) : (
                <h2 className="text-2xl font-bold h-10 flex items-center px-1">
                    {categoryData?.categoryName || "未命名類別"}
                </h2>
            )}

            <button
                onClick={handleEditClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
