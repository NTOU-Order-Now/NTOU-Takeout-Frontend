import PropTypes from "prop-types";

function DishToggleNavBar({ options, selectedOption, onChange }) {
    const keys = Object.keys(options);
    const activeIndex = keys.findIndex((key) => key === selectedOption);
    const itemWidthPercent = 100 / keys.length;

    return (
        <div
            className="relative border border-gray-300 rounded-2xl p-1 w-full"
            style={{ height: "50px" }}
        >
            <div className="relative w-full h-full flex overflow-hidden rounded-xl">
                <div
                    className="absolute h-full bg-orange-500 transition-transform duration-300 ease-in-out rounded-xl"
                    style={{
                        width: `${itemWidthPercent}%`,
                        transform: `translateX(${activeIndex * 100}%)`,
                    }}
                ></div>
                {keys.map((key) => {
                    const isActive = key === selectedOption;
                    return (
                        <button
                            key={key}
                            onClick={() => onChange(key)}
                            className={`
                                relative flex-1 text-center text-lg font-bold 
                                transition-colors duration-300 ease-in-out z-10
                                ${isActive ? "text-white" : "text-black"}
                            `}
                        >
                            {key}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

DishToggleNavBar.propTypes = {
    options: PropTypes.object.isRequired,
    selectedOption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default DishToggleNavBar;
