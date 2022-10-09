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