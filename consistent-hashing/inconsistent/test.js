const Cluster = require('./cluster')
const Server = require('../server')
const Entry = require('../entry')

// test
function createCluster() {
  const c = new Cluster()
  c.addServer(new Server("192.168.0.0"));
  c.addServer(new Server("192.168.0.1"));
  c.addServer(new Server("192.168.0.2"));
  c.addServer(new Server("192.168.0.3"));
  c.addServer(new Server("192.168.0.4"));
  c.addServer(new Server("192.168.0.5"));
  return c
}

function findEntries(c, entries) {
  entries.forEach(e => {
    if (e === c.get(e)) {
      console.log('重新找到了entry: ' + e)
    } else {
      console.log('entry已失效:' + e)
    }
  })

}

// test

function test() {
  const c = createCluster()
  const entries = [
    new Entry("i"),
    new Entry("have"),
    new Entry("a"),
    new Entry("pen"),
    new Entry("an"),
    new Entry("apple"),
    new Entry("applepen"),
    new Entry("pineapple"),
    new Entry("pineapplepen"),
    new Entry("PPAP"),
  ]
  entries.forEach(e => c.put(e))

  c.addServer(new Server('192.168.0.6'))

  findEntries(c, entries)
}

test()
