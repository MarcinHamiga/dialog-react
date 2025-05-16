import {useNavigate} from "react-router-dom";
import {getFullDate} from "../../../utils.ts";
import axios from "axios";
import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";

interface DialogueTreeCardProps {
    id: string,
    treeName: string,
    treeId: string,
    createdAt: string,
    updatedAt: string,
    onDeleteSuccess:  () => void,
    previous: string,
}

const DialogueTreeCard = ({ id, treeName, treeId, createdAt, updatedAt, onDeleteSuccess, previous="dashboard" }: DialogueTreeCardProps) => {
    const navigate = useNavigate();
    const { setDialogueTreeId } = useProject();

    function moveToEdit() {
        setDialogueTreeId(id);
        navigate(`/dialoguetree/edit?previous=${previous}`);
    }

    async function removeTree() {
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/dialoguetree/${id}`);
            console.log(response);
            onDeleteSuccess();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            id={`card-${id}`}
            className="bg-gray-800 rounded-lg shadow-md w-full overflow-hidden transition-transform hover:scale-105 hover:shadow-xl min-h-64"
        >
            <div className="flex flex-col flex-grow justify-center gap-2 h-full">
                <div className="flex flex-col p-2">
                    <h3
                        className={`text-4xl text-gray-100 p-2`}
                    >
                        {treeName}
                    </h3>
                    <h3
                        className={`text-1xl text-gray-200 px-3`}
                    >
                        {treeId}
                    </h3>
                </div>
                <div className="flex p-3 gap-2 bg-gray-900">
                    <button
                        onClick={moveToEdit}
                        className="bg-violet-600 hover:bg-violet-700 text-white rounded py-2 px-4 flex-1 text-center font-medium transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white rounded py-2 px-4 flex-1 font-medium transition-colors"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this speaker?")) removeTree();
                        }}
                    >
                        Remove
                    </button>
                </div>
                <div className="p-4 text-sm text-gray-300 space-y-1">
                    <p className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        <span>{getFullDate(createdAt ? new Date(createdAt) : new Date())}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-400">Updated:</span>
                        <span>{getFullDate(updatedAt ? new Date(updatedAt) : new Date())}</span>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default DialogueTreeCard;