import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';
import {getFullDate} from "../../utils.ts";
import {useProject} from "../ProjectContext/ProjectContext.tsx";

type ProjectCardProps = {
    projectId: string;
    projectName: string;
    projectDesc?: string;
    updateDate: string;
    onDeleteSuccess: () => void;
}

const ProjectCard = ({ projectId, projectName, projectDesc, updateDate, onDeleteSuccess }: ProjectCardProps) => {
    const [id] = useState(projectId);
    const lastEditDate = new Date(updateDate);
    const lastEditDateString = getFullDate(lastEditDate);
    const { setProjectId } = useProject();
    const navigate = useNavigate();

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

    function chooseProject() {
        setProjectId(projectId);
        navigate('/dashboard');
    }

    return (
        <div className="flex flex-col h-full min-h-64 bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-all">
            <div className="flex-grow p-4">
                <h2 className="text-2xl text-violet-500 font-semibold mb-2"><b>{projectName}</b></h2>
                <p className="text-sm text-gray-300">{projectDesc}</p>
            </div>

            <div className="p-4 flex flex-col gap-1 bg-gray-900">
                <div>
                    <button
                        onClick={chooseProject}
                        className="block w-full my-auto text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        Start
                    </button>
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
            </div>
            <div
                className={"sm:text-small md:text-medium lg:text-medium xl:text-medium p-4 flex flex-row justify-between"}
            >
                <span className="text-gray-400 text-sm">Last edited: </span>
                <span className="text-gray-200 text-sm">{lastEditDateString}</span>
            </div>
        </div>
    );
}

export default ProjectCard;