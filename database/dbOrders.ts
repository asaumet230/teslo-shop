import { isValidObjectId } from "mongoose";

import { db } from ".";
import { Order } from "../models";
import { IOrder } from "../interfaces";


export const getOrderById = async (id: string): Promise<IOrder | null> => {


    if (!isValidObjectId(id)) {
        return null;
    }

    db.connect();
    const order = await Order.findById(id);
    db.disconnect();

    if (!order) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));


}