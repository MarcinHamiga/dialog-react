import {Link} from "react-router-dom";

type LinkButtonProps = {
    to: string;
    text?: string;
}

const FormLinkButton = ({to, text}:  LinkButtonProps) => {
    return (
        <Link
            to={to}
            className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full text-center p-4 text-white text-xl transition-colors duration-100 rounded-xl shadow-md"
        >
            {text}
        </Link>
    )
}

export default FormLinkButton;