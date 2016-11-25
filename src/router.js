import { Router } from 'express'

const router = Router()

// You would probably get this from the database
const users = {
  '001': { name: 'John', age: 30 },
  '002': { name: 'Mary', age: 20 },
}

router.get('/', (req, res) => res.json({ message: `Hello multi-threaded API`, worker: process.pid }))

router.get('/users', (req, res) => res.json(users))

router.get('/users/:id', (req, res) => res.json(users[req.params.id]))

export {
  router
}
