import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError, isAxiosError } from 'axios';
import { ISpeaker } from "../../interfaces/ISpeaker.ts";
import SpeakerCard from "../SpeakerCard/SpeakerCard.tsx";
import NewSpeakerCard from "../NewSpeakerCard/NewSpeakerCard.tsx";
import {useProject} from "../ProjectContext/ProjectContext.tsx";
import Button from "../buttons/Button.tsx";

type SpeakersListProps = {
    previous: "dashboard" | "speaker";
    canHide: boolean,
    noAddButton: boolean
    paginate?: boolean,
    limit?: number,
}

const SpeakersList = ({previous, canHide, noAddButton, paginate=false, limit=11}: SpeakersListProps) => {
    const { projectId } = useProject();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | Error | null>(null);
    const [speakers, setSpeakers] = useState<ISpeaker[]>([]);
    const [speakersHidden, setSpeakersHidden] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(0);

    function nextPage() {
        setPage(page + 1);
    }

    function prevPage() {
        setPage(page - 1);
    }

    const fetchSpeakers = useCallback(async () => {
        setIsLoading(true);
        if (!projectId) setSpeakers([]);
        try {
            let queryString: string = import.meta.env.VITE_API_URL + `/speaker/project/${projectId}`;
            let hasQueryParams: boolean = false;
            if (paginate) {
                const prefix = hasQueryParams ? `&` : `?`;
                queryString += `${prefix}page=${page}`;
                hasQueryParams = true;
            }
            if (limit) {
                const prefix = hasQueryParams ? `&` : `?`;
                queryString += `${prefix}limit=${limit}`;
                hasQueryParams = true;
            }
            const prefix =  hasQueryParams ? `&` : `?`;
            queryString +=  `${prefix}order=desc`;
            const response = await axios.get(queryString);
            setSpeakers(response.data.data);
            setPages(response.data.pages);

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
    }, [projectId, limit, page, paginate]);

    useEffect(() => {
        fetchSpeakers();
    }, [fetchSpeakers]);

    function changeSpeakersVisibility() {
        setSpeakersHidden(!speakersHidden);
    }

    return (
        <section className="flex flex-col flex-grow justify-between w-full p-6 h-full overflow-y-auto bg-gray-700">
            <div className="max-w-full w-full">
                <div className="flex flex-row flex-grow justify-between ml-auto">
                    <h2
                        className="text-violet-500 text-4xl font-semibold"
                    >
                        Speakers
                    </h2>
                    <div className="flex flex-row gap-2">
                        <Button
                            onClick={fetchSpeakers}
                            text={"Refresh"}
                        />
                        {canHide && (
                            <Button
                                text={speakersHidden ? "Show" : "Hide"}
                                onClick={changeSpeakersVisibility}
                            />
                        )}


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
            {paginate && (
                <div className="flex justify-center p-4 mt-4 gap-2">
                    {page !== 1 ? (
                        <Button
                            onClick={prevPage}
                            text={"<"}
                        />
                    ) : (
                        <Button
                            onClick={prevPage}
                            text={"<"}
                            disabled={true}
                        />
                    )}
                    <p
                        className={"text-2xl text-white w-16 text-center"}
                    >
                        {page}
                    </p>
                    {(page < pages) ? (
                        <Button
                            onClick={nextPage}
                            text={">"}
                            disabled={false}
                        />
                    ) : (
                        <Button
                            onClick={nextPage}
                            text={">"}
                            disabled={true}
                        />
                    )
                    }
                </div>
            )}

        </section>
    );
};

export default SpeakersList;