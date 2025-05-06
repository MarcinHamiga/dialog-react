import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {NavbarProvider} from "./components/Navbar/NavbarContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <NavbarProvider>
              <App />
          </NavbarProvider>
      </BrowserRouter>
  </StrictMode>,
)
