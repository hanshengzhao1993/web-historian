var http = require('http');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  // console.log('request url: ', request.url);

  if (request.method === 'GET') {
    if (request.url === '/') {
      helpers.serveAssets(response, '/index.html', function (err, data) {
      });
    } else {
      archive.isUrlArchived(request.url.slice(1), function (err, trueOrFalse ) {
        if ( trueOrFalse ) {
          console.log(request.url);
          helpers.serveAssets(response, request.url.slice(1), function (err, data) {
            console.log('errL   ', err);
            console.log('data', data);
          });
        } else {
          // console.log('request.url', request.url);
          response.writeHead(404); 
          response.end();
        } 
        // if ( trueOrFalse) {
        //   helpers.serveAssets(response, request.url, function (err, data) {
        //   });
        // } else {
        //   helpers.serveAssets(response, request.url, function (err, data) {

        //   });
        // }
      });       
    }
  }
};