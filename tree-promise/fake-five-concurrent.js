const util = require('util')
const get = require('./api')

function splitArrayByNum(array, num) {
	const result = []
	let tmp = array.slice()
	while (tmp.length) {
		result.push(tmp.splice(0, num))
	}
	return result
}

function promiseFactory(pContainer, ids) {
	return Promise.all(ids.map(id => {
		const childContainer = {}
		pContainer.children.push(childContainer)
		return travel(childContainer, id)
	}))
}

function travel(container, id) {
	container.id = id
	container.children = []

	return get(id).then(ids => {
		let dat = Promise.resolve()

		splitArrayByNum(ids, 5).forEach(childIds => {
			// dat = dat.then(() => promiseFactory(container, childIds))

			//then chain make sure executed in order
			dat = dat.then(() => Promise.all(childIds.map(cId => {
				const con = {}
				container.children.push(con)
				return travel(con, cId)
			})))
		})
		return dat
	})
}

let result = {}
travel(result, 0).then(() => {
	console.log(util.inspect(result, {depth: 5}))
})