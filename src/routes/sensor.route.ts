import Router from "express";
import sensorController from "../controller/sensor.controller";

// @ts-ignore
const sensorRoute = new Router();

sensorRoute.post(
  "/sensor.getUserColorSensor",
  sensorController.getUserColorSensor,
);
sensorRoute.post(
  "/sensor.getRoomColorSensor",
  sensorController.getRoomColorSensor,
);

sensorRoute.post(
  "/sensor.getUserStateSensor",
  sensorController.getUserStateSensor,
);
sensorRoute.post(
  "/sensor.getRoomStateSensor",
  sensorController.getRoomStateSensor,
);
sensorRoute.post(
  "/sensor.getUserBinarySensor",
  sensorController.getUserBinarySensor,
);
sensorRoute.post(
  "/sensor.getRoomBinarySensor",
  sensorController.getRoomBinarySensor,
);
sensorRoute.put(
  "/sensor.updateColorSensor",
  sensorController.updateColorSensor,
);

sensorRoute.put(
  "/sensor.updateStateSensor",
  sensorController.updateStateSensor,
);

sensorRoute.put(
  "/sensor.updateBinarySensor",
  sensorController.updateBinarySensor,
);

export default sensorRoute;
