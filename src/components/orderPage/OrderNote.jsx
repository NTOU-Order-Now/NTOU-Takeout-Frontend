import PropTypes from "prop-types";

const OrderNote = ({ note }) => {
    return (
        <div className="bg-gray-100 p-3 rounded-md mb-6 min-h-24">
            <h2 className="font-bold mb-2">訂單備註</h2>
            <p className="text-gray-600 text-sm">{note}</p>
        </div>
    );
};

OrderNote.propTypes = {
    note: PropTypes.string.isRequired,
};

export default OrderNote;
