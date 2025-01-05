import PropTypes from "prop-types";
import EditHeader from "./EditHeader";
import DishForm from "./DishForm";
import DishOptionList from "./DishOptionList";
import { useState } from "react";
import menuStore from "../../../../../stores/pos/menuStore.js";
import { useUpdateDishMutation } from "@/hooks/store/useUpdateDishMutation.jsx";

function DishEdit({ onClose, categoryNames, menuId }) {
    const dishData = menuStore((state) => state.selectedDish);
    const [name, setName] = useState(dishData.name);
    const [description, setDescription] = useState(dishData.description);
    const [price, setPrice] = useState(dishData.price);
    const [categoryName, setCategoryName] = useState(dishData.category);
    const [groups, setGroups] = useState(dishData.dishAttributes);
    const [dishImage, setDishImage] = useState(dishData.picture);

    const handleImageChange = ({ url }) => {
        if (url) {
            setDishImage(url);
        }
    };
    const { updateDish, isPending } = useUpdateDishMutation(menuId);
    const handleSave = async () => {
        const picture = dishImage;
        const newDish = {
            id: dishData.id,
            name,
            description,
            picture,
            price,
            category: categoryName,
            dishAttributes: groups,
        };
        try {
            await updateDish(newDish);
            onClose();
        } catch (error) {
            console.error("更新失敗：", error);
        }
    };

    const handleBack = () => {
        onClose();
    };

    const handleGroupsChange = (updatedGroups) => {
        setGroups(updatedGroups);
    };

    return (
        <div>
            <EditHeader
                dishName={name}
                onBack={handleBack}
                onSave={handleSave}
                isPending={isPending}
            />
            <DishForm
                defaultName={name}
                defaultDescription={description}
                defaultPrice={price}
                defaultImage={dishImage}
                defaultCategory={categoryName}
                categoryNames={categoryNames}
                onNameChange={setName}
                onDescriptionChange={setDescription}
                onPriceChange={setPrice}
                onCategoryChange={setCategoryName}
                onImageChange={handleImageChange}
            />
            <DishOptionList
                groups={groups}
                onGroupsChange={handleGroupsChange}
            />
        </div>
    );
}

DishEdit.propTypes = {
    onClose: PropTypes.func.isRequired,
    categoryNames: PropTypes.arrayOf(PropTypes.string),
    menuId: PropTypes.string.isRequired,
};

export default DishEdit;
