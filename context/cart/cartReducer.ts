
// Interfaces:
import { ICartProduct } from '../../interfaces';
import { CartState, ShippingAddress } from './';

type OrderSumary = {
    numberOfItems: number;
    subtotal: number;
    taxRate: number;
    total: number;
}

type CartAction =
    | { type: '[CART] - Load Cart From Cookies | Storage', payload: ICartProduct[] }
    | { type: '[CART] - Load Shippping Address From Cookies | Storage', payload: ShippingAddress | undefined }
    | { type: '[CART] - Updated Shippping Address', payload: ShippingAddress }
    | { type: '[CART] - Updated Product in Cart', payload: ICartProduct[] }
    | { type: '[CART] - Change Cart Quantity', payload: ICartProduct }
    | { type: '[CART] - Remove Product in Cart', payload: ICartProduct }
    | { type: '[CART] - Update Order Summary', payload: OrderSumary };


export const cartReducer = (state: CartState, action: CartAction): CartState => {

    switch (action.type) {

        case '[CART] - Load Cart From Cookies | Storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }

        case '[CART] - Updated Shippping Address':
        case '[CART] - Load Shippping Address From Cookies | Storage':
            return {
                ...state,
                shippingAddress: action.payload
            }

        case '[CART] - Updated Product in Cart':
            return {
                ...state,
                cart: [...action.payload]
            }
        case '[CART] - Change Cart Quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id === action.payload._id && product.size === action.payload.size) {
                        return {
                            ...product,
                            quantity: action.payload.quantity
                        }
                    } else {
                        return product;
                    }
                })
            }

        case '[CART] - Remove Product in Cart':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

        case '[CART] - Update Order Summary':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}