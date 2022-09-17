import type { NextApiRequest, NextApiResponse } from 'next';

// DataBase:
import { db } from '../../../database';

type HandlerProps =
    | { message: string };

const handler = (req: NextApiRequest, res: NextApiResponse<HandlerProps>) => {

    return res.status(400).json({
        message: 'Debe de especificar el termino de busqueda'
    });

}


export default handler;
