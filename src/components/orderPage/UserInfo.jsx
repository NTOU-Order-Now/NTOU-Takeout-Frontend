import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user, storeData, role }) => {
    const navigate = useNavigate();
    return role === "MERCHANT" ? (
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
    ) : (
        <div className="mb-6 flex flex-col items-start gap-2">
            <div className="flex flex-row gap-2 items-center">
                <p className="font-notoTC font-extrabold text-2xl ">
                    {storeData.name}
                </p>
                <button
                    className="font-notoTC font-medium h-6 text-center text-xs w-15 bg-orange-500 px-2 py-1 whitespace-nowrap flex-shrink-0 rounded-lg text-white"
                    onClick={() => {
                        navigate(`/menu/${storeData.id}`);
                    }}
                >
                    查看菜單
                </button>
            </div>
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
    storeData: PropTypes.object,
    role: PropTypes.string.isRequired,
};

export default UserInfo;
