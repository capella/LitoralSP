#!/usr/bin/env node

// Adiciona a url do server ao config.js

var fs = require('fs');
var path = require('path');
var ini = ini = require('ini');

var rootdir = process.argv[2];

function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
 
    var result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result , 'utf8');
}

if (rootdir) {

  // go through each of the platform directories that have been prepared
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  var confiPath = path.resolve(rootdir, '..', 'server','config.ini');

  var config = ini.parse(fs.readFileSync(confiPath, 'utf-8'));
  console.log(config.url);



  for(var x=0; x<platforms.length; x++) {
    // open up the index.html file at the www root
    try {
      var platform = platforms[x].trim().toLowerCase();
      var indexPath;

      if(platform == 'android') {
        indexPath = path.join('platforms', platform, 'assets', 'www', 'js','config.js');
      } else {
        indexPath = path.join('platforms', platform, 'www', 'js','config.js');
      }

      if(fs.existsSync(indexPath)) {
        replace_string_in_file(indexPath, "api.example.com", config.url);
      }

    } catch(e) {
      process.stdout.write(e);
    }
  }

}
