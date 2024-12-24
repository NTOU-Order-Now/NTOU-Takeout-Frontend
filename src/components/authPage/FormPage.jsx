import { useState } from "react";
import PropTypes from "prop-types";
import TitleText from "./TitleText.jsx";
import Forms from "./Forms.jsx";

const FormPage = ({
    titleText,
    description,
    formData,
    continueBtnText = "繼續",
    errorMessageText,
    handleSubmit,
    isLoading,
    isError = true,
}) => {
    const [formValues, setFormValues] = useState(
        formData
            ? Object?.keys(formData).reduce((acc, key) => {
                  acc[key] = "";
                  return acc;
              }, {})
            : undefined,
    );
    //
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormValues((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit?.(formValues);
    };

    return (
        <form onSubmit={onSubmit} className="w-[70%] text-center pt-20 h-dvh">
            {titleText && <TitleText titleData={[titleText, description]} />}

            <Forms
                formData={formData}
                formValues={formValues}
                setFormValues={setFormValues}
            />

            {errorMessageText && isError && (
                <p className="text-red-500 text-sm mt-2 text-start">
                    {errorMessageText}
                </p>
            )}

            <button
                type="submit"
                className="fixed bottom-[2rem] left-[15%] w-[70%] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
                {continueBtnText}
            </button>
        </form>
    );
};

FormPage.propTypes = {
    titleText: PropTypes.string,
    description: PropTypes.string,
    formData: PropTypes.objectOf(PropTypes.string),
    continueBtnText: PropTypes.string,
    errorMessageText: PropTypes.string,
    handleSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
};

export default FormPage;
