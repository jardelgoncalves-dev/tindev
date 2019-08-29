import Dev from '../models/DevSchema'
import api from '../config/api'

export default {
  async index (req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })
    return res.json(users)
  },

  async store (req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })
    if (userExists) {
      return res.json(userExists)
    }

    try {
      const response = await api.get(username)
      const { name, bio, avatar_url: avatar } = response.data
      const dev = await Dev.create({
        name,
        user: username,
        bio,
        avatar
      })
      return res.json(dev)
    } catch (err) {
      return res.status(404).json({ error: 'Usuário não possui conta no github' })
    }
  }
}
