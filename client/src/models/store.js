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