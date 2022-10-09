// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// Data Base:
import { db } from '../../database';

// Models:
import { Product, User } from '../../models';

// Datat to insert in DB:
import { initialData as seedData } from '../../database';

type HandlerProps = {
    message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<HandlerProps>) => {

    if (process.env.NODE_ENV === 'production') {

        return res.status(401).json({
            message: 'No tiene acceso a este servicio'
        });
    }

    try {

        await db.connect();

        await User.deleteMany();

        const encryptedPasswordUsers = seedData.users.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password)
        }));

        await User.insertMany(encryptedPasswordUsers);

        await Product.deleteMany(); // Este metodo borra todo el contenido de la colección de la DB.
        await Product.insertMany(seedData.products); // Este metodo inserta muchos datos a la colección Product en la DB.

        await db.disconnect();

        return res.status(200).json({
            message: 'Proceso realizado correctamente'
        });

    } catch (error: any) {

        await db.disconnect();
        console.log(error);

        return res.status(500).json({
            message: error.errors.status.message
        });
    }

}


export default handler;