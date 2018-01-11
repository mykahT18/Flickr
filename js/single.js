"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log("This singleton script is loaded");

var App = function () {
	function App() {
		_classCallCheck(this, App);

		console.log("Singleton was created");
		// Create the instance of Controller here
		var theController = new Controller();
	}

	_createClass(App, null, [{
		key: "getInstance",
		value: function getInstance() {
			if (!App._instance) {
				App._instance = new App();
				return App._instance;
			} else {
				throw "App was already created.";
			}
		}
	}]);

	return App;
}();