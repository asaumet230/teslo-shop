import type { NextApiRequest, NextApiResponse } from 'next'

// Data Base:
import { db } from '../../../database';

// Interfaces:
import { IProducts } from '../../../interfaces';

// Models:
import { Product } from '../../../models';



type HandlerProps =
    | { message: string }
    | { message: string, product: IProducts };

const handler = (req: NextApiRequest, res: NextApiResponse<HandlerProps>) => {

    switch (req.method) {

        case 'GET':
            return getProduct(req, res);

        default:
            return res.status(400).json({
                message: 'No existe endpoint'
            });
    }
}


const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {

    const { slug } = req.query;

    try {

        await db.connect();
        const product = await Product.findOne({ slug }).lean();
        await db.disconnect();

        if (!product) return res.status(400).json({ message: `El producto ${slug} no existe` });

        return res.status(200).json({
            message: 'Consulta exitosa',
            product
        });

    } catch (error: any) {

        await db.disconnect();
        console.log(error);

        res.status(500).json({
            message: 'Error comuniquese con el administrador'
        });
    }

}


export default handler;