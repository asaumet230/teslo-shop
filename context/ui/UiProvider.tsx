import { useReducer } from 'react';

import { UiContext, uiReducer } from './';


interface uiProviderProps {
    children: JSX.Element | JSX.Element[],
}

export interface UiState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}


export const UiProvider = ({ children }: uiProviderProps) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }


    return (
        <UiContext.Provider value={{
            ...state,
            toggleSideMenu
        }}>

            {children}
        </UiContext.Provider>
    )
};