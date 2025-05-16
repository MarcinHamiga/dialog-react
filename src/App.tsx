import './App.css';
import ProjectsList from "./components/Project/ProjectsList/ProjectsList.tsx";
import {Route, Routes} from "react-router-dom";
import ProjectEdit from "./components/Project/ProjectEdit/ProjectEdit.tsx";
import ProjectNew from "./components/Project/ProjectNew/ProjectNew.tsx";
import ProjectDashboard from "./components/Project/ProjectDashboard/ProjectDashboard.tsx";
import SpeakerNew from "./components/Speaker/SpeakerNew/SpeakerNew.tsx";
import SpeakerEdit from "./components/Speaker/SpeakerEdit/SpeakerEdit.tsx";
import SpeakersPanel from "./components/Speaker/SpeakersPanel/SpeakersPanel.tsx";
import DialogueTreePanel from "./components/DialogueTree/DialogueTreePanel/DialogueTreePanel.tsx";
import DialogueTreeNew from "./components/DialogueTree/DialogueTreeNew/DialogueTreeNew.tsx";
import DialogueTreeEdit from "./components/DialogueTree/DialogueTreeEdit/DialogueTreeEdit.tsx";

function App() {

  return (
    <>
        <nav>

        </nav>
        <main>
            <Routes>
                <Route path="/" element={<ProjectsList />} />
                <Route path="/project" element={<ProjectsList/>} />
                <Route path="/project/:projectId" element={<ProjectEdit />} />
                <Route path="/project/new" element={<ProjectNew/>} />
                <Route path="/dashboard" element={<ProjectDashboard/>} />
                <Route path="/speaker/new" element={<SpeakerNew />} />
                <Route path="/speaker/edit/:speakerId" element={<SpeakerEdit />} />
                <Route path="/speaker" element={<SpeakersPanel />} />
                <Route path='/dialoguetree' element={<DialogueTreePanel />} />
                <Route path='/dialoguetree/new' element={<DialogueTreeNew />} />
                <Route path='/dialoguetree/edit' element={<DialogueTreeEdit />} />
            </Routes>
        </main>
    </>
  )
}

export default App
