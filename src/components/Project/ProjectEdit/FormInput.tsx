import clsx from "clsx";

type FormInputProps = {
    type: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    id: string;
    name: string;
    value: string;
    label?: string;
    required?: boolean;
    onChangeTarget?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    maxLength?: number;
    inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url";
    className?: string;
    error?: string;
    testId?: string;
};

const FormInput = ({
                       type = "text",
                       id = "",
                       name = "",
                       value = "",
                       label = "",
                       required = false,
                       onChangeTarget = () => {},
                       placeholder,
                       disabled = false,
                       readOnly = false,
                       autoFocus = false,
                       autoComplete,
                       maxLength,
                       inputMode,
                       className = "",
                       error,
                       testId,
                   }: FormInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeTarget(event.target.value);
    };

    return (
        <div className={clsx("mx-auto p-2 container w-[80%] max-w-[80%]", className)}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-1 mt-3"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                maxLength={maxLength}
                inputMode={inputMode}
                data-testid={testId}
                required={required}
                className={clsx(
                    "rounded p-4 shadow-md font-medium min-w-[100%] transition-colors",
                    "bg-gray-900 text-gray-400 dark:text-gray-300 dark:bg-gray-900",
                    {
                        "border border-red-500": error,
                        "opacity-50 cursor-not-allowed": disabled,
                    }
                )}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export default FormInput;
