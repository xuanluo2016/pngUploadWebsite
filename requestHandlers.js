//var exec = require("child_process").exec;
var querystring = require("querystring");
// install module formidable to handle uploaded files
var formidable = require("formidable");
var fs = require("fs");

// initialize web form
function start(response, request) {
    console.log("Request handler 'start' was called.");
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write(body);
    response.end();
  
  }
  
  //save the uploaded png file in local directory , ./tmp/test.png
  function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
      console.log("parsing done");
      fs.renameSync(files.upload.path, "./tmp/test.png");
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("received image:<br/>");
      response.write("<img src='/show' />");
      response.end();
    })
  }

// read stored pics in./tmp/test.png and show it in the web browser
// report error if no test.png in ./tmp directory
  function show(response, request) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}
  
// export methods for function call in other js files
  exports.start = start;
  exports.upload = upload;
  exports.show = show;