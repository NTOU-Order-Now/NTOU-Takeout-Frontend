import PropTypes from "prop-types";
const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
        const formattedHour = hour.toString().padStart(2, "0");
        options.push(
            <option key={`${hour}:00`} value={`${formattedHour}:00`}>
                {`${formattedHour}:00`}
            </option>,
        );
        options.push(
            <option key={`${hour}:30`} value={`${formattedHour}:30`}>
                {`${formattedHour}:30`}
            </option>,
        );
    }
    return options;
};
const TimeRangeSelector = ({ value, onChange, label }) => {
    const formatTime = (time) => {
        if (!time) return "";
        // 如果時間包含秒數，去掉秒數部分
        return time.split(":").slice(0, 2).join(":");
    };
    return (
        <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">{label}</div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">
                        開始時間
                    </label>
                    <select
                        value={formatTime(value?.first)}
                        onChange={(e) => onChange("start", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     text-gray-700 bg-white text-sm"
                    >
                        <option value="">選擇時間</option>
                        {generateTimeOptions()}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">
                        結束時間
                    </label>
                    <select
                        value={formatTime(value?.second)}
                        onChange={(e) => onChange("end", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     text-gray-700 bg-white text-sm"
                    >
                        <option value="">選擇時間</option>
                        {generateTimeOptions()}
                    </select>
                </div>
            </div>
        </div>
    );
};
TimeRangeSelector.propTypes = {
    value: PropTypes.shape({
        first: PropTypes.string,
        second: PropTypes.string,
    }),
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};
export default TimeRangeSelector;
