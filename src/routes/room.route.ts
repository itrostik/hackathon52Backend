import Router from "express";
import RoomController from "../controller/room.controller";

// @ts-ignore
const roomRoute = new Router();

roomRoute.post("/rooms", RoomController.createRoom);
roomRoute.post("/rooms.getAll", RoomController.getAll);
roomRoute.post("/rooms.getCountSensor", RoomController.getCountSensor);
export default roomRoute;
