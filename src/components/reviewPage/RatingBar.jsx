import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingBar = (prop) => {
    const { stars, percentage, count } = prop;
    return (
        <div className="font-notoTC items-center mt-1 flex flex-row">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                            i < stars ? "text-yellow-300" : "text-gray-300"
                        }
                    />
                ))}
            </div>
            <div className="w-full mr-31 bg-gray-200 rounded-full h-2.5 mx-2">
                <div
                    className="bg-yellow-300 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-gray-700">({count})</span>
        </div>
    );
};

export default RatingBar;
