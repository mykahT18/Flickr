'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// console.log("MVC loaded")

var Controller = function () {
	function Controller() {
		_classCallCheck(this, Controller);

		// console.log("Controller was made.")
		this.dataResults = [];
		this.model = new Model();
		this.view = new View();
		this.grabQuery();
	}

	_createClass(Controller, [{
		key: 'grabQuery',
		value: function grabQuery() {
			var _this = this;

			var userInput = document.querySelector('input[type=text]');
			var searchBtn = document.querySelector('#subBtn');
			var p = document.querySelector('#resultContainer > p');

			searchBtn.addEventListener("click", function (e) {
				e.preventDefault();
				var query = userInput.value;
				p.innerHTML = 'Your Results: ' + query;
				var limit = "25";
				var key = "89855b41a6b46d1e6a1cb3f21b1c8b5d";
				var safe = "1";
				var api = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key + '&text=' + query + '&safe_search=' + safe + '&per_page=' + limit + '&format=json&nojsoncallback=1&ext';
				document.querySelector('form').reset();
				_this.model.request(api);
				_this.sendResults();
			});
		}
	}, {
		key: 'sendResults',
		value: function sendResults() {
			this.dataResults = this.model.sendData();
			this.view.setData(this.dataResults);
		}
	}]);

	return Controller;
}();

var Model = function () {
	function Model() {
		_classCallCheck(this, Model);

		// console.log("Model was made.")
		this.results = [];
	}

	_createClass(Model, [{
		key: 'request',
		value: function request(url) {
			var _this2 = this;

			fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				_this2.newData(data.photos.photo);
			}).catch(function (error) {
				alert("Error in getting data.");
			});
		}
	}, {
		key: 'newData',
		value: function newData(arr) {
			for (var i = 0; i < arr.length; i++) {
				var tempResults = new PhotoDO(arr[i].farm, arr[i].id, arr[i].server, arr[i].secret);
				this.results.push(tempResults);
			}
			this.sendData(this.results);
		}
	}, {
		key: 'sendData',
		value: function sendData() {
			return this.results;
		}
	}]);

	return Model;
}();

var View = function () {
	function View() {
		_classCallCheck(this, View);

		// console.log("View was made.")
		this.photos = [];
	}

	_createClass(View, [{
		key: 'setData',
		value: function setData(res) {
			var _this3 = this;

			this.photos = res;
			setTimeout(function () {
				_this3.displayResult();
			}, 1000);
		}
	}, {
		key: 'displayResult',
		value: function displayResult() {
			var element = document.querySelector('.results');
			element.innerHTML = "";
			var pictures = '';
			if (this.photos.length > 0) {
				for (var i = 0; i < this.photos.length; i++) {
					pictures += '<li id="image">';
					pictures += '<img src="https://farm' + this.photos[i].farm + '.staticflickr.com/' + this.photos[i].server + '/' + this.photos[i].id + '_' + this.photos[i].secret + '.jpg"/>';
					pictures += '</li>';
				}
			}
			if (element != null) {
				element.insertAdjacentHTML('beforeend', pictures);
			}
		}
	}]);

	return View;
}();

var PhotoDO = function PhotoDO(farm, id, server, secret) {
	_classCallCheck(this, PhotoDO);

	this.farm = farm;
	this.id = id;
	this.server = server;
	this.secret = secret;
};