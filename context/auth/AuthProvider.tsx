import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';



interface AuthProviderProps {
    children: JSX.Element | JSX.Element[],
}

export interface AuthState {
    isLoggedIn: boolean;
    isErrorLogged: boolean;
    errorMessage: string;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    isErrorLogged: false,
    errorMessage: '',
    user: undefined
}


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const { data, status } = useSession();
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter()


    useEffect(() => {

        if (status === 'authenticated') {
            console.log(data.user);
            // dispatch({ type: '[AUTH] - Login', payload: data.user as IUser })

        }

    }, [status, data]);


    //? En este punto ya no utilizo mi autentcación personalizada sino me voy a basar e NextAuth:
    // useEffect(() => {

    //     if (!Cookies.get('token')) return;
    //     checkToken();

    // }, []);


    const checkToken = async () => {

        try {

            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data;

            Cookies.set('token', token);
            dispatch({ type: '[AUTH] - Login', payload: user });

        } catch (error) {
            Cookies.remove('token');

        }
    }


    const startAuth = () => {
        dispatch({ type: '[AUTH] - Start Auth' });
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;

            Cookies.set('token', token);
            dispatch({ type: '[AUTH] - Login', payload: user });

            return true;

        } catch (error: any) {
            console.log(error.response.data.message);
            dispatch({ type: '[AUTH] - Auth Error', payload: error.response.data.message });
            return false;

        }
    }

    const registerUser = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {

        try {

            const { data } = await tesloApi.post('/user/register', { firstName, lastName, email, password });
            const { token, user } = data;

            Cookies.set('token', token);
            dispatch({ type: '[AUTH] - Login', payload: user });

            return true;

        } catch (error: any) {

            if (axios.isAxiosError(error)) {
                dispatch({ type: '[AUTH] - Auth Error', payload: (error.response?.data as { message: string }).message });
                return false;
            }

            dispatch({ type: '[AUTH] - Auth Error', payload: 'No se pudo crear el usuario intente de nuevo' });
            return false

        }
    }

    const logout = () => {

        Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('state');
        Cookies.remove('country');
        Cookies.remove('phone');
        router.reload(); // el dispacth no se maneja porque quedaria el estado de mi carrito de compras con esto borras cache y cookies
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            loginUser,
            startAuth,
            registerUser,
            logout
        }}>

            {children}
        </AuthContext.Provider>
    )
};