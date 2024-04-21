import Productos from "../models/Productos.js"

export const getProductos = async (req, res) => {
    try {
        const productos = await Productos.find({})
        if (productos.length === 0) {
            return res.status(400).json({ msg: 'No hay productos registrados' })
        }
        res.json(productos)
    } catch (error) {
        console.log(error)

    }
}

export const createProducto = async (req, res) => {
    try {
        const imagen = req.file ? req.protocol + '://' + req.get('host') + '/' + req.file.path : undefined
        let newProducto = new Productos({ ...req.body, imagen })
        await newProducto.save()
        res.json(newProducto)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al crear el producto')
    }
}

export const editarProducto = async (req, res) => {
    try {
        const newProducto = {}

        let existingProducto = await Productos.findById(req.params.id)
        if (!existingProducto) {
            return res.status(404).json({ msg: 'Producto no encontrado' })
        }
        Object.entries(req.body).forEach(([key, value]) => {
            if (value) {
                newProducto[key] = value
            }
        })
        existingProducto = await Productos.findByIdAndUpdate({ _id: req.params.id }, { $set: newProducto }, { new: true })
        res.json(existingProducto)

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al editar el producto')
    }
}

export const deleteProductos = async (req, res) => {
    try {
        const Productos = await Productos.findById(req.params.id)

        if (!Productos) {
            return res.status(404).json({ msg: 'Producto no encontrado' })
        }
        await Productos.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Se elimino el producto de manera correcta' })
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al eliminar el producto')
    }
}
