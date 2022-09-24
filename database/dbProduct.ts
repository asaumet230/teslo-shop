import { db } from ".";

// Model:
import { Product } from "../models";

// Interface:
import { IProducts } from "../interfaces";


export const getProductBySlug = async (slug: string): Promise<IProducts | null> => {


    try {
        await db.connect();
        const product = await Product.findOne({ slug }).lean();
        await db.disconnect();

        if (!product) {
            return null;
        }

        return JSON.parse(JSON.stringify(product)); //Solo se parsea si viene el id de mongo o fecha


    } catch (error) {
        console.log(error);
        await db.disconnect();
        throw new Error(`Error comuniquese con el administrador ${error}`);
    }
}


interface ProductSlug {
    slug: string;
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {

    try {
        await db.connect();
        const slugs = await Product.find().select('slug -_id').lean();
        await db.disconnect();

        return slugs;

    } catch (error) {
        console.log(error);
        await db.disconnect();
        throw new Error(`Error comuniquese con el administrador ${error}`);
    }

}


export const getProductByTerm = async (term: string): Promise<IProducts[]> => {

    try {

        await db.connect();

        const products = await Product.find({
            $text: { $search: term.toString().toLocaleLowerCase() }
        })
            .select('title images price inStock slug -_id')
            .lean();

        await db.disconnect();

        return products;

    } catch (error) {
        console.log(error);
        await db.disconnect();
        throw new Error(`Error comuniquese con el administrador ${error}`);
    }

}


export const getAllproducts = async (): Promise<IProducts[]> => {

    try {

        await db.connect();
        const products = await Product.find().lean();
        await db.disconnect();

        return JSON.parse(JSON.stringify(products));

    } catch (error) {
        console.log(error);
        await db.disconnect();
        throw new Error(`Error comuniquese con el administrador ${error}`);
    }
}