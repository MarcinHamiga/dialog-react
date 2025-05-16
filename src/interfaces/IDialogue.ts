import {IChoice} from "./IChoice.ts";

export interface IDialogue {
    id: string;
    text: string;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
    choices: IChoice[];
    position: number;
    next?: string;
    previous?: string;
    dialogueTree: string;
    speaker?: string;
}