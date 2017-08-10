'use strict';

let _extends = Object.assign || function (target) {
		for (let i = 1; i < arguments.length; i++) {
			let source = arguments[i];
			for (let key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};

let withConstructor = function withConstructor(constructor) {
	return function (o) {
		let proto = Object.assign({}, Object.getPrototypeOf(o), {constructor: constructor});
		return Object.assign(Object.create(proto), o);
	};
};

let pipe = function pipe() {
	for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
		fns[_key] = arguments[_key];
	}

	return function (x) {
		return fns.reduce(function (y, f) {
			return f(y);
		}, x);
	};
};

let withFlying = function withFlying(o) {
	let _isFlying = true;

	return _extends({}, o, {
		fly: function fly() {
			_isFlying = true;
			return this;
		},
		land: function land() {
			_isFlying = false;
			return this;
		},

		isFlying: function isFlying() {
			return _isFlying;
		}
	});
};

let withBattery = function withBattery(_ref) {
	let capacity = _ref.capacity;
	return function (o) {
		let percentCharged = 100;

		return _extends({}, o, {
			draw: function draw(percent) {
				let remaining = percentCharged - percent;
				percentCharged = remaining > 0 ? remaining : 0;
				return this;
			},

			getCharge: function getCharge() {
				return percentCharged;
			},
			get capacity() {
				return capacity;
			}
		});
	};
};

let createDrone = function createDrone(_ref2) {
	let _ref2$capacity = _ref2.capacity,
		capacity = _ref2$capacity === undefined ? '3000mAh' : _ref2$capacity;
	return pipe(withFlying, withBattery({capacity: capacity}), withConstructor(createDrone))({});
};

let myDrone = createDrone({capacity: '5500mAh'});

console.log('\ncan fly: ' + (myDrone.fly().isFlying() === true) + '\ncan land: ' + (myDrone.land().isFlying() === false) + '\nbattery capacity: ' + myDrone.capacity + '\nbattery status: ' + myDrone.draw(50).getCharge() + '%\nbattery drained: ' + myDrone.draw(75).getCharge() + '%\n');

console.log('constructor linked: ' + (myDrone.constructor === createDrone));