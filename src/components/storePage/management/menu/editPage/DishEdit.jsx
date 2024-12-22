import PropTypes from "prop-types";
import EditHeader from "./EditHeader";
import DishForm from "./DishForm";
import DishOptionList from "./DishOptionList";
import { useState } from "react";
import menuStore from "../../../../../stores/pos/menuStore.js";
import { useUpdateDishMutation } from "../../../../../hooks/store/useUpdateDishMutation.jsx";

function DishEdit({ onClose, categoryNames, menuId }) {
    const dishData = menuStore((state) => state.selectedDish);
    const [name, setName] = useState(dishData.name);
    const [description, setDescription] = useState(dishData.description);
    const [price, setPrice] = useState(dishData.price);
    const [categoryName, setCategoryName] = useState(dishData.category);
    const [groups, setGroups] = useState(dishData.dishAttributes);

    const { updateDish, isPending } = useUpdateDishMutation(menuId);
    const handleSave = async () => {
        const picture = //temp picture
            "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
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

    const handleImageUpload = () => {
        console.log("Image upload");
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
                defaultCategory={categoryName}
                categoryNames={categoryNames}
                onImageUpload={handleImageUpload}
                onNameChange={setName}
                onDescriptionChange={setDescription}
                onPriceChange={setPrice}
                onCategoryChange={setCategoryName}
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
