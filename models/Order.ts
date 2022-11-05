import mongoose, { model, Model, Schema } from 'mongoose';

// Interfaces:
import { IOrder } from '../interfaces';


const OrderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            title: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
            slug: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            gender: { type: String, required: true },
        }
    ],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String },
        zip: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentResult: { type: String },
    numberOfItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxRate: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: true },
    paidAt: { type: String },

    transactionID: { type: String }

}, {
    timestamps: true //* Esto agrega las fechas de creación y actualización en mongo
});


//* Para Habilitar la busqueda: 
OrderSchema.index({ title: 'text', tags: 'text' });

const OrderModel: Model<IOrder> = mongoose.models.Order || model('Order', OrderSchema);

export default OrderModel;