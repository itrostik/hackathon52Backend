import database from '../utils/database'
import { Request, Response } from 'express'

// ✦ background_id
// ● red_value
// ● green_value
// ● blue_value

class BackgroundsController {
  async getAll(req: Request, res: Response) {
    const data = await database.query('SELECT * FROM PreparedBackgrounds')
    res.json(data.rows)
  }
}

export default new BackgroundsController()
