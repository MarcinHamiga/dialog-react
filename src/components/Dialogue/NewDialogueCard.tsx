import axios from "axios";
import {IDialogue} from "../../interfaces/IDialogue.ts";
import {useProject} from "../Project/ProjectContext/ProjectContext.tsx";

type NewDialogueCardProps = {
    callback: () => Promise<void>
}

const NewDialogueCard = ({ callback }: NewDialogueCardProps) => {
    const { dialogueTreeId } = useProject();

    async function create() {
        const data: Partial<IDialogue> = {
            text: "New dialogue",
            dialogueTree: dialogueTreeId
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/dialogue', data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            callback();
        }
    }

    return (
        <div
            className={'flex flex-col w-full p-2 gap-2'}
        >
            <button
                className={'flex flex-row w-full ' +
                    'bg-gray-800 border-1 border-dashed rounded-xl p-2 items-center justify-center ' +
                    'text-center shadow-lg text-2xl hover:shadow-xl hover:scale-102 text-gray-200 ' +
                    'border-gray-900 cursor-pointer transition duration-300 ease-in-out'}
                onClick={create}
            >
                +
            </button>
        </div>

    );
}

export default NewDialogueCard;