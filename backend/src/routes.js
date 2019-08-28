import express from 'express'
import DevController from './controllers/DevController'
import LikeController from './controllers/LikeController'
import DislikeController from './controllers/DislikeController'

const routes = express.Router()

routes.post('/dev', DevController.store)
routes.post('/dev/:devId/likes', LikeController.store)
routes.post('/dev/:devId/dislikes', DislikeController.store)

export default routes
