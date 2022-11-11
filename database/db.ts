import mongoose from "mongoose";

/** 
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = diconnecting 
**/

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {

    if (mongoConnection.isConnected) {
        console.log('Ya estamos conectados'); // Ya estoy conenctado
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState; // Reviso que conexión esta disponible

        if (mongoConnection.isConnected === 1) {
            console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a mongo:', process.env.MONGO_URL);
}



export const disconnect = async () => {

    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') return;

    if (mongoConnection.isConnected === 0) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconectado de mongoDB');
}