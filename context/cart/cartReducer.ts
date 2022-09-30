
// Interfaces:
import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartAction =
    | { type: '[CART] - Load Cart From Cookies | Storage', payload: ICartProduct[] }
    | { type: '[CART] - Updated Product in Cart', payload: ICartProduct[] };


export const cartReducer = (state: CartState, action: CartAction): CartState => {

    switch (action.type) {

        case '[CART] - Load Cart From Cookies | Storage':
            return {
                ...state,
            }
        case '[CART] - Updated Product in Cart':
            return {
                ...state,
                cart: [...action.payload]
            }
        default:
            return state;
    }
}