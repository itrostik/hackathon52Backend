import database from "../utils/database";
import { Request, Response } from "express";

class UserController {
  async getUser(req: Request, res: Response) {
    const user = await database.query("select * from usr");
    console.log(user.rows[0]);
  }
}

export default new UserController();
