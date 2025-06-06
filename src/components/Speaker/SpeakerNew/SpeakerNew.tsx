import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import FormInput from "../../Project/ProjectEdit/FormInput.tsx";
import FormLinkButton from "../../Buttons/FormLinkButton.tsx";
import FormButton from "../../Buttons/FormButton.tsx";
import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";

const SpeakerNew = () => {
    const navigate = useNavigate();
    const { projectId } = useProject();
    const [searchParams] = useSearchParams();
    const [name, setName] = useState('');

    async function createSpeaker(e: React.FormEvent) {
        e.preventDefault();
        const speaker = {
            name,
            projectId: projectId,
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/speaker', speaker);
            console.log(response.data);
            navigate(searchParams.get("previous") === "speaker" ? `/speaker` : `/dashboard`);
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
                    <FormInput
                        type="text"
                        label="Speaker name"
                        id="speakername"
                        name="speakername"
                        value={name}
                        onChangeTarget={setName}
                        required
                    />
                </div>
                <div
                    className="flex flex-row gap-2 w-[80%] mx-auto mb-4"
                >
                    <FormLinkButton
                        to={searchParams.get("previous") === "speaker" ? `/speaker` : `/dashboard`}
                        text={`Back to ${searchParams.get("previous") === "speaker" ? `speakers` : `dashboard`}`}
                    />
                    <FormButton
                        type="submit"
                        text="Create speaker"
                    />
                </div>
            </form>
        </div>
    )
}

export default SpeakerNew;