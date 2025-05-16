import Button from "../../Buttons/Button.tsx";
import {useEffect, useState} from "react";
import DialogueTreeEditForm from "./DialogueTreeEditForm.tsx";
import Navbar from "../../Navbar/Navbar.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";
import {IDialogue} from "../../../interfaces/IDialogue.ts";
import axios, {AxiosError} from "axios";
import DialogueCard from "../../Dialogue/DialogueCard.tsx";
import NewDialogueCard from "../../Dialogue/NewDialogueCard.tsx";
import PageButtons from "../../Buttons/PageButtons.tsx";

const DialogueTreeEdit = () => {
    const [editable, setEditable] = useState<boolean>(false);
    const [params] = useSearchParams();
    const previous = params.get('previous');
    const { dialogueTreeId, setDialogueTreeId } = useProject();
    const navigate = useNavigate();
    const [dialogue,  setDialogue] = useState<IDialogue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | Error | null>(null);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(1);

    function nextPage() {
        setPage(page + 1);
    }

    function prevPage() {
        setPage(page - 1);
    }

    const fetchDialogue = async () => {
        setIsLoading(true);
        try {
            console.log(dialogueTreeId);
            const response = await axios.get(import.meta.env.VITE_API_URL + '/dialogue/dialogueTree/' + dialogueTreeId + `?limit=10&page=${page}`);
            console.log(response.data.data);
            setDialogue(response.data.data);
            setPages(response.data.pages);
            console.log(`Pages: ${pages}`);
            if (response.data.data.length === 0 && page > 1) setPage(page - 1);
        } catch (err) {
            if (axios.isAxiosError(err) || err instanceof Error) {
                setError(err);
                console.error(err);
            } else {
                setError(new Error("Unknown error has occured"));
                console.error(err);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDialogue();
    }, [dialogueTreeId, page]);

    function toggleEditable() {
        setEditable(!editable);
    }

    function back() {
        setDialogueTreeId("");
        navigate(previous === 'dialoguetree' ? '/dialoguetree' : '/dashboard');
    }

    return (
        <section
            id={"dialoguetree-edit"}
            className={'bg-gray-800 flex flex-row h-screen w-full'}
        >
            <Navbar />
            <div
                id={'dialoguetree-form'}
                className={'flex flex-col flex-grow h-full w-full p-4 justify-between'}
            >
                <DialogueTreeEditForm editable={editable} />
                <div
                    className={'flex flex-row justify-center w-full my-4 min-h-12 gap-4'}
                >
                    <Button
                        text={'Back'}
                        onClick={back}
                    />
                    <Button
                        text={'Edit'}
                        onClick={toggleEditable}

                    />
                </div>
            </div>
            <div
                className={'flex flex-col flex-grow h-full w-full p-4 bg-gray-700 border-2 border-dashed border-gray-900'}
            >
                { isLoading ? (
                    <div
                        className={'flex items-center justify-center w-full h-full min-h-full p-4 text-gray-400'}
                    >
                        Loading...
                    </div>
                ) : error ? (
                    <div
                        className={'flex items-center justify-center w-full p-4 border-1 border-dashed border-red-400 bg-red-300 text-red-600'}
                    >
                        {error.name}: {error.message}
                    </div>
                ) : (
                    <div
                        className={'flex flex-col h-full gap-2 overflow-y-scroll scrollbar-none p-1'}
                    >
                        <NewDialogueCard callback={fetchDialogue}/>
                        {
                            dialogue.map((elem: IDialogue) => {
                                return (
                                    <DialogueCard
                                        id={elem.id}
                                        text={elem.text}
                                        position={elem.position}
                                        refreshCallback={fetchDialogue}
                                        choices={elem.choices}
                                    />
                                )
                            })
                        }
                    </div>
                )}
                <PageButtons
                    page={page}
                    pages={pages}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </div>

        </section>
    )
}

export default DialogueTreeEdit;