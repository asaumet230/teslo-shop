import mongoose, { model, Model, Schema } from 'mongoose';


import { IUser } from '../interfaces';


const UserSchema = new Schema({

    firstName: {
        type: String,
        require: [true, 'El campo es requerido'],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        require: [true, 'El campo es requerido'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'El campo es requerido'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: [true, 'El campo es requerido'],
        trim: true,
    },
    role: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'],
        default: 'USER_ROLE'

    },
    state: {
        type: Boolean,
        default: true
    },

}, {
    timestamps: true
});




const ProductModel: Model<IUser> = mongoose.models.User || model('User', UserSchema);

export default ProductModel;