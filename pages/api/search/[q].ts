import type { NextApiRequest, NextApiResponse } from 'next';

// DataBase:
import { db } from '../../../database';

// Interfaces:
import { IProducts } from '../../../interfaces';

// Models:
import { Product } from '../../../models';

type HandlerProps =
    | { message: string }
    | { message: string, product: IProducts[] };

const handler = (req: NextApiRequest, res: NextApiResponse<HandlerProps>) => {

    switch (req.method) {

        case 'GET':
            return searchProducts(req, res);

        default:
            return res.status(400).json({
                message: 'Bad Request end point dont exist'
            })
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse) => {

    let { q = '' } = req.query;

    try {

        if (q.length === 0) return res.status(400).json({ message: 'Debe enviar termino de busqueda' });

        q = q.toString().toLocaleLowerCase();
        await db.connect();

        const products = await Product.find({
            $text: { $search: q }
        })
            .select('title images price inStock slug -_id')
            .lean();

        await db.disconnect();



        return res.status(200).json({
            message: 'Busqueda Exitosa',
            products
        });

    } catch (error: any) {

        await db.disconnect();
        console.log(error);
        return res.status(500).json({
            message: 'Error comuniquese con el administrador'
        });

    }
}



export default handler;