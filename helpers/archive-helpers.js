var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var url = require('url');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile( exports.paths.list, function (err, data) {
    var sites = data.toString().split('\n');  
    callback( err, sites);
  });
};

exports.isUrlInList = function(url, callback) {

  fs.readFile(exports.paths.list, function (err, data) {
    var a = data.toString().indexOf(url) !== -1 ? true : false;
    callback(err, a);
  });

};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url, function (err, data) {
    callback(err, data);
  });
};

exports.isUrlArchived = function(url, callback) {

  fs.readFile(exports.paths.archivedSites + '/' + url, function (err, data) {
    callback(null, ( !err ? true : false) );
  });
};

exports.downloadUrls = function( urlArray ) {
  _.each(urlArray, function (url) {
    request('http://' + url).pipe(fs.createWriteStream( exports.paths.archivedSites + '/' + url));
  });
};

