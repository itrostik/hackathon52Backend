import Router from 'express'
import userController from '../controller/user.controller'

// @ts-ignore
const userRoute = new Router()

userRoute.post('/users', userController.createUser)
userRoute.post('/users.check', userController.checkUser)
export default userRoute
