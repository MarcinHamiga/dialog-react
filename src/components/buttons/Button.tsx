type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

const Button = ({text, onClick, disabled=false}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            disabled={disabled}
            className={`bg-violet-500 hover:bg-violet-600 cursor-pointer transition-all w-32 h-auto text-white shadow-md rounded-xl hover:shadow-lg ${disabled ? "opacity-60" : "opacity-100"}`}
        >
            {text}
        </button>
    );
}

export default Button;