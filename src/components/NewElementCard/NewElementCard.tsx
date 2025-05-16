import {Link} from "react-router-dom";

interface NewElementCardProps {
    to: string;
    previous?: string;
}

const NewElementCard = ({ to, previous }: NewElementCardProps) => {
    return (
        <div className="flex flex-col h-full min-h-64 bg-gray-800 rounded-lg shadow-md transition-all hover:scale-105">
            <Link to={ previous ? `${to}?previous=${previous}` : to } className="text-[96px] p-4 mx-auto text-white my-auto text-center content-center w-full h-full rounded-2xl">+</Link>
        </div>
    )
}

export default NewElementCard;