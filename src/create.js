#! /usr/bin/env node

var fs = require('fs');
var request = require('request');
var open = require('open');

function createGist() {
    var gistBody = {
        "description": "Exported using gistifier",
        "public": false,
        "files": {}
    }

    var data = fs.readdirSync("./");

    for (var i = 0; i < data.length; i++) {
        if (data[i][0] != '.' && !fs.lstatSync(data[i]).isDirectory()) {
        	var fileContent = fs.readFileSync(data[i]).toString();
        	if(fileContent) {
        		gistBody.files[data[i]] = { "content": fileContent};
        	}
        }
    }

    var options = {
    	uri: "https://api.github.com/gists",
    	method: "POST",
    	json: gistBody,
    	headers: {
    		"User-Agent": "Gistifier 1.0"
    	}
    }
    console.log(gistBody);

    request(options, function(error, response, body) {
    	console.log(body);
    	console.log('Your Gist has been created at ' + body.html_url);
    	open(body.html_url);
    })

}

createGist();

