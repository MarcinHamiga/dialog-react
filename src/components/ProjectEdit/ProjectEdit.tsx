import {useEffect, useState} from "react";
import {IProject} from "../../interfaces/IProject.ts";
import axios, {AxiosError} from "axios";
import {useParams} from "react-router-dom";
import FormInput from "./FormInput.tsx";
import FormLinkButton from "../buttons/FormLinkButton.tsx";
import FormButton from "../buttons/FormButton.tsx";

interface EditRouteParams extends Record<string, string | undefined> {
    projectId: string;
}

const ProjectEdit = () => {
    const params = useParams<EditRouteParams>();
    const projectId = params.projectId;
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | AxiosError | null>(null);
    const [saveStatus, setSaveStatus] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + `/project/${projectId}`);
                const data = await response.data as IProject;
                setName(data.name);
                setDescription(data?.description as string);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error("Axios error fetching data:", err.message, err.response?.data);
                    setError(err);
                } else if (err instanceof Error) {
                    console.error("Error fetching data:", err.message);
                    setError(err);
                } else {
                    console.error("Unknown error fetching data:", err);
                    setError(new Error('An unknown error occured.'));
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [projectId])

    async function saveChanges(e: React.FormEvent) {
        // Prevent the default form submission behavior
        e.preventDefault();

        setSaveStatus("Saving...");
        if (!name) {
            setError(new Error("No name was given. Please enter a name."))
            setSaveStatus("")
            return
        }
        const formData: IProject = {
            name,
            description,
        }

        try {
            const response = await axios.patch(import.meta.env.VITE_API_URL + `/project/${projectId}`, formData);
            setSaveStatus("Saved successfully!");
            console.log("Save response:", response.data);
            setError(null);
        } catch(err) {
            setSaveStatus("Error saving");
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err.message, err.code);
                if (err.status === 400) {
                    err.message = "Invalid request."
                }
                setError(err);
            } else if (err instanceof Error) {
                console.error(err)
                setError(err);
            } else {
                console.error("Unknown error saving data:", err);
                setError(new Error('An unknown error occured.'));
            }
        }
    }

    return (
        <div className="flex flex-col justify-between flex-grow mx-auto p-2 sm:w-full md:w-full lg:w-[80%] xl:w-[70%] min-h-screen">
            <form
                className="flex flex-col grow items-center sm:w-full md:w-full lg:w-[80%] xl:w-[70%] mx-auto bg-gray-800 rounded-lg shadow-md justify-between"
                onSubmit={saveChanges}
            >
                <div className="flex flex-col w-full">
                    <h1 className="text-[2.5rem] font-bold text-base text-center mb-4 text-white">
                        Editing: {name ? name : "Unnamed project"}
                    </h1>

                    <FormInput
                        type="text"
                        id="name"
                        name="projectName"
                        value={name}
                        label="Project Name"
                        onChangeTarget={setName}
                        required
                    />

                    <FormInput
                        type="text"
                        id="desc"
                        name="description"
                        value={description}
                        label="Project Description"
                        onChangeTarget={setDescription}
                    />

                    {saveStatus && (
                        <p className={`mt-2 ${saveStatus.includes("Error") ? "text-red-500" : "text-blue-400"}`}>
                            {saveStatus}
                        </p>
                    )}
                    {isLoading && <p className="text-blue-500 mt-2">{isLoading}</p>}
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2 w-[80%] mx-auto mb-4">
                    <FormLinkButton
                        to={'/project'}
                        text='Back to projects'
                    />
                    <FormButton
                        type='submit'
                        text='Create project'
                    />
                </div>
            </form>
        </div>
    )
}

export default ProjectEdit;