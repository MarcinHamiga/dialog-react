import './App.css';
import ProjectsList from "./components/ProjectsList/ProjectsList.tsx";
import {Route, Routes} from "react-router-dom";
import ProjectEdit from "./components/ProjectEdit/ProjectEdit.tsx";
import ProjectNew from "./components/ProjectNew/ProjectNew.tsx";
import ProjectDashboard from "./components/ProjectDashboard/ProjectDashboard.tsx";
import SpeakerNew from "./components/SpeakerNew/SpeakerNew.tsx";
import SpeakerEdit from "./components/SpeakerEdit/SpeakerEdit.tsx";
import SpeakersPanel from "./components/SpeakersPanel/SpeakersPanel.tsx";

function App() {

  return (
    <>
        <nav>

        </nav>
        <main>
            <Routes>
                <Route path="/" element={<ProjectsList />} />
                <Route path="/project" element={<ProjectsList/>}/>
                <Route path="/project/:projectId" element={<ProjectEdit />}/>
                <Route path="/project/new" element={<ProjectNew/>}/>
                <Route path="/dashboard" element={<ProjectDashboard/>}/>
                <Route path="/speaker/new" element={<SpeakerNew />}/>
                <Route path="/speaker/edit/:speakerId" element={<SpeakerEdit />} />
                <Route path="/speaker" element={<SpeakersPanel />} />
            </Routes>
        </main>
    </>
  )
}

export default App
