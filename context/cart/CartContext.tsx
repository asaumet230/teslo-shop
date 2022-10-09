import { createContext } from 'react';

// Interfaces:
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    taxRate: number;
    total: number;
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}


export const CartContext = createContext<ContextProps>({} as ContextProps);