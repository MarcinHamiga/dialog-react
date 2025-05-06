
import {useCallback, useEffect, useState} from "react";
import axios, { AxiosError } from 'axios';
import ProjectCard from "../ProjectCard/ProjectCard.tsx";
import {IProject} from "../../interfaces/IProject.ts";
import NewProjectCard from "../NewProjectCard/NewProjectCard.tsx";

const ProjectsList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [error, setError] = useState<Error | AxiosError | null>(null);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + '/project');

            // Ensure we're setting an array
            const projectsData = Array.isArray(response.data)
                ? response.data
                : response.data.data || response.data.projects || [];

            console.log("Projects data after processing:", projectsData);
            setProjects(projectsData);
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
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-sm md:text-lg lg:text-xl text-red-600">{error.name}: {error.message}</p>
            </div>
        );
    }

    // Safety check - ensure projects is an array before rendering
    const projectsArray = Array.isArray(projects) ? projects : [];

    return (
        <div className="container mx-auto px-4 py-8 min-w-[80%] h-full">
            <h1 className="text-violet-500 text-5xl font-semibold mb-2">Projects</h1>
            <hr
                className="mb-4 border-1 w-full"
            />
            {projectsArray.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {projectsArray.map((project: IProject) => (
                        <ProjectCard
                            key={project.id}
                            projectId={project.id}
                            projectName={project.name}
                            projectDesc={project.description}
                            updateDate={project.updatedAt}
                            onDeleteSuccess={fetchProjects}
                        />
                    ))}
                    <NewProjectCard/>
                </div>
            )}
        </div>
    );
}

export default ProjectsList;