const util = require('util')
const get = require('./api')
const result = {id: 0, children: []}//first element in queue
const queue = [result]

function travel() {
	if (!queue.length) {
		console.log(util.inspect(result, {depth: 5}))
		return
	}

	const len = Math.min(5, queue.length)
	const arr = queue.splice(0, len)

	Promise.all(arr.map(req => get(req.id))).then(res => {
		for (let i = 0; i < res.length; i++) {
			let resItem = res[i]
			//req.id --> resItem {Array}
			for (let j = 0; j < resItem.length; j++) {
				const con = {id: resItem[j], children: []}
				arr[i].children.push(con)
				queue.push(con)
			}
		}
		travel()
	})
}

travel()

