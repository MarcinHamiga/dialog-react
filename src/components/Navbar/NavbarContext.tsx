import {createContext, useContext, useEffect, useState} from "react";

type NavbarContextType = {
    isOpen: boolean;
    toggle: () => void;
};

const NavbarContext = createContext<NavbarContextType>({
    isOpen: true,
    toggle: () => {}
});

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem("navbarOpen") === "true";
        setIsOpen(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("navbarOpen", String(isOpen));
    }, [isOpen]);

    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <NavbarContext.Provider value={{ isOpen, toggle}}>
            {children}
        </NavbarContext.Provider>
    )
}