var http = require('http');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (request, response) {
  var pathName = url.parse( request.url ).pathname;
  console.log(request.url.slice(1));
  if (request.url === '/') {
    helpers.serveAssets(response, '/index.html', function (err, data) {
      // response.send(JSON.stringify(data));
    });
  }

  // fs.appendFile( archive.paths.list, 'www.google.com', function (err) {
  //   if (err) throw err;
  //   console.log('It\'s saved!');
  // });

  // console.log(typeof archive.paths, archive.paths);
  // respond.end( archive.paths.list );
};