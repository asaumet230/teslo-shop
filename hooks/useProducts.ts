import useSWR, { SWRConfiguration } from 'swr';

// Interfaces:
import { IResponse } from '../interfaces';

//* El fetcher lo colocamos en el punto mas alto de la aplicación es decir en el componente _app:
// export const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config?: SWRConfiguration) => {

    const { data, error } = useSWR<IResponse>(`/api/${url}`, config);

    return {
        products: data?.products || [],
        isLoading: !data && !error,
        isError: error
    }

}