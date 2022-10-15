import { createContext } from 'react';

// Interfaces:
import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './';

interface ContextProps {
    shippingAddress?: ShippingAddress;
    cart: ICartProduct[];
    isLoaded: boolean;
    numberOfItems: number;
    subtotal: number;
    taxRate: number;
    total: number;

    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updatedShippingAddress: (address: ShippingAddress) => void;
}



export const CartContext = createContext<ContextProps>({} as ContextProps);