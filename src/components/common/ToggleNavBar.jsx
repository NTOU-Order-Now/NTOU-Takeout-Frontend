import { useEffect } from "react";
import { useActiveTabStore } from "@/stores/common/useActiveTabStore.js";
import PropTypes from "prop-types";

const ToggleNavBar = ({
    options,
    width = "w-full",
    height = "50px",
    InitActiveTab,
    borderGap = "1",
}) => {
    const { activeTab, setActiveTab } = useActiveTabStore();
    useEffect(() => {
        if (InitActiveTab) {
            setActiveTab(InitActiveTab);
        }
    }, [InitActiveTab, setActiveTab]);
    const keys = Object.keys(options);

    // Set the first tab as activeTab
    useEffect(() => {
        if (!activeTab && keys.length > 0) {
            setActiveTab(keys[0]);
            options[keys[0]]();
        }
    }, [activeTab, keys, options, setActiveTab]);

    const activeIndex = keys.findIndex((key) => key === activeTab);
    const itemWidthPercent = 100 / keys.length;

    return (
        <div
            className={`relative rounded-2xl p-1 ${width} bg-zinc-100`}
            style={{ height }}
        >
            <div className="relative w-full h-full flex overflow-hidden rounded-md">
                {/* Highlight bar */}
                <div
                    className="absolute h-full bg-orange-500 transition-transform duration-300 ease-in-out rounded-xl"
                    style={{
                        width: `${itemWidthPercent}%`,
                        transform: `translateX(${activeIndex * 100}%)`,
                    }}
                ></div>

                {keys.map((key) => {
                    const isActive = key === activeTab;
                    return (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveTab(key);
                                options[key]();
                            }}
                            className={`
                                relative flex-1 text-center text-[15px] font-semibold font-notoTC py-1
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
};

ToggleNavBar.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    options: PropTypes.object.isRequired,
    InitActiveTab: PropTypes.string,
    borderGap: PropTypes.string,
};

export default ToggleNavBar;
