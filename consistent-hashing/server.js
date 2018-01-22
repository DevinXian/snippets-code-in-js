class Server {
  constructor() {
    this.name = ''
    this.map = new Map()
  }

  set(e) {
    this.map.set(e, e)
  }

  get(e) {
    this.map.get(e)
  }
}

module.exports = Server
