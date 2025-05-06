import {Link} from "react-router-dom";

const NewProjectCard = () => {
    return (
        <div className="flex flex-col h-full bg-gray-600 rounded-lg shadow-md transition-all hover:scale-105">
            <Link to="/project/new" className="text-[96px] rounded p-4 mx-auto text-white my-auto text-center content-center w-full h-full rounded-2xl">+</Link>
        </div>
    )
}

export default NewProjectCard;