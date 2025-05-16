import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";
import {FormEvent, useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import FormInput from "../../Project/ProjectEdit/FormInput.tsx";
import {getFullDate} from "../../../utils.ts";
import FormButton from "../../Buttons/FormButton.tsx";

type DialogueTreeEditFormProps = {
    editable:  boolean;
}

const DialogueTreeEditForm = ({editable}: DialogueTreeEditFormProps) => {
    const { dialogueTreeId } = useProject();
    const [treeName, setTreeName] = useState<string>('');
    const [treeId, setTreeId] = useState<string>('');
    const [updatedAt, setUpdatedAt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + '/dialoguetree/' + dialogueTreeId);
            setTreeName(response.data?.treeName);
            setTreeId(response.data?.treeId);
            setUpdatedAt(response.data?.updatedAt);
        } catch (err) {
            if (axios.isAxiosError(err) || err instanceof Error) {
                setError(err);
                console.error(err);
            } else {
                setError(new Error('An unexpected error occured.'));
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    }, [dialogueTreeId]);

    useEffect(() => {
        fetchData();
    }, [dialogueTreeId, fetchData]);

    async function submit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        const formData = {
            treeName,
            treeId,
        };

        try {
            await axios.patch(import.meta.env.VITE_API_URL + '/dialoguetree/' + dialogueTreeId, formData);
        } catch (err) {
            if (axios.isAxiosError(err) ||  err instanceof Error) {
                setError(err);
                console.error(err);
            } else {
                setError(new Error('An unexpected error occured.'));
                console.error(err);
            }
        } finally {
           fetchData();
        }
    }
    if (loading) {
        return (
            <div
                className={'bg-blue-400 text-blue-500 rounded shadow-lg border-1 border-dashed border-blue-500 text-center flex flex-col justify-center'}
            >
                Loading...
            </div>
        )
    }
    return (
        <form
            onSubmit={submit}
            className={'flex flex-col justify-center w-[80%] mx-auto gap-4'}
        >
            <FormInput
                type={'text'}
                id={'treeName'}
                name={'treeName'}
                value={treeName}
                label={'Tree Name'}
                onChangeTarget={setTreeName}
                placeholder={'Enter a tree name...'}
                required={true}
                disabled={!editable}
            />
            <FormInput
                type={'text'}
                id={'treeId'}
                name={'treeId'}
                value={treeId}
                label={'Tree Id'}
                onChangeTarget={setTreeId}
                placeholder={'Enter a tree id...'}
                required={true}
                disabled={!editable}
            />
            <div
                className={'w-full flex justify-center'}
            >
                <div
                    className={'max-h-16 max-w-32 w-full flex items-center justify-center'}
                >
                    <FormButton
                        text={'Save'}
                        disabled={!editable}
                    />
                </div>
            </div>

            <div
                className={'flex flex-row w-full justify-between mt-16'}
            >
                <span className={'text-gray-400 text-sm'}>Last edited:</span>
                <span className={'text-gray-400 text-sm'}>{getFullDate(new Date(updatedAt))}</span>
            </div>
            {error && (
                <div
                    className={'bg-red-400 text-red-500 rounded shadow-lg border-1 border-dashed border-red-500 text-center flex flex-col justify-center'}
                >
                    {error.name} : {error.message}
                </div>
            )}
        </form>
    )
}

export default DialogueTreeEditForm;