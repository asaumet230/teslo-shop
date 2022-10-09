import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

// Context & Reducer:
import { CartContext, cartReducer } from './';

// Interfaces:
import { ICartProduct } from '../../interfaces';


interface CartProviderProps {
    children: JSX.Element | JSX.Element[],
}

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    taxRate: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    subtotal: 0,
    taxRate: 0,
    total: 0,
}


export const CartProvider = ({ children }: CartProviderProps) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    // Retoma los datos de la cookie para cambiar el State:
    useEffect(() => {


        //* Para prevenir una Cookie Manipulada se usa un ty y cacth ya que los navegadores saben cuando un Cookie es manipulada en especial Google Chrome:

        try {
            const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            getProductFromCookie(cart);
            // console.log(state.cart);

        } catch (error) {
            getProductFromCookie([]);
        }

    }, [])



    // Guarda el carrito de compras en la Cookie:
    useEffect(() => {

        Cookie.set('cart', JSON.stringify(state.cart));

    }, [state.cart])


    // Posee el resumen del carrito:
    useEffect(() => {

        const orderSummary = {
            numberOfItems: state.cart.reduce((prev, current) => current.quantity + prev, 0),
            subtotal: state.cart.reduce((prev, current) => (current.quantity * current.price) + prev, 0),
            taxRate: 0,
            total: 0
        }

        orderSummary.taxRate = (orderSummary.subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE));
        orderSummary.total = orderSummary.subtotal + orderSummary.taxRate;

        dispatch({ type: '[CART] - Update Order Summary', payload: orderSummary });


    }, [state.cart])


    const getProductFromCookie = (cart: ICartProduct[]) => {

        dispatch({
            type: '[CART] - Load Cart From Cookies | Storage',
            payload: cart
        });

    }

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

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[CART] - Change Cart Quantity', payload: product });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[CART] - Remove Product in Cart', payload: product });
    }


    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct
        }}>

            {children}
        </CartContext.Provider>
    )
};