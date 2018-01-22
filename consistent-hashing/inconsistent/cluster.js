const { hashCode } = require('../hash')
const Server = require('../server')
const Entry = require('../entry')

class Cluster {
  constructor() {
    this.servers = new Array(Cluster.MAX_SIZE)
    this.size = 0
    // this.put = this.put.bind(this)
  }

  put(e) {
    const index = hashCode(e) % this.size
    console.log(e, hashCode(e), index)
    this.servers[index].set(e)
  }

  get(e) {
    const index = hashCode(e) % this.size
    console.log(e, hashCode(e), index)
    return this.servers[index].get(e)
  }

  addServer(server) {
    if (this.size > Cluster.MAX_SIZE) return false

    this.servers[this.size++] = server
    return true
  }
}

Cluster.MAX_SIZE = 1024

module.exports = Cluster

