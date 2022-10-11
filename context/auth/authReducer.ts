import { AuthState } from './';
import { IUser } from '../../interfaces';


type AuthAction =
    | { type: '[AUTH] - Start Auth' }
    | { type: '[AUTH] - Login', payload: IUser }
    | { type: '[AUTH] - Logout' }
    | { type: '[AUTH] - Register', payload: IUser }
    | { type: '[AUTH] - Auth Error', payload: string };


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {

        case '[AUTH] - Start Auth':
            return {
                ...state,
                isLoggedIn: false,
                isErrorLogged: false,
                errorMessage: '',
                user: undefined
            }

        case '[AUTH] - Login':
            return {
                ...state,
                isLoggedIn: true,
                isErrorLogged: false,
                errorMessage: '',
                user: action.payload
            }

        case '[AUTH] - Logout':
            return {
                ...state,
                errorMessage: '',
                isErrorLogged: false,
                isLoggedIn: false,
                user: undefined
            }

        case '[AUTH] - Register':
            return {
                ...state,
                isLoggedIn: true,
                isErrorLogged: false,
                errorMessage: '',
                user: action.payload
            }

        case '[AUTH] - Auth Error':
            return {
                ...state,
                errorMessage: action.payload,
                isErrorLogged: true,
                isLoggedIn: false,
                user: undefined
            }
        default:
            return state;
    }
}