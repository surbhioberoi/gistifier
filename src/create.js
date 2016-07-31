#! /usr/bin/env node

var fs = require('fs');
var request = require('request');
var open = require('open');

function createGist() {
    var gistBody = {
        "description": "Exported using gistify",
        "public": false,
        "files": {}
    }

    var data = fs.readdirSync("./");

    for (var i = 0; i < data.length; i++) {
        if (!fs.lstatSync(data[i]).isDirectory()) {
            gistBody.files[data[i]] = { "content": fs.readFileSync(data[i]).toString() };
        }
    }

    var options = {
    	uri: "https://api.github.com/gists",
    	method: "POST",
    	json: gistBody,
    	headers: {
    		"User-Agent": "Gistify 1.0"
    	}
    }

    request(options, function(error, response, body) {
    	console.log('Your Gist has been created at ' + body.html_url);
    	open(body.html_url);
    })

}

createGist();

