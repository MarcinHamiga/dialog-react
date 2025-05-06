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
            setError(new Error("No name was given. Please enter a name."))
            setSaveStatus("");
            return
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
                onSubmit={createProject}
            >
                <div className="flex flex-col w-full">
                    <h1 className="text-[2.5rem] font-bold text-base text-center mb-4 text-white">
                        {name ? name : "Untitled Project"}
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
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2 w-[80%] mx-auto mb-4">
                    <Link
                        to="/project"
                        className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full text-center p-4 text-white text-xl transition-colors duration-100 rounded-xl shadow-md"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full text-center p-4 text-white text-xl transition-colors duration-100 rounded-xl shadow-md"
                    >
                        Create Project
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ProjectNew;