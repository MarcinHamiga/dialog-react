import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError, isAxiosError } from 'axios';
import { ISpeaker } from "../../interfaces/ISpeaker.ts";
import SpeakerCard from "../SpeakerCard/SpeakerCard.tsx";
import NewSpeakerCard from "../NewSpeakerCard/NewSpeakerCard.tsx";
import {useProject} from "../ProjectContext/ProjectContext.tsx";

type SpeakersListProps = {
    previous: "dashboard" | "speaker";
    canHide: boolean,
    limited: boolean,
    noAddButton: boolean
}

const SpeakersList = ({previous, canHide, limited, noAddButton}: SpeakersListProps) => {
    const { projectId } = useProject();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | Error | null>(null);
    const [speakers, setSpeakers] = useState<ISpeaker[]>([]);
    const [speakersHidden, setSpeakersHidden] = useState<boolean>(false);

    const fetchSpeakers = useCallback(async () => {
        setIsLoading(true);
        if (!projectId) setSpeakers([]);
        try {
            if (limited) {
                const response = await axios.get(import.meta.env.VITE_API_URL + `/speaker/project/${projectId}?order=DESC&limit=4`);
                const data: ISpeaker[] = response.data.map((item: ISpeaker) => item);
                setSpeakers(data);
            } else {
                const response = await axios.get(import.meta.env.VITE_API_URL + `/speaker/project/${projectId}?order=DESC`);
                const data: ISpeaker[] = response.data.map((item: ISpeaker) => item);
                setSpeakers(data);
            }

        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err);
                setError(err);
            } else if (err instanceof Error) {
                console.error(err);
                setError(err);
            } else {
                console.error("Unknown error: ", err);
                setError(new Error("Unknown error"));
            }
        } finally {
            setIsLoading(false);
        }
    }, [limited, projectId]);

    useEffect(() => {
        fetchSpeakers();
    }, [fetchSpeakers]);

    function changeSpeakersVisibility() {
        setSpeakersHidden(!speakersHidden);
    }

    return (
        <section className="flex flex-row flex-grow w-full p-6 overflow-y-auto bg-gray-700">
            <div className="max-w-full w-full mx-4">
                <div className="flex flex-row flex-grow justify-between ml-auto">
                    <h2
                        className="text-violet-500 text-4xl font-semibold"
                    >
                        Speakers
                    </h2>
                    <div className="flex flex-row gap-2">
                        <button
                            className={"bg-violet-500 hover:bg-violet-600 cursor-pointer transition-all w-32 h-auto text-white shadow-md rounded-xl hover:shadow-lg"}
                            onClick={fetchSpeakers}
                        >
                            Refresh
                        </button>
                        <button
                            className={`bg-violet-500 hover:bg-violet-600 cursor-pointer transition-all w-32 h-auto text-white shadow-md rounded-xl ${canHide ? "" : "hidden"} hover:shadow-lg`}
                            onClick={changeSpeakersVisibility}
                        >
                            {speakersHidden ? "Show" : "Hide"}
                        </button>
                    </div>
                </div>
                <hr className={"p-2 mt-2 w-full "}/>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/30 border border-red-700 text-red-100 p-4 rounded-md">
                        <p className="font-medium">There was a problem fetching speaker data:</p>
                        <p className="mt-1">{error.message}</p>
                    </div>
                ) : speakers.length === 0 ? (
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out origin-top
                            ${
                            speakersHidden
                                ? "opacity-0 scale-y-0 pointer-events-none"
                                : "opacity-100 scale-y-100"
                        }
                        `}
                    >
                        <div className="text-center py-16 text-gray-400">
                            <p className="text-xl mb-4">No speakers found for this project</p>
                            <p>Create your first speaker to get started</p>
                        </div>
                        <NewSpeakerCard previousPage={previous}/>
                    </div>

                ) : (
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out origin-top
                            ${
                                speakersHidden 
                                    ? "opacity-0 scale-y-0 pointer-events-none" 
                                    : "opacity-100 scale-y-100"
                            }
                        `}
                    >
                        {!noAddButton && (<NewSpeakerCard previousPage={previous}/>)}
                        {speakers.map((speaker: ISpeaker) => (
                            <SpeakerCard
                                key={speaker.id}
                                id={speaker.id}
                                name={speaker.name}
                                image={speaker.image}
                                createdAt={speaker.createdAt}
                                updatedAt={speaker.updatedAt}
                                onDeleteSuccess={fetchSpeakers}
                                previous={previous}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SpeakersList;