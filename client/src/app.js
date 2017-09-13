var AjaxRequest = require('./services/ajax_request');
var CountriesView = require('./views/countries_view');
var Store = require('./models/store.js')

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

  var dropDown = document.querySelector('toVisit');
  countriesView.populateDropdown()
}

window.addEventListener('load', app);