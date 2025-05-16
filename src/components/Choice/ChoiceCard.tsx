import {IChoice} from "../../interfaces/IChoice.ts";

type ChoiceCardProps = {
    choice: IChoice;
}

const ChoiceCard = ({ choice }: ChoiceCardProps) => {
    return (
        <div
            className={'flex flex-row grow w-full'}
        >
            <span className={'w-[25%] min-w-[25%]'} />
            <div
                className={'flex flex-col w-full p-2 bg-gray-800 rounded-xl border-1 border-dashed border-gray-900 text-md text-gray-300 hover:scale-102 transition-all ease-in-out duration-200 hover:shadow-lg shadow-md'}
            >
                {choice.text}
            </div>
        </div>
    )
}

export default ChoiceCard;