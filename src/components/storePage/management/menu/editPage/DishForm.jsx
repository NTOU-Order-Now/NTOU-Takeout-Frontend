import PropTypes from "prop-types";
import useEditDishStore from "../../../../../stores/EditDishStore";

const DishForm = ({
    defaultName,
    defaultDescription,
    defaultPrice,
    defaultCategory,
    onImageUpload,
}) => {
    // 获取 zustand 的方法
    const updateDishDescription = useEditDishStore(
        (state) => state.updateDishDescription,
    );
    const updateDishName = useEditDishStore((state) => state.updateDishName);
    const updateDishPrice = useEditDishStore((state) => state.updateDishPrice);
    const updateDishCategory = useEditDishStore(
        (state) => state.updateDishCategory,
    );

    // 输入框和文本框的 `onChange` 事件监听
    const handleNameChange = (e) => {
        updateDishName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        updateDishDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        updateDishPrice(Number(e.target.value));
    };

    const handleCategoryChange = (e) => {
        updateDishCategory(e.target.value);
    };

    return (
        <div className="mt-10 p-6 bg-white">
            {/* 名稱輸入 */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">名稱：</label>
                <input
                    type="text"
                    defaultValue={defaultName}
                    placeholder="請輸入名稱"
                    className="w-full px-3 py-2 bg-orange-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleNameChange}
                />
            </div>

            {/* 商品描述 */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    商品描述：
                </label>
                <textarea
                    defaultValue={defaultDescription}
                    placeholder="請輸入商品描述"
                    className="w-full h-24 px-3 py-2 bg-orange-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleDescriptionChange}
                ></textarea>
            </div>

            {/* 圖片 */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">圖片：</label>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="請選擇圖片"
                        readOnly
                        className="flex-1 px-3 py-2 bg-orange-100 rounded-md focus:outline-none mr-2"
                    />
                    <button
                        onClick={onImageUpload}
                        className="flex-shrink-0 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                    >
                        上傳圖片
                    </button>
                </div>
            </div>

            {/* 價格 */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">價格：</label>
                <input
                    type="number"
                    defaultValue={defaultPrice}
                    placeholder="請輸入價格"
                    className="w-full px-3 py-2 bg-orange-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handlePriceChange}
                />
            </div>

            {/* 類別 */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">類別：</label>
                <input
                    type="text"
                    defaultValue={defaultCategory}
                    placeholder="請輸入類別"
                    className="w-full px-3 py-2 bg-orange-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleCategoryChange}
                />
            </div>
        </div>
    );
};

DishForm.propTypes = {
    defaultName: PropTypes.string,
    defaultDescription: PropTypes.string,
    defaultPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultCategory: PropTypes.string,
    onImageUpload: PropTypes.func,
};

export default DishForm;
