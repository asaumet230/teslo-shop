import mongoose, { model, Model, Schema } from 'mongoose';

// Interfaces:
import { IProducts } from '../interfaces';

const ProductSchema = new Schema({

    description: {
        type: String,
        require: [true, 'El campor es requerido']
    },
    images: [
        {
            type: String
        }
    ],
    inStock: {
        type: Number,
        require: [true, 'El campor es requerido'],
        default: 0
    },
    price: {
        type: Number,
        require: [true, 'El campor es requerido'],
        default: 0
    },
    sizes: [
        {
            type: String,
            enum: { values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] }, //* Lo puedes relacionar con otra tabla eso seria lo correcto
            message: '{VALUE} no es una talla válido'
        }
    ],
    slug: {
        type: String,
        require: [true, 'El campor es requerido'],
        unique: true
    },
    tags: [
        {
            type: String,
        }
    ],
    title: {
        type: String,
        require: [true, 'El campor es requerido'],
    },
    type: {
        type: String,
        require: [true, 'El campor es requerido'],
        enum: { values: ['shirts', 'pants', 'hoodies', 'hats'] },
        message: '{VALUE} no es un tipo válido'
    },
    gender: {
        type: String,
        require: [true, 'El campor es requerido'],
        enum: { values: ['men', 'women', 'kid', 'unisex'] },
        message: '{VALUE} no es un genero válido'
    },

}, {
    timestamps: true //* Esto agrega las fechas de creación y actualización en mongo
});


//* Para Habilitar la busqueda: 
ProductSchema.index({ title: 'text', tags: 'text' });

const ProductModel: Model<IProducts> = mongoose.models.Product || model('Product', ProductSchema); //* O busca el modelo o lo crea por el nombre Product

export default ProductModel;