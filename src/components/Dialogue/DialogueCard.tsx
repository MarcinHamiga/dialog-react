import arrowUp from '../../assets/arrow_drop_up_32dp_E3E3E3_FILL0_wght400_GRAD0_opsz40.png';
import arrowDown from '../../assets/arrow_drop_down_32dp_E3E3E3_FILL0_wght400_GRAD0_opsz40.png';
import Button from "../Buttons/Button.tsx";
import axios from "axios";
import {useProject} from "../Project/ProjectContext/ProjectContext.tsx";
import {IChoice} from "../../interfaces/IChoice.ts";
import ChoiceCard from "../Choice/ChoiceCard.tsx";

type DialogueCardProps = {
    id: string
    text: string;
    position: number;
    refreshCallback: () => Promise<void>;
    speaker?: string;
    choices?: IChoice[];
}

const DialogueCard = ({id, text, position, refreshCallback, speaker, choices}: DialogueCardProps) => {
    const { setDialogueId } = useProject();

    function edit() {
        setDialogueId(id);
    }

    async function remove() {
        try {
            const response = await axios.delete(`http://localhost:3000/dialogue/${id}`);
            console.log(response)
        } catch (err) {
            console.error(err);
        } finally {
            await refreshCallback();
        }
    }

    async function moveUp() {
        refreshCallback();
    }

    async function moveDown() {
        refreshCallback();
    }

    return (
        <div
            className={'flex flex-col w-full p-2 gap-2'}
        >
            <div className="flex flex-row w-full bg-gray-800 border-1 border-dashed rounded-xl p-2 hover:scale-102 transition-all ease-in-out duration-300 shadow-md hover:shadow-lg">
                <div
                    className={'flex flex-col w-[32px] p-1'}
                >
                    <button
                        onClick={moveUp}
                        className="hover:shadow-sm hover:bg-gray-900"
                    >
                        <img src={arrowUp} alt={'arrow up'} />
                    </button>
                    <span
                        className={'text-xs text-gray-300 text-center'}
                    >
                    {position}
                </span>
                    <button
                        onClick={moveDown}
                        className={'hover:shadow-sm hover:bg-gray-900'}
                    >
                        <img src={arrowDown} alt={'arrow down'} />
                    </button>
                </div>
                <div
                    className={'flex flex-col w-full p-1'}
                >
                <span
                    className={'text-lg text-gray-200'}
                >
                    {speaker}
                </span>
                    <span
                        className={'text-md text-gray-300 overflow-y-scroll pl-2 scrollbar-thin'}
                    >
                    {text}
                </span>
                </div>
                <div
                    className={'flex flex-col w-24 p-1 gap-2'}
                >
                    <Button
                        text={'Edit'}
                        onClick={edit}
                        customWidth={'w-full hover:scale-102'}
                    />
                    <Button
                        text={'Remove'}
                        onClick={remove}
                        customWidth={'w-full hover:scale-102'}
                        customColor={'bg-red-500 hover:bg-red-600'}
                    />
                </div>
            </div>
            { choices ? choices.map((choice) => {
                console.log(choice);
                return (
                    <ChoiceCard choice={choice} />
                )
            }) : ("")}
        </div>

    );
}

export default DialogueCard;