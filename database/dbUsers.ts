import bcrypt from 'bcryptjs';

import { db } from ".";
import { User } from "../models";


export const checkUserEmailPassword = async (email: string, password: string) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        throw new Error('Usuario no existe');
    }


    if (!bcrypt.compareSync(password, user.password!)) {
        throw new Error('Email o contraseña invalidos');
    }

    const { _id, firstName, lastName, role } = user;

    return {
        id: _id,
        email,
        firstName,
        lastName,
        role,
    }



}


//* Esta Función verifica o crea un usuario mediante la autenticación a traves de OAuth:

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {

    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if (!user) {

        const newUser = new User({
            firstName: oAuthName.split(' ')[0],
            lastName: oAuthName.split(' ')[1],
            email: oAuthEmail,
            role: 'USER_ROLE',
            password: '@'
        })

        await newUser.save({ validateBeforeSave: true });
        await db.disconnect();

        const { _id, email, firstName, lastName, role } = newUser;

        return {
            id: _id,
            email,
            firstName,
            lastName,
            role
        }
    }

    if (user.state === false) {

        user.state = true;
        user.save();
        await db.disconnect();

        const { _id, email, firstName, lastName, role } = user;

        return {
            id: _id,
            email,
            firstName,
            lastName,
            role
        }
    }

    await db.disconnect();
    const { _id, email, firstName, lastName, role } = user;

    return {
        id: _id,
        email,
        firstName,
        lastName,
        role
    }
}