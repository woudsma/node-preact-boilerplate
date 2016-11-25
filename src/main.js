import cluster from 'cluster'
import express from 'express'
import bodyParser from 'body-parser'

import { cpus, port } from './config'
import { router } from './router'

if(cluster.isMaster) {

  do cluster.fork()
  while (Object.keys(cluster.workers).length < cpus.length)

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Worker ${worker.pid} died, spawning worker. code:`, signal || code)
    cluster.fork()
  })

} else {

  const app = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use('/', express.static('public')) // Don't do this when you want to serve static files using Nginx
  app.use('/api', router)

  app.listen(port)

  console.log(`Spawned worker thread, PID: ${process.pid}`)

}
