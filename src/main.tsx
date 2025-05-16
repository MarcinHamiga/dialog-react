import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {HashRouter} from "react-router-dom";
import {NavbarProvider} from "./components/Navbar/NavbarContext.tsx";
import {ProjectProvider} from "./components/Project/ProjectContext/ProjectContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <HashRouter>
          <ProjectProvider>
              <NavbarProvider>
                  <App />
              </NavbarProvider>
          </ProjectProvider>
      </HashRouter>
  </StrictMode>,
)
