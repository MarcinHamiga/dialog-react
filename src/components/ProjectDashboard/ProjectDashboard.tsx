import Navbar from "../Navbar/Navbar.tsx";
import SpeakersList from "../SpeakersList/SpeakersList.tsx";

const ProjectDashboard =  () => {
    return (
        <div id="dashboard" className="h-screen flex flex-row">
            <Navbar />
            <SpeakersList
                previous={"dashboard"}
                canHide={true}
                limited={true}
                noAddButton={true}
            />
        </div>
    )
}

export default ProjectDashboard;