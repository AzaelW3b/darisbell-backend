import User from "../models/User.js"
import generateJwt from "../helpers/generateJwt.js"

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


