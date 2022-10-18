import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { User } from '../../../models';
import { db } from '../../../database';
import { isValidEmail, jwtGenerator } from '../../../utils';


type Data =
    | { message: string }
    | { token: string, user: { firstName: string, lastName: string, email: string, role: string } };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {

    switch (req.method) {

        case 'POST':
            return userRegister(req, res);

        default:
            return res.status(400).json({
                message: 'Bad Request end point dont exist'
            });
    }
}

const userRegister = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', firstName = '', lastName = '' } = req.body;

    if (firstName.length < 2 || lastName.lenght < 2) {

        return res.status(400).json({
            message: 'El nombre y apellido deben de tener mínimo 2 caracteres'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: 'El password debe de tener mínimo 6 caracteres'
        });
    }


    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: 'El email debe de tener un formato valido'
        });
    }

    try {

        await db.connect();
        const dataBaseUser = await User.findOne({ email });


        if (!dataBaseUser) {

            const newUser = new User({
                firstName,
                lastName,
                email,
                role: 'USER_ROLE'
            });

            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(password, salt);
            newUser.save({ validateBeforeSave: true });

            await db.disconnect();

            const token = await jwtGenerator(newUser._id, email);

            return res.status(200).json({
                token,
                user: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role
                }
            });

        }

        if (dataBaseUser && dataBaseUser.state === false) {

            dataBaseUser.state = true;

            const updatedUser = await User.findByIdAndUpdate(dataBaseUser._id, dataBaseUser, { new: true });
            await db.disconnect();

            const token = await jwtGenerator(dataBaseUser._id, email);

            return res.status(200).json({
                token,
                user: {
                    firstName: updatedUser!.firstName,
                    lastName: updatedUser!.lastName,
                    email: updatedUser!.email,
                    role: updatedUser!.role
                }
            });
        }

        await db.disconnect();

        return res.status(400).json({
            message: 'Este correo no se puede utilizar'
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error comuniquese con el administrador'
        })
    }
}


export default handler;