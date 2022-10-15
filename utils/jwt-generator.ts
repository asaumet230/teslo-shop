import jwt from 'jsonwebtoken';


export const jwtGenerator = (id: string, email: string): Promise<string> => {

    if (!process.env.SECRET_JWT_SEED) {
        throw new Error('Semilla de JWT no proporcionada');
    }

    return new Promise((resolve, reject) => {

        const payload = {
            id,
            email
        }

        jwt.sign(payload, process.env.SECRET_JWT_SEED!, { expiresIn: '12h' },
            (error, token) => {

                if (error) {
                    reject(`No se pudo generar JWT: ${error}`);
                } else {
                    resolve(token!);
                }
            });

    });
}


export const isValidToken = (token: string): Promise<string> => {


    if (!process.env.SECRET_JWT_SEED) {
        throw new Error('Semilla de JWT no proporcionada');
    }

    if (token.length <= 10) {
        return Promise.reject('Token no es válido');
    }

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.SECRET_JWT_SEED || '', (error, payload) => {

            if (error) {
                return reject('EL JWT no es válido');
            }

            const { id } = payload as { id: string };

            return resolve(id);

        })

    });
}