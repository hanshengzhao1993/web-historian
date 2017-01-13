var http = require('http');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  console.log('request url: ', request.url);

  if (request.method === 'GET') {
    if (request.url === '/') {
      helpers.serveAssets(response, '/index.html', function (err, data) {
      });
    } else {
      archive.isUrlArchived(request.url.slice(1), function (err, trueOrFalse ) {
        if ( trueOrFalse ) {
            var path = archive.paths.archivedSites + request.url;
            response.writeHead(200, header);
            fs.readFile(first, second, function (err,content) {
              response.end(content);
            })      
          });
          // response.writeHead(200);
        } else {
          response.writeHead(404); 
          response.end();
        }
      });       
    }
  }
  if ( request.method === 'POST') {

  } else {

  }
};