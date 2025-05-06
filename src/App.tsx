import './App.css';
import ProjectsScreen from "./components/ProjectsScreen/ProjectsScreen.tsx";
import {Route, Routes} from "react-router-dom";
import ProjectEdit from "./components/ProjectEdit/ProjectEdit.tsx";
import ProjectNew from "./components/ProjectNew/ProjectNew.tsx";
import ProjectDashboard from "./components/ProjectDashboard/ProjectDashboard.tsx";
import SpeakerNew from "./components/SpeakerNew/SpeakerNew.tsx";

function App() {

  return (
    <>
        <nav>

        </nav>
        <main>
            <Routes>
                <Route path="/" element={<ProjectsScreen />} />
                <Route path="/project" element={<ProjectsScreen/>}/>
                <Route path="/project/:projectId" element={<ProjectEdit />}/>
                <Route path="/project/new" element={<ProjectNew/>}/>
                <Route path="/project/:projectId/dashboard" element={<ProjectDashboard/>}/>
                <Route path="/project/:projectId/speaker/new" element={<SpeakerNew />}/>
            </Routes>
        </main>
    </>
  )
}

export default App
