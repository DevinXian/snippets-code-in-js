const get = require('./api')

let result = {}

function travel(container, startId) {
	container.id = startId
	container.children = []

	return get(startId).then(ids => {
		return Promise.all(ids.map(id => {
			let childContainer = {}
			container.children.push(childContainer)
			return travel(childContainer, id)
		}))
	})
}

travel(result, 0).then(() => {
	console.log(require('util').inspect(result, {depth: 5}))
})
