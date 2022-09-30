import { createContext } from 'react';

// Interfaces:
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void;
}


export const CartContext = createContext<ContextProps>({} as ContextProps);