import express from 'express'
import cors from 'cors'
import ConnMongoose from './config/connection-mongoose'
import routes from './routes'
import socket from 'socket.io'
import http from 'http'

class App {
  constructor () {
    this.express = express()
    this.server = http.Server(this.express)
    this.io = socket(this.server)
    this.connectedUsers = {}
    this.config()
    this.websocket()
    this.middlewares()
    this.routes()
  }

  config () {
    ConnMongoose()
  }

  websocket () {
    this.io.on('connection', socket => {
      const { user } = socket.handshake.query
      this.connectedUsers[user] = socket.id
    })
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use((req, res, next) => {
      req.io = this.io
      req.connectedUsers = this.connectedUsers
      return next()
    })
  }

  routes () {
    this.express.use(routes)
  }
}

export default new App().server
