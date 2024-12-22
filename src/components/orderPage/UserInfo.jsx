import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
    return (
        <div className="mb-6">
            <p className="font-bold text-lg">用戶ID: {user.id}</p>
            <p className="text-sm">下單時間: {user.orderTime}</p>
            <p className="text-sm">
                預估製作時間: {user.estimatedPrepTime} 分鐘
            </p>
            <p className="text-xl font-bold mt-2">總金額: ${user.cost}</p>
        </div>
    );
};

UserInfo.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        estimatedPrepTime: PropTypes.number.isRequired,
        orderTime: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
    }).isRequired,
};

export default UserInfo;
