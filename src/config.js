import os from 'os'

const cpus = os.cpus()
const port = process.env.PORT || 3000

export {
  cpus,
  port,
}
