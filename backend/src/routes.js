import express from 'express'
import DevController from './controllers/DevController'
import LikeController from './controllers/LikeController'

const routes = express.Router()

routes.post('/dev', DevController.store)
routes.post('/dev/:devId/likes', LikeController.store)

export default routes
