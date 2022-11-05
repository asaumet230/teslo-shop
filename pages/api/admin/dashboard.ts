import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

import { DashsboardInsights } from '../../../interfaces/';



type Data =
    | { message: string }
    | { dashsboardInsights: DashsboardInsights };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

    switch (req.method) {

        case 'GET':
            return getStatistics(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request 404' });
    }

}


const getStatistics = async (req: NextApiRequest, res: NextApiResponse) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'ADMIN_ROLE') {
        return res.status(400).json({ message: 'No Tiene los privilegios' });
    }

    try {

        db.connect();
        const [numberOfOrders, paidOrders, notPaidORders, numberOfClients, numberOfProducts, productsWithNoInventory, lowInventory] = await Promise.all([
            Order.estimatedDocumentCount(),
            Order.find({ isPaid: true }).count(),
            Order.find({ isPaid: false }).count(),
            User.find({ role: 'USER_ROLE' }).count(),
            Product.estimatedDocumentCount(),
            Product.find({ inStock: 0 }).count(),
            Product.find({ inStock: { $lt: 10 } }).count(),
        ]);

        db.disconnect();
        return res.status(200).json({
            numberOfOrders,
            paidOrders,
            notPaidORders,
            numberOfClients,
            numberOfProducts,
            productsWithNoInventory,
            lowInventory
        });

    } catch (error: any) {
        db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }

}

export default handler;