// console.log("MVC loaded")

class Controller{
	constructor(){
		// console.log("Controller was made.")
		this.dataResults = []
		this.model = new Model()
		this.view = new View()
		this.grabQuery()
	}
	grabQuery(){
		let userInput = document.querySelector('input[type=text]')
		let searchBtn = document.querySelector('#subBtn')
		let p = document.querySelector('#resultContainer > p')
		
		searchBtn.addEventListener("click", (e) =>{
			e.preventDefault()
			let query = userInput.value
			p.innerHTML = 'Your Results: ' + query
			const limit = "25"
			const key = "89855b41a6b46d1e6a1cb3f21b1c8b5d"
			const safe = "1"
			let api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${query}&safe_search=${safe}&per_page=${limit}&format=json&nojsoncallback=1&ext`
			let form = document.querySelector('form').reset()
			console.log("search was clicked")
			this.model.request(api);
			this.sendResults();
		})
	}
	sendResults(){
		this.dataResults = this.model.sendData()
		this.view.setData(this.dataResults)
	}
}

class Model{
	constructor(){
		// console.log("Model was made.")
		this.results = []
	}
	request(url){
		fetch(url)
			.then((response) => response.json())
			.then(data => {
				this.newData(data.photos.photo)		
			})
			.catch(error => {
				console.log("Error in getting data.")
			})
	}
	newData(arr){
		for (let i = 0; i < arr.length; i++) {
			let tempResults = new PhotoDO(arr[i].farm, arr[i].id, arr[i].server, arr[i].secret );
			this.results.push(tempResults);
		}
		this.sendData(this.results)
	}
	sendData(){
		return this.results
	}
}

class View{
	constructor(){
		// console.log("View was made.")
		this.photos = []
	}
	setData(res){
		this.photos = res
		setTimeout(()=>{
    	this.displayResult()
    },1000)
	}
	displayResult(){
		let element = document.querySelector('#results')
		element.innerHTML= ''
		let pictures = ''
		let photoArr = this.photos
		if(photoArr){
    		for (let i = 0; i < photoArr.length; i++){
					pictures += '<li id="image">'
					 + '<img src="https://farm'+ photoArr[i].farm+'.staticflickr.com/'+ photoArr[i].server +'/'+ photoArr[i].id + '_'+ photoArr[i].secret +'.jpg"/>'
					 + '</li>'
				}
		}
		if(element !== null){
			
			element.insertAdjacentHTML('beforeend', pictures);
		}
	}
}

class PhotoDO {
  constructor(farm, id, server, secret){
   this.farm = farm
   this.id = id
   this.server = server
   this.secret = secret
  }
}