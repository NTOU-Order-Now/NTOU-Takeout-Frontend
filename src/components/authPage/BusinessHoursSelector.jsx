import PropTypes from "prop-types";
import TimeRangeSelector from "./TimeRangeSelector.jsx";

const BusinessHoursSelector = ({ businessHours, onUpdate }) => {
    const daysOfWeek = [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
    ];
    const periods = ["午段", "晚段"];

    const handleTimeChange = (dayIndex, periodIndex, startOrEnd, value) => {
        const newHours = businessHours.map((day, i) => {
            if (i === dayIndex) {
                return day.map((period, j) => {
                    if (j === periodIndex) {
                        return {
                            ...period,
                            [startOrEnd]: value,
                        };
                    }
                    return period;
                });
            }
            return day;
        });
        onUpdate(newHours);
    };

    return (
        <div className="w-full flex flex-col p-3 bg-white rounded-lg font-notoTC">
            {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">
                營業時間設定
            </h2> */}
            <div className="space-y-4">
                {daysOfWeek.map((day, dayIndex) => (
                    <div key={day} className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-700 mb-4">
                            {day}
                        </div>
                        <div className="space-y-4">
                            {periods.map((period, periodIndex) => (
                                <TimeRangeSelector
                                    key={period}
                                    label={period}
                                    value={businessHours[dayIndex][periodIndex]}
                                    onChange={(startOrEnd, value) =>
                                        handleTimeChange(
                                            dayIndex,
                                            periodIndex,
                                            startOrEnd,
                                            value,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

BusinessHoursSelector.propTypes = {
    businessHours: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default BusinessHoursSelector;
