import express from "express"
import checkAuth from "../middleware/auth.js"
import { createUser, authUser, getProfileUser, getUsers } from "../controllers/userController.js"

const router = express.Router()
router.get('/', getUsers)
router.post('/', createUser)
router.post('/login', authUser)
router.get('/profile', checkAuth, getProfileUser)

export default router