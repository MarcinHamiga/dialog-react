import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

type ProjectContextType = {
    projectId: string;
    projectName: string;
    projectDesc?: string;
    setProjectId: (projectId: string) => void;
}

const ProjectContext = createContext<ProjectContextType>({
    projectId: "",
    projectName: "",
    projectDesc: "",
    setProjectId: () => {},
});

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [projectId, setProjectId] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('');
    const [projectDesc, setProjectDesc] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                try {
                    const response =  await axios.get(import.meta.env.VITE_API_URL + "/project/" + projectId);
                    setProjectName(response.data.name)
                    setProjectDesc(response.data.description)
                } catch (err) {
                    console.error(err);
                }
            }
        }
        
        fetchData();
    }, [projectId])

    return (
        <ProjectContext.Provider value={{ projectId, setProjectId, projectName, projectDesc }}>
            {children}
        </ProjectContext.Provider>
    )

}