// console.log("This singleton script is loaded");

class App{
	constructor(){
		// console.log("Singleton was created");
		const theController = new Controller();
	}
	static getInstance(){
		if(!App._instance){
			App._instance = new App();
			return App._instance;
		}else{
			throw "App was already created.";
		}
	}
}