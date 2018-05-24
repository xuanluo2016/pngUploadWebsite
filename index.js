var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// Mapping URL path to handlers
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

// start server
server.start(router.route, handle);
