import PropTypes from "prop-types";

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4 px-4">
            <button
                className={`shadow-md px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === "all"
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-500 hover:bg-orange-200"
                }`}
                onClick={() => onCategoryChange("all")}
            >
                全部品項
            </button>
            {categories.map((category) => (
                <button
                    key={category.categoryName}
                    className={`shadow-md px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category.categoryName
                            ? "bg-orange-500 text-white"
                            : "bg-orange-100 text-orange-500 hover:bg-orange-200"
                    }`}
                    onClick={() => onCategoryChange(category.categoryName)}
                >
                    {category.categoryName}
                </button>
            ))}
        </div>
    );
};

CategoryTabs.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            categoryName: PropTypes.string.isRequired,
            dishIds: PropTypes.array.isRequired,
        }),
    ).isRequired,
    activeCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryTabs;
