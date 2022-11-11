import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

// Context & Reducer:
import { CartContext, cartReducer } from './';

// Interfaces:
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';

import { tesloApi } from '../../config';
import axios from 'axios';


interface CartProviderProps {
    children: JSX.Element | JSX.Element[],
}

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    taxRate: number;
    total: number;
    shippingAddress?: ShippingAddress | undefined;
}

export interface OrderResponse {
    hasError: boolean;
    message: string;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    subtotal: 0,
    taxRate: 0,
    total: 0,
    shippingAddress: undefined
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

    }, []);


    useEffect(() => {

        try {

            if (Cookie.get('firstName')) {

                const adddress = {
                    firstName: Cookie.get('firstName') || '',
                    lastName: Cookie.get('lastName') || '',
                    address: Cookie.get('address') || '',
                    address2: Cookie.get('address2') || '',
                    zip: Cookie.get('zip') || '',
                    city: Cookie.get('city') || '',
                    state: Cookie.get('state') || '',
                    country: Cookie.get('country') || '',
                    phone: Cookie.get('phone') || '',
                }

                getAddressFromCookies(adddress);
            }


        } catch (error) {
            getAddressFromCookies(undefined);
        }


    }, [])




    // Guarda el carrito de compras en la Cookie:
    useEffect(() => {

        Cookie.set('cart', JSON.stringify(state.cart));

    }, [state.cart]);


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


    }, [state.cart]);


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


    const getAddressFromCookies = (address: ShippingAddress | undefined) => {

        dispatch({
            type: '[CART] - Load Shippping Address From Cookies | Storage',
            payload: address
        });
    }

    const updatedShippingAddress = (address: ShippingAddress) => {

        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('state', address.state);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);

        dispatch({
            type: '[CART] - Updated Shippping Address',
            payload: address
        });
    }




    const createOrder = async (): Promise<OrderResponse> => {

        if (!state.shippingAddress) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {

            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subtotal: state.subtotal,
            taxRate: state.taxRate,
            total: state.total,
            isPaid: false
        }

        try {

            const { data } = await tesloApi.post<IOrder>('/orders', body);

            dispatch({ type: '[CART] - Order Complete' });

            return {
                hasError: false,
                message: data._id!
            }

        } catch (error: any) {

            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: (error.response?.data as { message: string }).message
                }
            }

            return {
                hasError: true,
                message: 'Hable con el administrador'
            }
        }
    }


    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updatedShippingAddress,
            createOrder,
        }}>

            {children}
        </CartContext.Provider>
    )
};