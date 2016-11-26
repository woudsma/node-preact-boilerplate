import { Router } from 'express'

const router = Router()

// You will probably get this from your database
const users = new Array(1e2)
  .fill()
  .map(e => ({ name: `user_${Math.random().toFixed(8).substring(2)}`}))

router.get('/', (req, res) => res.json({ message: `Hello multi-threaded API`, worker: process.pid }))

router.get('/users', (req, res) => res.json(users))

router.get('/users/:id', (req, res) => res.json(users[req.params.id]))

export {
  router
}
