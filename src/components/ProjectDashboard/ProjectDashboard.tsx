import Navbar from "../Navbar/Navbar.tsx";
import SpeakersList from "../SpeakersList/SpeakersList.tsx";
import {useProject} from "../ProjectContext/ProjectContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const ProjectDashboard =  () => {
    const navigate = useNavigate();
    const { projectId } = useProject();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        if (!projectId) {
            navigate("/");
        } else {
            setIsLoading(false);
        }
    }, [projectId, navigate])

    if (isLoading) return (<></>);

    return (
        <div id="dashboard" className="h-screen flex flex-row">
            <Navbar />
            <SpeakersList
                previous={"dashboard"}
                canHide={true}
                noAddButton={true}
                paginate={false}
                limit={4}
            />
        </div>
    )
}

export default ProjectDashboard;