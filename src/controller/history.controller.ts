import database from "../utils/database";
import { Request, Response } from "express";

// ✦ history_id
// ● text
// ● create_date
// ◆ history_type
// ◆ sensor_id
// ◆ room_id
// ◆ user_id

class HistoryController {
  async createHistory(req: Request, res: Response) {
    try {
      const { text, history_type, sensor_id, room_id, user_id } = req.body;
      await database.query(
        "insert into history(text, history_type, sensor_id, room_id, user_id) values ($1, $2, $3, $4, $5)",
        [text, history_type, sensor_id, room_id, user_id],
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

  async getUserHistory(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const data = await database.query(
        `SELECT * 
FROM history
INNER JOIN room ON room.room_id  = history.room_id
inner join preparedbackgrounds p on p.background_id  = room.background_id 
WHERE history.user_id = ${user_id}`,
      );
      res.status(200).json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }

  async getSensorHistory(req: Request, res: Response) {
    try {
      const { sensor_id } = req.body;
      const data = await database.query(
        `SELECT * FROM history  INNER JOIN historytype ON history.history_type_id = historytype.history_type_id WHERE sensor_id = ${sensor_id}`,
      );
      res.status(200).json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async getRoomHistory(req: Request, res: Response) {
    try {
      const { room_id } = req.body;
      const data = await database.query(
        `SELECT * FROM history INNER JOIN historytype ON history.history_type_id = historytype.history_type_id WHERE room_id = ${room_id}`,
      );
      res.status(200).json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
}

export default new HistoryController();
