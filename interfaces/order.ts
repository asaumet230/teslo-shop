import { IUser, ISize } from "./";

export interface IOrder {
    _id?: string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;
    numberOfItems: number;
    subtotal: number;
    taxRate: number;
    total: number;
    isPaid: boolean;
    paidAt?: string;
}

export interface IOrderItem {
    _id: string;
    gender: string;
    image: string;
    price: number;
    quantity: number;
    size: ISize;
    slug: string;
    title: string;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    phone: string;
}