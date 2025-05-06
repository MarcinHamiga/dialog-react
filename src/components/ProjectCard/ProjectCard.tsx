import {Link} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';
import {getFullDate} from "../../utils.ts";

const ProjectCard = ({ projectId = "", projectName = "", projectDesc = "", updateDate = "", onDeleteSuccess }) => {
    const [id] = useState(projectId);
    const lastEditDate = new Date(updateDate);
    const lastEditDateString = getFullDate(lastEditDate);

    async function removeProject(e: React.MouseEvent) {
        console.log(e);
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + "/project/" + id);
            console.log(response.data);
            onDeleteSuccess();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-all">
            <div className="flex-grow p-4">
                <h2 className="text-2xl font-semibold text-violet-400 mb-2"><b>{projectName}</b></h2>
                <p className="text-sm text-white">{projectDesc}</p>
            </div>

            <div className="p-4 pt-0 flex flex-col gap-1">
                <div>
                    <Link
                        to={`/project/${projectId}/dashboard`}
                        className="block w-auto my-auto text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors">
                        Start</Link>
                </div>
                <div className="flex flex-row gap-1">
                    <Link
                        to={`/project/${id}`}
                        className="block w-full my-auto text-center bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={(event) => {
                            if (window.confirm("Are you sure you want to delete this project?")) {
                                removeProject(event);
                            }
                        }}
                        className="block w-full my-auto text-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
                <p className={"sm:text-small md:text-medium lg:text-medium xl:text-medium text-black pt-4"}>Last edited: {lastEditDateString}</p>
            </div>
        </div>
    );
}

export default ProjectCard;