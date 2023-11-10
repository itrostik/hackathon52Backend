import Router from 'express'
import sensorController from '../controller/sensor.controller'

// @ts-ignore
const sensorRoute = new Router()

sensorRoute.get(
  '/sensor.getUserColorSensor',
  sensorController.getUserColorSensor
)
sensorRoute.get(
  '/users.getRoomColorSensor',
  sensorController.getRoomColorSensor
)

sensorRoute.get(
  '/users.getUserStateSensor',
  sensorController.getUserStateSensor
)
sensorRoute.get(
  '/users.getRoomStateSensor',
  sensorController.getRoomStateSensor
)
sensorRoute.get(
  '/users.getUserBinarySensor',
  sensorController.getUserBinarySensor
)
sensorRoute.get(
  '/users.getRoomBinarySensor',
  sensorController.getRoomBinarySensor
)
sensorRoute.put('/users.updateColorSensor', sensorController.updateColorSensor)

sensorRoute.put('/users.updateStateSensor', sensorController.updateStateSensor)

sensorRoute.put(
  '/users.updateBinarySensor',
  sensorController.updateBinarySensor
)

export default sensorRoute
