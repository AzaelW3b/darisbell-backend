import mongoose from "mongoose"

const productosSchema = mongoose.Schema({
    nombreProducto: {
        type: String,
        trim: true
    },
    imagen: {
        type: String
    },
    descripcion: {
        type: String

    },
    precio: {
        type: Number,
        get: value => (value / 100).toFixed(2),
        set: value => value * 100,
        default: 0
    },
    cantidad: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        get: value => (value / 100).toFixed(2),
        set: value => value * 100,
        default: 0
    },
    categoria: {
        type: String
    },
}, { timestamps: true })

export default mongoose.model('Productos', productosSchema)