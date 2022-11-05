import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';


type Data =
    | { message: string }
    | IOrder[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'ADMIN_ROLE') {
        return res.status(400).json({ message: 'No Tiene los privilegios' });
    }

    switch (req.method) {

        case 'GET':
            return getOrders(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' });
    }

}

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        db.connect();
        const orders = await Order.find().sort({ createdAt: 'desc' }).populate('user', 'firstName lastName email').lean();
        db.disconnect();

        return res.status(200).json(orders);

    } catch (error: any) {

        db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }
}



export default handler;