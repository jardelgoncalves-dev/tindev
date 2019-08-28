import express from 'express'
import DevController from './controllers/DevController'

const routes = express.Router()

routes.post('/dev', DevController.store)

export default routes
