import {useState} from "react";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {DashboardParams} from "../../interfaces/IDashboardParams.ts";
import axios from "axios";

const SpeakerNew = () => {
    const navigate = useNavigate();
    const params = useParams<DashboardParams>();
    const [searchParams] = useSearchParams();
    const [name, setName] = useState('');

    async function createSpeaker(e: React.FormEvent) {
        e.preventDefault();
        const speaker = {
            name,
            projectId: params.projectId,
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/speaker', speaker);
            console.log(response.data);
            navigate(searchParams.get("previous") === "dashboard" ? `/project/${params.projectId}/dashboard/` : `/project/${params.projectId}/speaker`);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div
            className="flex flex-col justify-between flex-grow mx-auto p-2 sm:w-full md:w-full lg:w-[80%] xl:w-[70%] min-h-screen"
        >
            <form
                className="flex flex-col grow items-center sm:w-full md:w-full lg:w-[80%] xl:w-[70%] mx-auto bg-gray-800 rounded-lg shadow-md justify-between"
                onSubmit={(event) => createSpeaker(event)}
            >
                <div
                    className="flex flex-col w-full"
                >
                    <h1
                        className="text-[2.5rem] font-bold text-base text-center mb-4 text-white"
                    >
                        {name ? name : "Unnamed character"}
                    </h1>
                    <label
                        htmlFor="speakername"
                        className="text-xl text-white font-semibold text-left mb-4 w-[80%] mx-auto"
                    >
                        Speaker name
                    </label>
                    <input
                        id="speakername"
                        name="speakername"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className={`w-[80%] mx-auto p-2 mb-2 rounded-lg shadow-md bg-gray-900 text-white`}
                        required
                    />
                </div>
                <div
                    className="flex flex-row gap-2 w-[80%] mx-auto mb-4"
                >
                    <Link
                        to={searchParams.get("previous") === "dashboard" ? `/project/${params.projectId}/dashboard/` : `/project/${params.projectId}/speaker`}
                        className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full text-center p-4 text-white text-xl transition-colors duration-100 rounded-xl shadow-md"
                    >
                        Back to {searchParams.get("previous") === "dashboard" ? "dashboard" : (searchParams.get("previous") === "speaker" ? "speakers" : "dashboard")}
                    </Link>
                    <button
                        className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full text-center p-4 text-white text-xl transition-colors duration-100 rounded-xl shadow-md"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SpeakerNew;