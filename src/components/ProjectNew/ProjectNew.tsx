import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import FormInput from "../ProjectEdit/FormInput.tsx";
import {Link, useNavigate} from "react-router-dom";
import {IProject} from "../../interfaces/IProject.ts";

const ProjectNew = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<Error | AxiosError | null>(null);
    const [saveStatus, setSaveStatus] = useState<string>("");

    useEffect(() => {
        const curDate = new Date();
        setName(`UnnamedProject-${curDate.toLocaleDateString()}-${curDate.toLocaleTimeString()}`);
    }, [])


    async function createProject(e: React.FormEvent) {
        e.preventDefault();
        setSaveStatus("Saving...");
        setError(null);
        if (!name) {
            const curDate = new Date();
            setName(`UnnamedProject-${curDate.toLocaleDateString()}-${curDate.toLocaleTimeString()}`);
        }
        const formData: IProject = {
            name,
            description,
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/project", formData);
            const data = response.data as IProject;
            console.log(data)
            setError(null);
            if (data.id) {
                console.log(data.id);
                navigate(`/project`);
            }

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
                <h1 className="text-[32px] text-gray-300 p-2 m-2 text-center">{name ? name : "Unnamed Project"}</h1>
                <form className="flex flex-col flex-grow text-center" onSubmit={createProject}>
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
                    {error && (
                        <p className="text-red-500 mt-2">{error?.message}</p>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-auto mb-4">
                        <Link to="/project" className="rounded bg-violet-500 hover:bg-violet-700 p-4 columns-1 transition-colors text-white">Back</Link>
                        <button type="submit" className="rounded bg-violet-500 hover:bg-violet-700 p-4 columns-1 cursor-pointer transition-colors text-white">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectNew;