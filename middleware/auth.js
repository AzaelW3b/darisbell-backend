import jwt from "jsonwebtoken"
import User from "../models/User.js"

const checkAuth = async (req, res, next) => {
    let token = ''

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userName = await User.findById(decoded.id).select('-password')

            return next()

        } catch (error) {

            console.log(error)
            return res.json(403).json({ msg: 'Token no valido' })
        }
    }
    if (!token) {
        res.status(403).json({ msg: 'Token no valido o inexistente' })
    }

    next()
}


export default checkAuth