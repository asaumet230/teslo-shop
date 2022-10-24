import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '../../../database';
import { Order, Product } from '../../../models';
import { IOrder } from '../../../interfaces';



type Data =
    | { message: string; }
    | IOrder;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

    switch (req.method) {



        case 'POST':
            return createOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' });
    }

}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {

    const { orderItems, total } = req.body as IOrder;
    console.log(total);

    const session: any = await getSession({ req });

    if (!session) return res.status(401).json({ message: 'No tiene privilegios para esta operación' });

    const productsIds = orderItems.map(p => (p._id)); // Arreglo de Ids String;

    try {

        await db.connect();
        const dbProducts = await Product.find({ _id: { $in: productsIds } }); // Forma de econtrar todos los ids de un arreglo;

        const subtotal = orderItems.reduce((prev, current) => {

            const currentPrice = dbProducts.find(p => p.id === current._id)?.price;

            // Si entra a esta validación es que alguien en el frontend manipulo el id del producto para comprar ese producto a un menor precio:
            if (!currentPrice) {
                throw new Error('Verifique el carrito, producto no existe');
            }

            return (currentPrice * current.quantity) + prev;
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = Number(((1 + taxRate) * subtotal).toFixed(2));

        if (backendTotal !== total) {
            throw new Error('El total no cuadra con el monto');
        }

        const userId = session.user.id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        await newOrder.save();

        await db.disconnect();
        return res.status(201).json(newOrder);

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({ message: error.message || 'Revise los logs del servidor' });
    }

}

export default handler;