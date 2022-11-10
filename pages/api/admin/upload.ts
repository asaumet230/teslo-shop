import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

type Data =
    | { message: string }
    | { imagePath: string };

export const config = {
    api: {
        bodyParser: false
    }
}

cloudinary.config(process.env.CLOUDINARY_URL || '');

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'ADMIN_ROLE') {
        return res.status(400).json({ message: 'No Tiene los privilegios' });
    }

    switch (req.method) {

        case 'POST':
            return uploadFiles(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' });
    }

}

const saveFile = async (file: formidable.File): Promise<string> => {

    // const data = fs.readFileSync(file.filepath);
    // fs.writeFileSync(`./public/${file.originalFilename}`, data);
    // fs.unlinkSync(file.filepath);
    // return;

    const { secure_url } = await cloudinary.uploader.upload(file.filepath);
    return secure_url;
}


const parseFile = async (req: NextApiRequest): Promise<string> => {

    return new Promise((resolve, reject) => {

        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {

            if (err) {
                reject(err);
            }

            const filePath = await saveFile(files.file as formidable.File);
            resolve(filePath);
        });

    });
}

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imagePath = await parseFile(req);

    return res.status(200).json({ imagePath });
}


export default handler;