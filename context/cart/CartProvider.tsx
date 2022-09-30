import { useReducer } from 'react';

// Context & Reducer:
import { CartContext, cartReducer } from './';

// Interfaces:
import { ICartProduct } from '../../interfaces';


interface CartProviderProps {
    children: JSX.Element | JSX.Element[],
}

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}


export const CartProvider = ({ children }: CartProviderProps) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const addProductToCart = (product: ICartProduct) => {

        let newProductCart: ICartProduct[] = [];

        state.cart.find(p => p._id === product._id && p.size === product.size) ?

            newProductCart = state.cart.map(pc => {

                if (pc._id === product._id && pc.size === product.size) {
                    return {
                        ...pc,
                        quantity: pc.quantity + product.quantity
                    }
                } else {
                    return pc;
                }
            }) :

            newProductCart = [...state.cart, product]

        dispatch({ type: '[CART] - Updated Product in Cart', payload: newProductCart });
    }



    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart
        }}>

            {children}
        </CartContext.Provider>
    )
};