import { Schema, model } from 'mongoose'

const DevSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: String,
    required: true
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }]
}, {
  timestamps: true
})

DevSchema.pre('save', function (next) {
  if (!this.name) {
    this.name = this.user
  }
  next()
})

export default model('Dev', DevSchema)
