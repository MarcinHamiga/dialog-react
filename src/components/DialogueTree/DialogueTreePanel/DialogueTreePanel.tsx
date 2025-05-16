import Navbar from "../../Navbar/Navbar.tsx";
import DialogueTreeList from "../DialogueTreeList/DialogueTreeList.tsx";
import {useNavigate} from "react-router-dom";
import {useProject} from "../../Project/ProjectContext/ProjectContext.tsx";
import {useEffect, useState} from "react";

const DialogueTreePanel = () => {
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
        <section className={"flex flex-row h-screen"}>
            <Navbar/>
            <DialogueTreeList
                previous={'dialoguetree'}
                canHide={false}
                noAddButton={false}
                paginate={true}
                limit={11}
            />
        </section>
    );
}

export default DialogueTreePanel;