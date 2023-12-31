import database from "../utils/database";
import { Request, Response } from "express";

// ✦ room_id
// ● name
// ● created_date
// ◆ user_id
// ◆ background_id

class RoomController {
  async createRoom(req: Request, res: Response) {
    try {
      const { name, user_id, background_id } = req.body;
      await database.query(
        "insert into room(name, user_id, background_id) values ($1, $2, $3)",
        [name, user_id, background_id],
      );
      res.status(200).json({
        status: true,
      });
    } catch (e) {
      console.log(e);
      res.status(420).json({
        status: false,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const data = await database.query(
        `select r.room_id, (
    select COUNT(*)
    from sensor s 
    where s.room_id = r.room_id 
) as cnt, r.name, p.red_value, p.green_value, p.blue_value 
from room r inner join preparedbackgrounds p on r.background_id = p.background_id 
where r.user_id = ${user_id}`,
      );
      res.status(200).json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }

  async getCountSensor(req: Request, res: Response) {
    try {
      const { room_id } = req.body;
      const data = await database.query(
        `SELECT COUNT(*) FROM sensor WHERE room_id = ${room_id}`,
      );
      res.status(200).json(data.rows[0]);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
}

export default new RoomController();
