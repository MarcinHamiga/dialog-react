import Navbar from "./Navbar/Navbar.tsx";
import SpeakersList from "./SpeakersList/SpeakersList.tsx";

const SpeakersPanel = () => {

    return (
        <div id="speakers" className={"flex flex-row h-screen"}>
            <Navbar/>
            <SpeakersList
                previous={'speaker'}
                canHide={false}
                limited={false}
                noAddButton={false}
            />
        </div>
    )
}

export default SpeakersPanel;