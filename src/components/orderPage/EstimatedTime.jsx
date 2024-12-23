import PropTypes from "prop-types";

const EstimatedTime = ({ value, onChange }) => {
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (!isNaN(newValue) && newValue >= 0) {
            onChange(parseInt(newValue, 10));
        }
    };

    return (
        <footer className="  bg-orange-500 p-4 text-center text-white flex justify-center items-center">
            <span className="text-xl font-bold mr-2">預估完成時間</span>
            {/*<input*/}
            {/*    type="number"*/}
            {/*    value={value}*/}
            {/*    onChange={handleChange}*/}
            {/*    className="text-center text-black w-16 px-2 py-1 rounded-md text-2xl font-bold"*/}
            {/*    min="0"*/}
            {/*/>*/}
            <span className="bg-orange-300 rounded-xl w-14 h-8 content-center text-black font-extrabold">
                {value}
            </span>

            <span className="text-xl ml-2">分鐘</span>
        </footer>
    );
};

EstimatedTime.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
};

export default EstimatedTime;
