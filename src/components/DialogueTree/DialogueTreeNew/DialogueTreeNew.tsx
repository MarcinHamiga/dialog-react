import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";
import {FormEvent, useState} from "react";
import FormInput from "../../Project/ProjectEdit/FormInput.tsx";
import FormButton from "../../Buttons/FormButton.tsx";
import FormLinkButton from "../../Buttons/FormLinkButton.tsx";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";

const DialogueTreeNew = () => {
    const navigate = useNavigate();
    const { projectId } = useProject();
    const [name,  setName] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [error, setError] = useState<AxiosError | Error | null>(null);

    async function saveChanges(e: FormEvent) {
        e.preventDefault();
        const saveData = {
            projectId,
            treeName: name,
            treeId: id,
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/dialoguetree', saveData);
            console.log(response.data);
            navigate("/dialoguetree");
        } catch (err) {
            if (axios.isAxiosError(err) || err instanceof Error) {
                console.log("Error: ", err.message);
                setError(err);
            } else {
                console.log("Unknown error: ", err);
                setError(new Error("An unknown error has occured"));
            }
        }
    }

    return (
        <div className="flex flex-col justify-between flex-grow mx-auto p-2 sm:w-full md:w-full lg:w-[80%] xl:w-[70%] min-h-screen gap-2">
            {error && (
                <div
                    className={"text-red-600 text-lg w-full h-24 text-center border-1 border-red-700 border-dashed bg-red-400 rounded"}
                >
                    {error.name}: {error.message}
                </div>
            )}
            <form
                className="flex flex-col flex-grow items-center w-full lg:w-[80%] xl:w-[70%] mx-auto bg-gray-800 rounded-lg shadow-md justify-between"
                onSubmit={(e) => {saveChanges(e)}}
            >
                <div
                    className={`flex flex-col w-full`}
                >
                    <h1 className="text-[2.5rem] font-bold text-base text-center mb-4 text-white">
                        {name ? name : "Unnamed Dialogue Tree"}
                    </h1>
                    <FormInput
                        type={"text"}
                        name={"name"}
                        id={`name`}
                        placeholder={`Unnamed tree...`}
                        value={name}
                        onChangeTarget={setName}
                        required={true}
                        label={`Tree name`}
                    />
                    <FormInput
                      type={"text"}
                      name={"id"}
                      id={"id"}
                      placeholder={`Tree ID...`}
                      value={id}
                      onChangeTarget={setId}
                      required={true}
                      label={`Tree ID`}
                    />
                </div>
                <div
                    className={`flex flex-row gap-2 w-[80%] mx-auto mb-4`}
                >
                    <FormLinkButton
                        to={'/dialoguetree'}
                        text={"Back to Dialogue Tree"}
                    />
                    <FormButton
                        text={"Save"}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default DialogueTreeNew;