import Router from 'express'
import HistoryController from '../controller/history.controller'

// @ts-ignore
const historyRoute = new Router()

historyRoute.post('/history', HistoryController.createHistory)
historyRoute.get('/history.getUserHistory', HistoryController.getUserHistory)
historyRoute.get(
  '/history.getSensorHistory',
  HistoryController.getSensorHistory
)
historyRoute.get('/history.getRoomHistory', HistoryController.getRoomHistory)
export default historyRoute
