import express, { Request, Response } from 'express'
import cors from 'cors'
import usersRoute from './routes/user.route'
import roomRoute from './routes/room.route'
import backgroundsRoute from './routes/backgrounds.route'
import sensorRoute from './routes/sensor.route'
import historyRoute from './routes/history.route'
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', usersRoute)
app.use('/api', roomRoute)
app.use('/api', backgroundsRoute)
app.use('/api', historyRoute)
app.use('/api', sensorRoute)

app.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})
app.listen(process.env.PORT || 4444, () => {
  console.log('SERVER OK')
})
