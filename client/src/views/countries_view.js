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
    var button = document.createElement('button')
    title.innerText = data.name;
    li.innerText = data.capital
    li2.innerText = data.population
    flag.src = data.flag;
    flag.width = 100;
    


    section.appendChild(title);
    title.appendChild(flag)
    section.appendChild(ul);
    section.appendChild(button)
    ul.appendChild(li)
    ul.appendChild(li2)
    
}
    // console.log(data);
}

CountriesView.prototype.clearPage = function(){
    var myNode = document.getElementById("printDetails");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
}
}

module.exports = CountriesView;


