import { tesloApi } from "../api"

type Data =
    | {
        numberOfOrders: number;
        paidOrders: number;
        notPaidORders: number;
        numberOfClients: number;
        numberOfProducts: number;
        productsWithNoInventory: number;
        lowInventory: number;
    }
    | { message: string };

export const getAdminStatistics = async (): Promise<Data> => {

    const { data } = await tesloApi('/admin/dashboard');

    return data;
}