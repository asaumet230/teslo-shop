import { createContext } from 'react';

import { IUser } from '../../interfaces';

interface ContextProps {

    errorMessage: string;
    isErrorLogged: boolean;
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
    startAuth: () => void;

}


export const AuthContext = createContext<ContextProps>({} as ContextProps);