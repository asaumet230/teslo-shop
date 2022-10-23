import { createContext } from 'react';

// Interfaces:
import { ICartProduct, ShippingAddress } from '../../interfaces';
import { OrderResponse } from './CartProvider';


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
    createOrder: () => Promise<OrderResponse>;
}



export const CartContext = createContext<ContextProps>({} as ContextProps);