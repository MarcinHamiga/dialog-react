import {useState} from "react";
import defaultPhoto from "../../../assets/icon-7797704_640.png";
import {Link} from "react-router-dom";
import {getFullDate} from "../../../utils.ts";
import axios from "axios";

interface SpeakerCardProps {
    id: string,
    name: string,
    image?: string,
    createdAt: string,
    updatedAt: string,
    onDeleteSuccess:  () => void,
    previous: string,
}

const SpeakerCard = ({ id, name, image, createdAt, updatedAt, onDeleteSuccess, previous="dashboard" }: SpeakerCardProps) => {
    const [characterName] = useState<string>(name);
    const [imageUrl] = useState<string>(image ? image : "");
    const [createDate] = useState<Date>(createdAt ?  new Date(createdAt) : new Date());
    const [updateDate] = useState<Date>(updatedAt ?  new Date(updatedAt) : new Date());

    async function removeSpeaker() {
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/speaker/${id}`);
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
            <div className="flex flex-col flex-grow justify-center h-full gap-2">
                <div className="flex flex-row p-4">
                    <img
                        src={imageUrl ? imageUrl : defaultPhoto}
                        alt="An image of the speaker"
                        className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-violet-500"/>
                    <h3
                        className="h-16 w-[75%] p-2 text-white text-xl font-semibold"
                    >
                        {characterName}
                    </h3>
                </div>
                <div className="flex p-3 gap-2 bg-gray-900">
                    <Link
                        to={`/speaker/edit/${id}?previous=${previous}`}
                        className="bg-violet-600 hover:bg-violet-700 text-white rounded py-2 px-4 flex-1 text-center font-medium transition-colors"
                    >
                        Edit
                    </Link>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white rounded py-2 px-4 flex-1 font-medium transition-colors"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this speaker?")) removeSpeaker();
                        }}
                    >
                        Remove
                    </button>
                </div>
                <div className="p-4 text-sm text-gray-300 space-y-1">
                    <p className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        <span>{getFullDate(createDate)}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-400">Updated:</span>
                        <span>{getFullDate(updateDate)}</span>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default SpeakerCard;