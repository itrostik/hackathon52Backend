import Router from "express";
import userController from "../controller/user.controller";

// @ts-ignore
const usersRoute = new Router();

usersRoute.get("/users", userController.getUser);
export default usersRoute;
