import type { NextApiRequest, NextApiResponse } from 'next';

// Data Base:
import { db, SHOP_CONSTANTS } from '../../../database';

// Interfaces:
import { IProducts } from '../../../interfaces';

// Models:
import { Product } from '../../../models';

type handlerProps =
    | { message: string }
    | { message: string; product: IProducts }
    | { message: string, products: IProducts[], total: number };

const handler = (req: NextApiRequest, res: NextApiResponse<handlerProps>) => {

    switch (req.method) {

        case 'GET':
            return getProducts(req, res);


        default:
            return res.status(400).json({
                message: 'No existe endpoint'
            });
    }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {

    const { validGenders } = SHOP_CONSTANTS;
    const { limit = 52, since = 0, gender } = req.query;

    try {

        if (gender) {

            if (!validGenders.includes(gender.toString())) {

                return res.status(400).json({
                    message: `El genero ${gender} no es válido`
                });
            }

            await db.connect();

            const [products, total] = await Promise.all([

                Product
                    .find({ gender })
                    .select('title images price inStock gender slug -_id')
                    .limit(Number(limit))
                    .skip(Number(since)),

                Product.countDocuments({ gender })

            ]);

            await db.disconnect();

            if (total === 0) res.status(200).json({ message: 'No hay productos que mostrar' });

            return res.status(200).json({
                message: 'Consulta Exitosa',
                products,
                total
            });
        }

        await db.connect();

        const [products, total] = await Promise.all([

            Product
                .find()
                .select('title images price inStock gender slug -_id')
                .limit(Number(limit))
                .skip(Number(since)),

            Product.countDocuments()

        ]);

        await db.disconnect();

        if (total === 0) res.status(200).json({ message: 'No hay productos que mostrar' });

        return res.status(200).json({
            message: 'Consulta Exitosa',
            products,
            total
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