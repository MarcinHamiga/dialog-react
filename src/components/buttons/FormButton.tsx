type ButtonProps = {
    text?: string;
    type?: "button" | "submit" | "reset";
}

const FormButton = ({text, type}: ButtonProps) => {
    return (
        <button
            type={type}
            className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full text-center p-4 text-white text-xl transition-colors duration-100 rounded-xl shadow-md"
        >
            {text}
        </button>
    )
}

export default FormButton;