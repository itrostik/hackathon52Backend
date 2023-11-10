import database from "../utils/database";
import { Request, Response } from "express";
import { getToken } from "../utils/jwt";
import { checkPassword, hashPassword } from "../utils/password.hash";

// ✦ user_id
// ● name
// ● password
// ● email
// ● phone_number
// ● register_date
// ● user_avatar

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, phone_number, user_avatar } = req.body;
      const user = await database.query("select * from usr where email = $1", [
        email,
      ]);
      if (!user.rows[0]) {
        const passwordHash = await hashPassword(password);
        const newUser = await database.query(
          "insert into usr (username, password, email, phone_number, user_avatar) values ($1, $2, $3, $4, $5) returning *",
          [username, passwordHash, email, phone_number, user_avatar],
        );
        const token = getToken(newUser.rows[0]);
        res.status(201).json({
          token,
        });
      } else {
        res.status(420).json({
          message: "Пользователь с таким email уже есть в системе",
        });
      }
    } catch (err) {
      res.status(402).json({
        message: "Произошла какая-то ошибка",
      });
    }
  }
  async checkUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await database.query("select * from usr where email = $1", [
        email,
      ]);
      const userPasswordHash = user.rows[0]["password"];
      if (await checkPassword(password, userPasswordHash)) {
        const token = getToken(user.rows[0]);
        res.status(200).json({
          token,
        });
      } else {
        res.status(401).json({
          message: "Неверный логин или пароль",
        });
      }
    } catch (err) {
      res.status(401).json({
        message: "Неверный логин или пароль",
      });
    }
  }
}

export default new UserController();
