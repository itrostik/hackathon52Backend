import database from "../utils/database";
import { Request, Response } from "express";

// ✦ sensor_id
// ● name
// ● started_date
// ● status
// ● has_command
// ◆ manufacturer_id
// ◆ sensor_type_id
// ◆ sensor_functional_id
// ◆ room_id
// ◆ user_id

class SensorController {
  async getUserColorSensor(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const data = await database.query(
        `SELECT *, 
    ColorSensor.name as name_sensor, 
    ColorSensor.red_value as red_value_sensor,
    ColorSensor.green_value  as green_value_sensor,
    ColorSensor.blue_value  as blue_value_sensor
    FROM ColorSensor 
    inner join room on ColorSensor.room_id = room.room_id 
    inner join preparedbackgrounds on room.background_id = preparedbackgrounds.background_id 
WHERE ColorSensor.user_id = ${user_id}`,
      );
      res.json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async getRoomColorSensor(req: Request, res: Response) {
    try {
      const { room_id } = req.body;
      const data = await database.query(
        `SELECT * FROM ColorSensor WHERE room_id = ${room_id}`,
      );
      res.json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async getUserStateSensor(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const data = await database.query(
        `SELECT *, StateSensor.name as name_sensor  FROM StateSensor 
    inner join room on StateSensor.room_id = room.room_id 
    inner join preparedbackgrounds on room.background_id = preparedbackgrounds.background_id 
WHERE StateSensor.user_id = ${user_id}`,
      );
      res.json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async getRoomStateSensor(req: Request, res: Response) {
    try {
      const { room_id } = req.body;
      const data = await database.query(
        `SELECT * FROM StateSensor WHERE room_id = ${room_id}`,
      );
      res.json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async getUserBinarySensor(req: Request, res: Response) {
    try {
      const { user_id } = req.body;
      const data = await database.query(
        `SELECT *, BinarySensor.name as name_sensor  FROM BinarySensor 
    inner join room on BinarySensor.room_id = room.room_id 
    inner join preparedbackgrounds on room.background_id = preparedbackgrounds.background_id 
WHERE BinarySensor.user_id = ${user_id}`,
      );
      res.json(data.rows);
    } catch (e) {
      console.log(e);
      res.status(420).json({
        status: false,
      });
    }
  }
  async getRoomBinarySensor(req: Request, res: Response) {
    try {
      const { room_id } = req.body;
      const data = await database.query(
        `SELECT * FROM BinarySensor WHERE room_id = ${room_id}`,
      );
      res.json(data.rows);
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async updateColorSensor(req: Request, res: Response) {
    try {
      const {
        room_id,
        user_id,
        sensor_id,
        red_value,
        blue_value,
        green_value,
        intensity,
      } = req.body;
      await database.query(
        "update ColorSensor set red_value = $1, blue_value = $2, green_value = $3, intensity = $4 where sensor_id = $5",
        [red_value, blue_value, green_value, intensity, sensor_id],
      );
      await database.query(
        "insert into history(text, history_type_id, sensor_id , room_id, user_id) values ($1, $2, $3, $4, $5)",
        ["Выполнена команда", 4, sensor_id, room_id, user_id],
      );
      res.status(200).json({
        status: true,
      });
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async updateStateSensor(req: Request, res: Response) {
    try {
      const { sensor_id, state, room_id, user_id } = req.body;
      await database.query(
        "update StateSensor set state = $1 where sensor_id = $2",
        [state, sensor_id],
      );
      await database.query(
        "insert into history(text, history_type_id, sensor_id , room_id, user_id) values ($1, $2, $3, $4, $5)",
        ["Выполнена команда", 4, sensor_id, room_id, user_id],
      );
      res.status(200).json({
        status: true,
      });
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
  async updateBinarySensor(req: Request, res: Response) {
    try {
      const { sensor_id, binary_state } = req.body;
      await database.query(
        "update BinarySensor set binary_state = $1 where sensor_id = $2",
        [binary_state, sensor_id],
      );
      res.status(200).json({
        status: true,
      });
    } catch (e) {
      res.status(420).json({
        status: false,
      });
    }
  }
}
// по user_id // getUserColorSensor
// по room_id // getRoomColorSensor
// изменить состояние по sensor_id, если has_command = true  // updateColorSensor
// по user_id // getUserStateSensor
// по room_id // getRoomStateSensor
// изменить состояние по sensor_id, если has_command = true // updateStateSensor
// по user_id // getUserBinarySensor
// по room_id // getRoomBinarySensor
// изменить состояние по sensor_id, если has_command = true // updateBinarySensor

export default new SensorController();
