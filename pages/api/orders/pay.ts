import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import axios from 'axios';


import { db } from '../../../database';
import { Order } from '../../../models';
import { IPaypal } from '../../../interfaces';


type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'POST':
            return payOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' });
    }
}

const getPaypalBerearToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    try {

        const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

        //Forma de generar un string en base 64 o urlencode:
        const body = new URLSearchParams('grant_type=client_credentials');

        const { data } = await axios.post(

            process.env.PAYPAL_OAUTH_URL || '',
            body,
            {
                headers: {
                    'Authorization': `Basic ${base64Token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return data.access_token;

    } catch (error: any) {

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }

        console.log(error);
        return null;
    }



}

const payOrder = async (req: NextApiRequest, res: NextApiResponse) => {

    const { transactionId = '', orderId = '', userId = '' } = req.body;
    console.log(userId, 'userId');

    // Validación del Token:
    const paypalBerearToken = await getPaypalBerearToken();

    if (!paypalBerearToken) {
        return res.status(400).json({ message: 'No se puedo generar el token de PayPal' });
    }

    // Validación del mongo ID de la orden:
    if (!isValidObjectId(orderId)) {
        return res.status(400).json({ message: `El Id: ${orderId} no es un id válido` });
    }

    try {

        const { data } = await axios.get<IPaypal.PayPalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
            headers: {
                'Authorization': `Bearer ${paypalBerearToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Validaciones:
        if (data.status !== 'COMPLETED') {
            return res.status(401).json({ message: 'Orden no pagada' });
        }

        await db.connect();
        const orderDb = await Order.findById(orderId);


        if (!orderDb) {
            await db.disconnect();
            return res.status(400).json({ message: 'Orden no existe en la DB' });
        }

        if (orderDb.user?.toString() !== userId) {
            await db.disconnect();
            return res.status(400).json({ message: 'La orden no pertenece a este usuario' });
        }


        if (orderDb.total !== Number(data.purchase_units[0].amount.value)) {
            await db.disconnect();
            return res.status(400).json({ message: 'El monto de la orden Db y el monto de PayPal no coinciden' });
        }


        orderDb.isPaid = true;
        orderDb.transactionID = transactionId
        await orderDb.save();
        await db.disconnect();

        //Todo: Enviar correo electronico de confirmación a cliente y vendedor

        return res.status(200).json({ message: 'Orden Pagada' });

    } catch (error: any) {

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }

        return res.status(400).json({ message: error });
    }









}