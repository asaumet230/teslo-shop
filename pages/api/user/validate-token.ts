import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';

import { User } from '../../../models';

import { isValidToken, jwtGenerator } from '../../../utils';


interface UserProps {
    name: string;
    email: string;
    role: string;
}

type Data =
    | { message: string }
    | { token: string | undefined, user: UserProps };



const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

    switch (req.method) {
        case 'GET':
            return checkJWT(req, res);

        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }
}


const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { token = '' } = req.cookies;

    try {

        const userId = await isValidToken(token);

        if (!userId) {
            return res.status(401).json({
                message: 'JWT no válido'
            });
        }

        await db.connect();
        const userDb = await User.findById({ _id: userId }).lean();
        await db.disconnect();

        if (!userDb || userDb.state === false) {
            return res.status(401).json({
                message: 'Usuario no existe'
            });
        }

        const { _id, firstName, lastName, email, role } = userDb;
        const newToken = await jwtGenerator(_id, email);

        return res.status(200).json({
            token: newToken,
            user: {
                name: `${firstName} ${lastName}`,
                email,
                role
            }
        })

    } catch (error) {

        await db.disconnect();
        console.log(error);
        return res.status(401).json({
            message: 'Error comuniquese con el administrador'
        });
    }
}




export default handler;