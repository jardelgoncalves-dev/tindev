import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({
  path: '.env'
})

export default () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch(err => {
      console.error(err)
    })
}
