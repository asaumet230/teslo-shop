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

        return JSON.parse(JSON.stringify(product));


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