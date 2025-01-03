import PropTypes from "prop-types";
import Header from "../../../home/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
const EditHeader = ({ dishName, onSave, onBack, isPending }) => {
    const saveButton = (
        <button
            onClick={onSave}
            className="bg-orange-400 text-white px-4 py-1 rounded-lg font-bold hover:bg-orange-600"
        >
            {isPending ? (
                <FontAwesomeIcon
                    icon={faEllipsis}
                    beatFade
                    size="lg"
                    className="mr-2"
                />
            ) : (
                "保存"
            )}
        </button>
    );

    return (
        <Header
            LeftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            title={dishName}
            onLeftClick={onBack}
            rightComponents={[saveButton]}
        ></Header>
    );
};
EditHeader.propTypes = {
    dishName: PropTypes.string.isRequired,
    onSave: PropTypes.func,
    onBack: PropTypes.func,
    isPending: PropTypes.bool,
};
export default EditHeader;
