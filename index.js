#! /usr/bin/env node

var http = require('http');

// http://www.reddit.com/r/jokes
//
var request = http.get('http://www.reddit.com/r/oneliners/hot.json?limit=10', function (response) {
  var responseBody = '';

  // concatenate data chunks to responseBody
  response.on('data', function (dataChunk) {
    responseBody += dataChunk;
  });


  // on request end
  response.on('end', function() {
    if(response.statusCode == 200) {
      try {
        // parse data
        var listing = JSON.parse(responseBody);

        // get array of listings
        var arrayListings = listing.data.children;
        var random = Math.floor(Math.random() * 10) + 1;

        console.log(arrayListings[random].data.title);

      } catch(error) {
        // Print parse error
        console.error("Parse error: " + error.message);
      }

    } else {
      // print status code error message
      console.error('There was an error fetching the listings (' + http.STATUS_CODES[response.statusCode] + ')');
    }

  });


});
