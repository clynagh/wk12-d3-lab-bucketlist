/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__(1);
var CountriesView = __webpack_require__(2);
var Store = __webpack_require__(3)

function app(){
  var countriesData = new AjaxRequest('https://restcountries.eu/rest/v2/all');
  var store = new Store();
  var countriesView = new CountriesView();
  var form = document.querySelector('#countries-form');
 
    form.addEventListener('submit', function(e){
    e.preventDefault();
    var searchQuery = this.search.value;
    var foundCountry = store.search(searchQuery);
    countriesView.render(foundCountry);
  })
  
  countriesData.get(store.saveData);
}

window.addEventListener('load', app);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var AjaxRequest= function(url) {
    this.url = url;
    this.data = [];
  }
  
  AjaxRequest.prototype.get = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
        callback(this.data);
        console.log(this.data);
      }
    }.bind(this);
    request.send();
  }
  
  AjaxRequest.prototype.post = function(callback, body){
    var request = new XMLHttpRequest();
    request.open("POST", this.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
        callback(body);
      }
    }.bind(this);
    request.send(JSON.stringify(body));
  }
  
  module.exports = AjaxRequest;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__(1)

var CountriesView = function(){

}

CountriesView.prototype.render = function(data){
    console.log(data);
    if (data === undefined){
        this.clearPage()
        var section  = document.querySelector('#printDetails')
        var title = document.createElement('h2');
        title.innerText = "Try again, Bozo!"
        section.appendChild(title);
    } else {
        this.clearPage()


    var section  = document.querySelector('#printDetails')
    var title = document.createElement('h2');
    var ul = document.createElement('ul');
    var li = document.createElement('li')
    var li2 = document.createElement('li')
    var flag = document.createElement('img');

    // ========FORM=============
    var form = document.createElement('form')
    var button = document.createElement('button')
    var text = document.createTextNode('Add to Bucket')
    form.appendChild(button);
    button.appendChild(text);
    form.id = ('submitForm')

    button.addEventListener('click', function(e){
        e.preventDefault();
        var bucketListAjax = new AjaxRequest('http://localhost:3000/api/countries')
        bucketListAjax.post(this.addToList, data)
    }.bind(this));
        // ===========================


    title.innerText = data.name;
    li.innerText = data.capital
    li2.innerText = data.population
    flag.src = data.flag;
    flag.width = 100;
    


    section.appendChild(title);
    title.appendChild(flag)
    section.appendChild(ul);
    section.appendChild(form)
    ul.appendChild(li)
    ul.appendChild(li2)
    
}
    // console.log(data);
}

CountriesView.prototype.addToList = function(country){
    var dropdownElement = document.querySelector('#toVisit');
    var optionElement = document.createElement('option');
    optionElement.innerText = country.name;
    console.log(dropdownElement);
    console.log(optionElement);
    dropdownElement.appendChild(optionElement);
    console.log(country.name);
}

CountriesView.prototype.clearPage = function(){
    var myNode = document.getElementById("printDetails");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
}
}

module.exports = CountriesView;




/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Store = function(){

}

Store.prototype.saveData = function(data){
    localStorage.setItem("countries", JSON.stringify(data));
}

Store.prototype.search = function(query){
    var savedCountries = JSON.parse(localStorage.getItem("countries"));
    for (var country of savedCountries){
        if (country.name === query){
            return country;
    }
}
}
module.exports = Store;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map