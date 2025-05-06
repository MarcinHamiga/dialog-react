import {Link, useParams} from "react-router-dom";
import logoUrl from '../../assets/menu_48dp_E3E3E3_FILL0_wght400_GRAD0_opsz48.svg';
import {useEffect, useState} from "react";
import {DashboardParams} from "../../interfaces/IDashboardParams.ts";
import axios from "axios";
import {useNavbar} from "./NavbarContext.tsx";

const Navbar = () => {
    const params = useParams<DashboardParams>();
    const [projectTitle, setProjectTitle] = useState<string>('');
    const projectId = params.projectId as string;
    const {isOpen, toggle} = useNavbar();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProjectTitle = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL +  '/project/' + params.projectId);
                console.log(response.data);
                setProjectTitle(response?.data.name);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProjectTitle();
    }, [params.projectId]);
    if (isLoading) {
        return (
            <div
                className={`
                bg-gray-900 text-white h-full
                flex flex-col transition-all duration-300 ease-in-out
                flex-shrink-0
                ${isOpen ? 'w-64' : 'w-24'}
            `}
            >
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`
                bg-gray-900 text-white h-full
                flex flex-col transition-all duration-300 ease-in-out
                flex-shrink-0
                ${isOpen ? 'w-64' : 'w-24'}
            `}
        >
            <div className="p-4 flex flex-col items-center justify-between">
                <h2
                    className={`
                        text-xl font-semibold
                        transform transition-all duration-300 ease-in-out
                        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 absolute'}
                        mb-2
                    `}
                >
                    {projectTitle ? projectTitle : 'Menu'}
                </h2>
                <button
                    onClick={toggle}
                    className="p-2 rounded-md bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-12 h-12 transition-all duration-200"
                    aria-label={isOpen ? 'Hide Menu'  : 'Show Menu'}
                    aria-expanded={isOpen}
                >
                    <img
                        src={logoUrl}
                        alt="hamburger_menu"
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                    />
                </button>
            </div>
            <nav className="flex-grow px-4 pb-4 overflow-hidden">
                <ul className="space-y-3">
                    <NavItem isOpen={isOpen} to={`/project/${projectId}/dashboard`} label={"Dashboard"} icon={"📋"} />
                    <NavItem isOpen={isOpen} to={`/project/${projectId}/speaker`} label="Speakers" icon="👤" />
                    <NavItem isOpen={isOpen} to={`/project/${projectId}/dialoguetree`} label="Dialogue trees" icon="🌳" />
                    <NavItem isOpen={isOpen} to={'/project'} label="Exit to project list" icon="🗃️" />
                </ul>
            </nav>
        </div>
    )
}

// Extracted reusable component for nav items
const NavItem = ({ isOpen = false, to = "", label = "", icon = "" }) => (
    <li className="transform transition-all duration-300 ease-in-out">
        <Link
            to={to}
            className={`
                flex items-center justify-center lg:justify-start
                p-3 rounded-md hover:bg-violet-400 
                transition-all duration-300 ease-in-out
                ${isOpen ? 'text-lg' : 'text-2xl'}
                w-full h-full
            `}
        >
            <span className={`transition-all duration-300 ${isOpen ? 'mr-3 scale-75' : 'scale-100 mx-auto'}`}>
                {icon}
            </span>
            <span
                className={`
                    whitespace-nowrap 
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-4 absolute'}
                `}
            >
                {label}
            </span>
        </Link>
    </li>
);

export default Navbar;