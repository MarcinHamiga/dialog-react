import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {ISpeaker} from "../../interfaces/ISpeaker.ts";
import FormInput from "../ProjectEdit/FormInput.tsx";
import FormLinkButton from "../buttons/FormLinkButton.tsx";
import FormButton from "../buttons/FormButton.tsx";

interface SpeakerEditParams extends Record<string, string | undefined> {
    projectId: string;
    speakerId: string,
}

const SpeakerEdit = () => {
    const navigate = useNavigate();
    const params = useParams<SpeakerEditParams>();
    const [searchParams] = useSearchParams();
    const previous = searchParams.get('previous');
    const [speakerId, setSpeakerId] = useState<string>(params.speakerId as string);
    const [name, setName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<AxiosError | Error | null>(null);
    const [saveError, setSaveError] = useState<AxiosError | Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<ISpeaker>(import.meta.env.VITE_API_URL + '/speaker/' + params.speakerId);
                setName(response.data.name);
                setSpeakerId(response.data.id);
            } catch (err) {
                console.error(err);
                if (axios.isAxiosError(err) || err instanceof Error) {
                    setFetchError(err);
                } else {
                    setFetchError(new Error("An unknown error has occured"));
                }

            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [params.speakerId]);

    async function saveSpeaker(e: React.FormEvent<EventTarget>) {
        e.preventDefault();
        const payload = {
            name,
        }
        try {
            await axios.patch(import.meta.env.VITE_API_URL + '/speaker/' + speakerId, payload);
            navigate(`/project/${params.projectId}/${previous === "dashboard" ? previous : (previous === "speaker" ? previous : "dashboard") }`);
        } catch (err) {
            if (axios.isAxiosError(err) ||  err instanceof Error) {
                setSaveError(err);
            } else {
                setSaveError(new Error("An unknown error has occured"));
            }
        }
    }

    if (isLoading) {
        return (
            <div
                className={`w-full min-h-24 text-center mx-auto text-blue-200 bg-blue-400 border-2 border-blue-600 rounded-xl shadow-md`}
            >
                Loading data...
            </div>
        )
    }

    if (fetchError) {
        return (
            <div
                className={`w-full min-h-24 text-center mx-auto text-red-200 bg-red-400 border-2 border-red-600 rounded-xl shadow-md`}
            >
                {fetchError.name}: {fetchError.message}
            </div>
        )
    }

    return (
        <div
            className="flex flex-col justify-between flex-grow mx-auto p-2 sm:w-full md:w-full lg:w-[80%] xl:w-[70%] min-h-screen"
        >
            <form
                className="flex flex-col grow items-center sm:w-full md:w-full lg:w-[80%] xl:w-[70%] mx-auto bg-gray-800 rounded-lg shadow-md justify-between"
                onSubmit={(event) => saveSpeaker(event)}
            >
                <div
                    className="flex flex-col w-full"
                >
                    <h1
                        className="text-[2.5rem] font-bold text-base text-center mb-4 text-white"
                    >
                        Editing: {name ? name : "Unnamed character"}
                    </h1>
                    <FormInput
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
                        to={searchParams.get("previous") === "dashboard" ? `/project/${params.projectId}/dashboard/` : `/project/${params.projectId}/speaker`}
                        text={`Back to ${searchParams.get("previous") === "dashboard" ? "dashboard" : (searchParams.get("previous") === "speaker" ? "speakers" : "dashboard")}`}
                    />
                    <FormButton
                        type="submit"
                        text="Save"
                    />
                </div>
            </form>
            <div
                className={`${saveError ? "w-full min-h-24 text-center mx-auto text-red-200 bg-red-400 border-2 border-red-600 rounded-xl shadow-md" : "hidden" }`}
            >
                {saveError?.name}: {saveError?.message}
            </div>
        </div>
    )
}

export default SpeakerEdit;