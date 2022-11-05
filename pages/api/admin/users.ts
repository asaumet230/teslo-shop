
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '../../../database';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';
import { isValidObjectId } from 'mongoose';

type Data =
    | { message: string }
    | { users: IUser[] };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'ADMIN_ROLE') {
        return res.status(400).json({ message: 'No Tiene los privilegios' });
    }

    switch (req.method) {

        case 'GET':
            return getUsers(req, res);

        case 'PUT':
            return updatedUsers(req, res);

        default:
            return res.status(200).json({ message: 'Bad Request' });

    }

}


const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        await db.connect();
        const users = await User.find().select('-password').lean();
        await db.disconnect();

        return res.status(200).json(users);


    } catch (error: any) {
        await db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }



}


const updatedUsers = async (req: NextApiRequest, res: NextApiResponse) => {

    const { userId = '', role = '' } = req.body;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'No es un Id de mongo válido' });
    }

    try {

        const validRoles = ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'];

        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Role no es válido' + validRoles.join(',') });
        }

        await db.connect();

        const user = await User.findById({ _id: userId });

        if (!user) {
            await db.disconnect();
            return res.status(400).json({ message: `Usuario no encontrado con id: ${userId}` });
        }

        user.role = role;
        await user.save();
        await db.disconnect();

        return res.status(200).json({ message: 'Usuario actualizado' });

    } catch (error: any) {

        await db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }

}

export default handler;