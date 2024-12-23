import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
    return (
        <div className="mb-6 flex flex-col items-start gap-2">
            <p className="font-bold text-lg bg-gray-200 p-2 rounded-md">
                用戶ID: {user.id}
            </p>
            <p className="text-lg   ">下單時間: {user.orderTime}</p>
            <p className="text-lg">
                預估製作時間: {user.estimatedPrepTime} 分鐘
            </p>
            <p className="text-2xl font-bold mt-2">總金額: ${user.cost}</p>
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
