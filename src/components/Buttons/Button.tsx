type ButtonProps = {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    customWidth?: string;
    customColor?: string;
}

const Button = ({text, onClick, disabled=false, customWidth="", customColor=""}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            disabled={disabled}
            className={`${customColor ? customColor : 'bg-violet-500 hover:bg-violet-600'} cursor-pointer transition-all ${customWidth ? customWidth : "w-32"} h-auto text-white shadow-md rounded-xl hover:shadow-lg ${disabled ? "opacity-60" : "opacity-100"}`}
        >
            {text}
        </button>
    );
}

export default Button;