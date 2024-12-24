import PropTypes from "prop-types";

const CartRemark = ({ onRemarkChange, value }) => {
    const handleChange = (e) => {
        const newRemark = e.target.value;
        onRemarkChange(newRemark);
    };
    return (
        <div className="flex flex-col justify-center font-notoTC py-6">
            <label className="block text-xl font-bold mb-2">備註</label>
            <textarea
                id="remarkInput"
                className="w-full h-28 p-4 bg-gray-100 rounded-lg text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="請在此輸入..."
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};

CartRemark.propTypes = {
    onRemarkChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default CartRemark;
