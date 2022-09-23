import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;
    toggleSideMenu: () => void;
}


export const UiContext = createContext<ContextProps>({} as ContextProps);