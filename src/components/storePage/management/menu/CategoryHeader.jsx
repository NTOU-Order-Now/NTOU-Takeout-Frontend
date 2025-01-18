import { useEffect, useState } from "react";
import { Edit2, Save } from "lucide-react";
import PropTypes from "prop-types";
import { useCategoryNameMutation } from "@/hooks/store/useCategoryNameMutation.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast.js";
const CategoryHeader = ({ categoryName, menuId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(categoryName || "未命名類別");

    const { changeCategoryName } = useCategoryNameMutation(menuId);
    const queryClient = useQueryClient();
    const menuCategoryList = queryClient.getQueryData([
        "menuCategoryList",
        menuId,
    ]);
    useEffect(() => {
        setNewName(categoryName || "未命名類別");
    }, [categoryName]);

    const { toast } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
            menuCategoryList.find(
                (category) => category.categoryName === newName,
            )
        ) {
            toast({
                title: "類別名稱不可重複",
                description: "類別名稱必須不重複，請重新設定",
                variant: "destructive",
            });
            return;
        }
        if (newName.trim() !== "" && newName.trim() !== categoryName) {
            try {
                await changeCategoryName({
                    oldCategoryName: categoryName,
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
            setNewName(categoryName || "未命名類別");
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
                    {categoryName || "未命名類別"}
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
    categoryName: PropTypes.string.isRequired,
    menuId: PropTypes.string.isRequired,
};
export default CategoryHeader;
