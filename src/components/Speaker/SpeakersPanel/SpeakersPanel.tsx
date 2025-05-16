import Navbar from "../../Navbar/Navbar.tsx";
import SpeakersList from "../SpeakersList/SpeakersList.tsx";
import {useNavigate} from "react-router-dom";
import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";
import {useEffect, useState} from "react";

const SpeakersPanel = () => {
    const navigate = useNavigate();
    const { projectId } = useProject();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!projectId) {
            navigate("/");
        } else {
            setIsLoading(false);
        }
    }, [projectId, navigate])

    if (isLoading) return (<> </>)
    return (
        <section id="speakers" className={"flex flex-row h-screen"}>
            <Navbar/>
            <SpeakersList
                previous={'speaker'}
                canHide={false}
                paginate={true}
                limit={11}
                noAddButton={false}
            />
        </section>
    )
}

export default SpeakersPanel;