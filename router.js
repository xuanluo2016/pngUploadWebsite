// mapping file path to related handler
// report error if no related handler found
function route(handle, pathname,response, request) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);
    return "404 Not found";
  }
}

// export method route for function call in other js files
exports.route = route;