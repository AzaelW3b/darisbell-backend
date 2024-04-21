import User from "../models/User.js"
import generateJwt from "../helpers/generateJwt.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length === 0) {
            return res.status(400).json({ msg: 'No hay usuarios registrados' })
        }
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    const { email, userName } = req.body

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] })

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ msg: 'Este correo electrónico ya está registrado.' })
            } else {
                return res.status(400).json({ msg: 'Este usuario ya existe.' })
            }
        }

        const newUser = new User(req.body)
        await newUser.save()
        res.json(newUser)

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al crear el usuario')
    }
}

export const editUser = async (req, res) => {
    try {
        const newUser = {}

        let existingUser = await User.findById(req.params.id)
        if (!existingUser) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        Object.entries(req.body).forEach(([key, value]) => {
            if (value) {
                newUser[key] = value
            }
        })
        existingUser = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: newUser }, { new: true })
        res.json(existingUser)

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al editar el usuario')
    }
}

export const deleteUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findById(req.params.id)

        if (!usuarios) {
            return res.status(404).json({ msg: 'Usuario no encontrado' })
        }
        await User.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Se elimino el usuario de manera correcta' })
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al eliminar el usuario')
    }
}


export const authUser = async (req, res) => {
    try {
        const { userName, password } = req.body

        const user = await User.findOne({ userName })

        if (!user) {
            return res.status(403).json({ msg: 'El usuario no existe.' })
        }

        if (await user.comprobarPassword(password)) {

            res.json({ token: generateJwt(user._id) })
        } else {
            return res.status(403).json({ msg: 'El password es incorrecto' })
        }

    } catch (error) {
        console.log(error)
    }
}

export const getProfileUser = (req, res) => {
    const { userName } = req
    console.log(userName)
    if(!userName) return res.status(404).json({ msg: 'No se encontro el usuario.' })
    res.json(userName)
}


