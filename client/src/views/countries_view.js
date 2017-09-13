var AjaxRequest = require('../services/ajax_request')

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

CountriesView.prototype.populateDropdown = function(){
    var bucketListAjax = new AjaxRequest('http://localhost:3000/api/countries')              
    bucketListAjax.get(this.listNames)
    // console.log("populate dropdown")
}

CountriesView.prototype.listNames = function(data){
    var dropDown = document.querySelector('#toVisit');
    for (var country of data){
        var option = document.createElement('option')
        option.innerText = country.name
        dropDown.appendChild(option);
    }
}
module.exports = CountriesView;


