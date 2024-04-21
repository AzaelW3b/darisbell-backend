import express from "express"
import { getProductos, createProducto, deleteProductos, editarProducto } from "../controllers/productosController.js"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imagenes/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', getProductos)
router.post('/', upload.single('imagen'), createProducto)
router.put('/:id',  editarProducto)
router.delete('/:id',  deleteProductos)

export default router