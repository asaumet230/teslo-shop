import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';

import { User } from '../../../models';

import { jwtGenerator } from '../../../utils';

import { IUser } from '../../../interfaces';



type Data =
    | { message: string }
    | { token: string | undefined, user: IUser };



const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

    switch (req.method) {
        case 'POST':
            return loginUser(req, res);

        default:
            return res.status(400).json({
                message: 'Bad Request end point dont exist'
            })
    }
}


const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body;

    try {

        await db.connect();
        const user = await User.findOne({ email });
        await db.disconnect();

        if (!user) {
            return res.status(400).json({
                message: 'Email o password incorrectos'
            });
        }

        if (!user.state) {
            return res.status(400).json({
                message: 'Email o password incorrectos'
            });
        }

        const passwordValidation = bcrypt.compareSync(password, user.password!);

        if (!passwordValidation) {
            return res.status(400).json({
                message: 'Email o password incorrectos',

            });
        }

        const { _id, firstName, lastName, role, email: userEmail } = user;

        const token = await jwtGenerator(_id, user.email);

        return res.status(200).json({
            token,
            user: {
                firstName,
                lastName,
                email: userEmail,
                role,
            }
        });


    } catch (error) {

        await db.disconnect();
        console.log(error);
        return res.status(500).json({
            message: 'Error comuniquese con el administrador'
        });
    }
}




export default handler;