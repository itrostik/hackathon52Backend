import Router from "express";
import HistoryController from "../controller/history.controller";

// @ts-ignore
const historyRoute = new Router();

historyRoute.post("/history", HistoryController.createHistory);
historyRoute.post("/history.getUserHistory", HistoryController.getUserHistory);
historyRoute.post(
  "/history.getSensorHistory",
  HistoryController.getSensorHistory,
);
historyRoute.post("/history.getRoomHistory", HistoryController.getRoomHistory);
export default historyRoute;
