import {useParams} from "react-router-dom";
import Navbar from "../Navbar/Navbar.tsx";
import {useEffect, useState} from "react";
import {DashboardParams} from "../../interfaces/IDashboardParams.ts";
import SpeakersList from "../SpeakersList/SpeakersList.tsx";
import axios from "axios";

const ProjectDashboard =  () => {
    const params = useParams<DashboardParams>();
    const [projectTitle, setProjectTitle] = useState<string>('');
    const projectId = params.projectId as string;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchProjectTitle = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL +  '/project/' + params.projectId);
                console.log(response.data);
                setProjectTitle(response?.data.name);
            } catch (err) {
                    console.error(err);
            }
        }

        fetchProjectTitle();
    }, [params.projectId]);

    function toggleSidebar() {
        setSidebarOpen(!isSidebarOpen);
    }
    return (
        <div id="dashboard" className="h-screen flex flex-row">
            <Navbar
                projectId={projectId}
                isOpen={isSidebarOpen}
                toggle={toggleSidebar}
                projectTitle={projectTitle}
            />
            <SpeakersList />
        </div>
    )
}

export default ProjectDashboard;