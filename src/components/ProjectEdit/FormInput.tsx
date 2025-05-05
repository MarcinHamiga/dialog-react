// @ts-expect-error dunno the type for a function
const FormInput = ({type="text", id="", name="", value="", label="", onChangeTarget }) => {
    if (!onChangeTarget) return <p>Error creating a FormInput element. No onChangeTarget specified.</p>
    return (
        <div className="w-full mx-auto p-2 container">
            {label && (
                <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-1 mt-3" htmlFor={name}>
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={(event) => onChangeTarget(event.target.value)}
                className="rounded bg-gray-300 p-4 shadow font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-700 min-w-[100%]"
            />
        </div>
    )
}

export default FormInput;