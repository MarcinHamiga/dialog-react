import Navbar from "../../Navbar/Navbar.tsx";
import SpeakersList from "../../Speaker/SpeakersList/SpeakersList.tsx";
import {useProject} from "../ProjectContext/ProjectContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DialogueTreeList from "../../DialogueTree/DialogueTreeList/DialogueTreeList.tsx";

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
        <div id="dashboard" className="h-screen flex flex-row transition-all">
            <Navbar />
            <div
                className="flex flex-col flex-grow h-full w-full"
            >
                <SpeakersList
                    previous={"dashboard"}
                    canHide={true}
                    noAddButton={true}
                    paginate={false}
                    limit={4}
                />
                <DialogueTreeList
                    previous={"dashboard"}
                    canHide={true}
                    noAddButton={true}
                    paginate={false}
                    limit={4}
                />
            </div>

        </div>
    )
}

export default ProjectDashboard;