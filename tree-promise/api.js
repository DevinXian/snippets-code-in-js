const data = require('./tree.json')

function mock(ids) {
	return new Promise(res => {
		setTimeout(res, 500, ids)
	})
}

function get(id) {
	if (id === 0) return mock(data.children.map(item => item.id))
	if (id === 1) return mock(data.children[0].children.map(item => item.id))
	if (id === 3) return mock(data.children[2].children.map(item => item.id))

	return mock([])
}

module.exports = get
