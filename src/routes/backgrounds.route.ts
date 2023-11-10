import Router from 'express'
import BackgroundsController from '../controller/backgrounds.controller'

// @ts-ignore
const backgroundsRoute = new Router()

backgroundsRoute.get('/backgrounds.getAll', BackgroundsController.getAll)
export default backgroundsRoute
