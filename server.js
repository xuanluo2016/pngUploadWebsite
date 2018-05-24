// get the http module from node.js 
var http = require("http");
var url = require("url");


// create a http server which listens on 8888 port
let start =(route, handle) => {
http.createServer(function(request, response) {
  var postData = "";
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + "received.");
  route(handle, pathname, response, request);

}).listen(8888);

console.log("please browse http://127.0.0.1:8888 in your webbrowser");
}

// export method start for function call in other js files
exports.start = start;