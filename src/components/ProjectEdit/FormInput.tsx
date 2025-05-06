// @ts-expect-error dunno the type for a function
const FormInput = ({type="text", id="", name="", value="", label="", required=false, onChangeTarget }) => {
    if (!onChangeTarget) return <p>Error creating a FormInput element. No onChangeTarget specified.</p>
    return (
        <div className="mx-auto p-2 container w-[80%] max-w-[80%]">
            {label && (
                <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-1 mt-3" htmlFor={name}>
                    {label}
                </label>
            )}
            {required ? (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={(event) => onChangeTarget(event.target.value)}
                    className="rounded bg-gray-900 p-4 shadow-md font-medium text-gray-400 dark:text-gray-300 dark:bg-gray-900 min-w-[100%]"
                    required
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={(event) => onChangeTarget(event.target.value)}
                    className="rounded bg-gray-900 p-4 shadow-md font-medium text-gray-400 dark:text-gray-300 dark:bg-gray-900 min-w-[100%]"
                />
            )
            }

        </div>
    )
}

export default FormInput;