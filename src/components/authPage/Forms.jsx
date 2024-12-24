import PropTypes from "prop-types";

const Forms = ({ formData, formValues, setFormValues }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            {formData && (
                <div className="space-y-4 mt-10">
                    {Object.entries(formData).map(([name, placeholder]) => (
                        <div key={name} className="w-full pt-4">
                            <input
                                type="text"
                                name={name}
                                placeholder={placeholder}
                                value={formValues[name]}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

Forms.propTypes = {
    formData: PropTypes.objectOf(PropTypes.string),
    setFormValues: PropTypes.func.isRequired,
    formValues: PropTypes.objectOf(PropTypes.string),
};

export default Forms;
