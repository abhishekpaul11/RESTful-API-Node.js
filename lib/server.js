/*
 * Server settings for the API
 *
 */ 

//dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./handlers');
var helpers = require('./helpers');
var fs = require('fs');
var path = require('path')
var config = require('./config')

//server container
var server = {}

//Create http Server
server.httpServer = http.createServer(function(req,res){
    server.unifiedServer(req,res);
})

//HTTPS options
server.httpsOptions = {
    'key': fs.readFileSync(__dirname+'/../https/key.pem'),
    'cert': fs.readFileSync(__dirname+'/../https/cert.pem')
}

//Create https Server
server.httpsServer = https.createServer(server.httpsOptions, function(req,res){
    server.unifiedServer(req.res);
})

server.unifiedServer = function(req, res){
    //parse the url
    var parsedUrl = url.parse(req.url, true);

    //get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //get the queries
    var queryStringObject = parsedUrl.query;

    //get the method
    var method = req.method.toLowerCase();

    //get the headers as an object
    var headers = req.headers;

    //get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = ''
    req.on('data',function(data){
        buffer+=decoder.write(data);
    })
    req.on('end',function(){
        buffer += decoder.end();

        //Check the matching handler from the path. If none is found, then not found handler is assigned
        var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

        //Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        }

        //Routing the request
        chosenHandler(data, function(statusCode, payload){

            //if no status code is returned, default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            //if no payload is received, default to empty object
            payload = typeof(payload) == 'object' ? payload : {};
            
            //convert payload to string
            var payloadString = JSON.stringify(payload);

            //return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(trimmedPath,statusCode);
        })
    })
}

//routers
server.router = {
    'user': handlers.user,
    'tokens': handlers.tokens,
    'menu': handlers.menu,
    'order': handlers.order,
    'cart': handlers.cart,
    'ping': handlers.ping,
}

//init the server
server.init = function(){
    //start the HTTP server
    server.httpServer.listen(config.httpPort,function(){
        console.log('The HTTP server is running on port '+config.httpPort);
    });
    //start the HTTPS server
    server.httpsServer.listen(config.httpsPort,function(){
        console.log('The HTTPS server is running on port '+config.httpsPort);
    });
}

//export the server
module.exports = server