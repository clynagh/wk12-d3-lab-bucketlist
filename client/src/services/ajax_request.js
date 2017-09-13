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