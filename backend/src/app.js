import express from 'express'
import cors from 'cors'
import ConnMongoose from './config/connection-mongoose'
import routes from './routes'

class App {
  constructor () {
    this.express = express()

    this.config()
    this.middlewares()
    this.routes()
  }

  config () {
    ConnMongoose()
    this.express.set('port', 3333)
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes () {
    this.express.use(routes)
  }
}

export default new App().express
