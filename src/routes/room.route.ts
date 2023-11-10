import Router from 'express'
import RoomController from '../controller/room.controller'

// @ts-ignore
const roomRoute = new Router()

roomRoute.post('/rooms', RoomController.createRoom)
roomRoute.get('/rooms.getAll', RoomController.getAll)
roomRoute.get('/rooms.getCountSensor', RoomController.getCountSensor)
export default roomRoute
