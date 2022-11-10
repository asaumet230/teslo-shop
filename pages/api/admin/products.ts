import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v2 as cloudinary } from 'cloudinary';

import { db } from '../../../database';
import { Product } from '../../../models';
import { IProducts } from '../../../interfaces';
import { isValidObjectId } from 'mongoose';


cloudinary.config(process.env.CLOUDINARY_URL || '');


type Data =
    | { message: string }
    | IProducts[]
    | IProducts
    | null;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'ADMIN_ROLE') {
        return res.status(400).json({ message: 'No Tiene los privilegios' });
    }

    switch (req.method) {

        case 'GET':
            return getProducts(req, res);

        case 'PUT':
            return updatedProduct(req, res);

        case 'POST':
            return createProduct(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {

        await db.connect();
        const products = await Product.find().sort({ title: 'asc' }).lean();
        await db.disconnect();

        return res.status(200).json(products);


    } catch (error: any) {

        db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }

}


const updatedProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', images = [] } = req.body as IProducts;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: `Id de no válido ${_id}` });
    }

    if (images.length < 2) {
        return res.status(400).json({ message: 'Debe de enviar por lo menos dos imagenes' });
    }

    try {

        await db.connect();
        let product = await Product.findById({ _id });

        if (!product) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe producto con ese Id' });
        }

        product.images.forEach(async (img) => {
            if (!images.includes(img)) {
                const [fileId, extension] = img.substring(img.lastIndexOf('/') + 1).split('.');
                await cloudinary.uploader.destroy(fileId);
            }
        })

        product = await Product.findByIdAndUpdate({ _id }, req.body, { new: true });

        await db.disconnect();
        return res.status(200).json(product);

    } catch (error) {
        db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return res.status(500).json({ message: 'Comuniquese con el administrador' });
        }

        return res.status(500).json({ message: 'Comuniquese con el administrador' });
    }
}


const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images = [], slug } = req.body as IProducts;

    if (images.length < 2) {
        return res.status(400).json({ message: 'Debe de enviar por lo menos dos imagenes' });
    }

    try {

        await db.connect();
        const productDb = await Product.findOne({ slug });

        if (productDb) {
            await db.disconnect();
            return res.status(401).json({ message: `Ya existe ese slug: ${slug}, pruebe con otro ` });
        }

        const newProduct = new Product(req.body);
        await newProduct.save();

        await db.disconnect();
        return res.status(201).json(newProduct);


    } catch (error) {
        await db.disconnect();
        console.log(error);

        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            return res.status(500).json({ message: 'Comuniquese con el administrador' });
        }

        return res.status(500).json({ message: 'Comuniquese con el administrador' });
    }

}


export default handler;

