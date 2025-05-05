import {useEffect, useState} from "react";
import {IProject} from "../../interfaces/IProject.ts";
import axios, {AxiosError} from "axios";
import {Link, useParams} from "react-router-dom";
import FormInput from "./FormInput.tsx";

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
                setError(err);
            } else if (err instanceof Error) console.error(err);
            else console.error("Unknown error saving data:", err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 w-full xs:max-w-[95vw] sm:max-w-[95vw] md:max-w-[75vw] lg:max-w-[60vw] xl:max-w-[55vw] bg-gray-600 bg-opacity-60 rounded-2xl flex flex-col h-[90vh]">
                <h1 className="text-[32px] text-gray-300 p-2 m-2 text-center">{name ? name : "Unnamed project"}</h1>
                <form className="flex flex-col flex-grow text-center" onSubmit={saveChanges}>
                    <FormInput
                        type="text"
                        id="name"
                        name="projectName"
                        value={name}
                        label="Project Name"
                        onChangeTarget={setName}
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
                    {isLoading && (
                        <p className="text-blue-500 mt-2">{isLoading}</p>
                    )}
                    {error && (
                        <p className="text-red-500 mt-2">{error?.message}</p>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-auto mb-4">
                        <Link to="/project" className="rounded bg-violet-500 hover:bg-violet-600 p-4 columns-1 transition-colors text-white">Back</Link>
                        <button type="submit" className="rounded bg-violet-500 hover:bg-violet-600 p-4 columns-1 cursor-pointer transition-colors text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectEdit;