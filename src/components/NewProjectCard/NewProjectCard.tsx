import {Link} from "react-router-dom";

const NewProjectCard = () => {
    return (
        <div className="flex flex-col h-full bg-gray-600 rounded-lg shadow-md">
            <Link to="/project/new" className="text-[96px] rounded p-4 mx-auto text-white my-auto">+</Link>
        </div>
    )
}

export default NewProjectCard;