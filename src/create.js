#! /usr/bin/env node

var fs = require('fs');
var request = require('request');
var open = require('open');
var program = require('commander');


program.option('-p --public', 'Posts your Gist publicly. Defaults to secret if option is not included.')


var fileNames = [];

program
    .command('push [names...]')
    .description('Select the files you wish to push as Gist')
    .action(function(names) {
        if (names.length === 0) {
            fileNames = fs.readdirSync("./");
        } else {
            fileNames = names;
        }
        createGist();
    })


program.parse(process.argv);



function getFiles(listOfFiles) {
    // This function returns an object which is as follows
    // {
    //   <filename1>: {'content': <filecontent1>},
    //   <filename2>: {'content': <filecontent2>}
    // }

    var fileData = {};

    for (var i = 0; i < listOfFiles.length; i++) {
        if (listOfFiles[i][0] != '.' &&
            !fs.lstatSync(listOfFiles[i]).isDirectory()) {
            var fileContent = fs.readFileSync(listOfFiles[i]).toString();
            if (fileContent) {
                fileData[listOfFiles[i]] = { "content": fileContent };
            }
        }
    }
    return fileData;
}


function createGist() {
    var gistBody = {
        "description": "Exported using gistifier",
        "public": false,
        "files": getFiles(fileNames)
    }

    if (program.public) {
        gistBody.public = true;
    }

    var options = {
        uri: "https://api.github.com/gists",
        method: "POST",
        json: gistBody,
        headers: {
            "User-Agent": "Gistifier 1.0"
        }
    }

    request(options, function(error, response, body) {
        console.log('Your Gist has been created at ' + body.html_url);
        open(body.html_url);
    })
    console.log('Creating your Gist...');
}
