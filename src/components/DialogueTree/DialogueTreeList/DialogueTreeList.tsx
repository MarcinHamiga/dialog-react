import Button from "../../Buttons/Button.tsx";
import {useCallback, useEffect, useState} from "react";
import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";
import {IDialogueTree} from "../../../interfaces/IDialogueTree.ts";
import axios, {AxiosError} from "axios";
import NewElementCard from "../../NewElementCard/NewElementCard.tsx";
import DialogueTreeCard from "../DialogueTreeCard/DialogueTreeCard.tsx";
import PageButtons from "../../Buttons/PageButtons.tsx";

interface DialogueTreeListProps {
    previous: "dashboard" | "dialoguetree";
    canHide: boolean,
    noAddButton: boolean
    paginate?: boolean,
    limit?: number,
}

const DialogueTreeList = ({previous="dashboard", canHide=true, noAddButton=true, paginate=false, limit=4}: DialogueTreeListProps) => {
    const { projectId } = useProject();
    const [treesHidden, setTreesHidden] = useState<boolean>(false);
    const [dialogueTrees,  setDialogueTrees] = useState<IDialogueTree[]>([]);
    const [error, setError] = useState<AxiosError | Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pages,  setPages] = useState<number>(1);

    const refresh = useCallback(async () => {
        setIsLoading(true);
        try {
            let hasQueryParams = false;
            let queryString = import.meta.env.VITE_API_URL + "/dialoguetree/project/" + projectId
            if (limit) {
                const prefix = hasQueryParams ? "&" : "?";
                queryString += `${prefix}?${limit}`;
                hasQueryParams = true;
            }
            if (paginate) {
                const prefix =  hasQueryParams ? "&" : "?";
                queryString += `${prefix}?${paginate}`;
                hasQueryParams = true;
            }
            const prefix =  hasQueryParams ? `&` : `?`;
            queryString +=  `${prefix}order=desc`;
            hasQueryParams = true;
            queryString += `${prefix}page=${page}`;
            console.log("QueryString: ", queryString)
            const response = await axios.get(queryString);
            setDialogueTrees(response.data.data);
            setPages(response.data.pages);
        } catch (err) {
            if (axios.isAxiosError(err) || err instanceof Error) {
                setError(err);
                console.log(err);
            } else {
                setError(new Error("An unknown error has occured"));
                console.log(err);
            }
        } finally {
            setIsLoading(false);
        }
    }, [projectId, paginate, limit])

    useEffect(() => {
        refresh()
    }, [projectId, refresh])

    function toggleVisibility() {
        setTreesHidden(!treesHidden);
    }

    function nextPage() {
        setPage(page + 1);
    }

    function prevPage() {
        setPage(page - 1);
    }

    return (
      <section id="dialogueTreeList" className={`${treesHidden ? "max-h-[82px]" : "h-full"} flex flex-col flex-grow justify-between p-6 overflow-y-hidden bg-gray-700`}>
        <div className="w-full max-w-full">
            <div className="flex flex-row justify-between flex-grow">
                <h2
                    className="text-violet-500 text-4xl font-semibold"
                >
                    Dialogue trees
                </h2>
                <div className="flex flex-row gap-2">
                    <Button text={"Refresh"} onClick={refresh} />
                    {canHide ? (<Button
                        text={`${treesHidden ? "Show" : "Hide"}`}
                        onClick={toggleVisibility}
                    />) : ("")}
                </div>
            </div>
            <hr className="p-2 mt-2 w-full" />
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
            ) : error ? (
                    <div className="bg-red-900/30 border border-red-700 text-red-100 p-4 rounded-md">
                        <p className="font-medium">There was a problem fetching speaker data:</p>
                        <p className="mt-1">{error.message}</p>
                    </div>
            ) : dialogueTrees.length === 0 ? (
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out origin-top
                            ${
                        treesHidden
                            ? "opacity-0 scale-y-0 pointer-events-none"
                            : "opacity-100 scale-y-100"
                    }
                        `}
                >
                    {!noAddButton ? (<NewElementCard to={'/dialoguetree/new'} previous={previous}/>) : ("")}
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-xl mb-4 col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3">No dialogue trees found for this project</p>
                        <p>Create your first dialogue tree to get started</p>
                    </div>
                </div>
            ) : (
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out origin-top
                            ${
                        treesHidden
                            ? "opacity-0 scale-y-0 pointer-events-none"
                            : "opacity-100 scale-y-100"
                    }
                        `}
                >
                    {!noAddButton ? (<NewElementCard
                        to={'/dialoguetree/new'}
                        previous={previous}/>
                    ) : ("")}
                    {dialogueTrees.map((elem: IDialogueTree) => {
                        return <DialogueTreeCard
                            id={elem.id}
                            treeName={elem.treeName}
                            treeId={elem.treeId}
                            createdAt={elem.createdAt}
                            updatedAt={elem.updatedAt}
                            onDeleteSuccess={refresh}
                            previous={previous}
                        />
                    })}
                </div>

            )}
        </div>
          {paginate && (
              <PageButtons
                  page={page}
                  pages={pages}
                  nextPage={nextPage}
                  prevPage={prevPage}
              />
          )}
      </section>
    );
}

export default DialogueTreeList;