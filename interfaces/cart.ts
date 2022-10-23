import { ISize } from './';

//* Asi Luce un producto en el carrito de compras:

export interface ICartProduct {
    _id: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    image: string;
    maxQuantity: number;
    price: number;
    quantity: number;
    size?: ISize;
    slug: string;
    title: string;
}

