// 'use strict'
// const fs = require('fs');
// const Q = require('q');
// const http = require('https');

const {writeFileSync} = require("fs");

function readJSONFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

module.exports = GenerateSubmissionDTO;

function GenerateSubmissionDTO(options) {

    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    let outputDir = options['outputDir'] || '';
    let outputFileName = options['outputFileName'];

    let postalCode = grunt.option('zipCode') || '92821';
    let quoteID = grunt.option('quoteID') || 'CAQ5000001052';
    try {
        let retPromise = sendData(options['edgeMethodName'], [{'postalCode': postalCode, 'quoteID': quoteID}]);
        retPromise.then(function (resp) {
            //console.log(resp);
            writeFileSync(outputDir + outputFileName, resp);
        });
    } catch (e) {
        console.log('in error');
        console.log(e);
    }
}

function sendData(method, params) {
    let requestPromise = Q.defer();
    let headers = {
        'Content-Type': 'application/json',
        'usertoken': 'any',
        'Authorization': options['edgeAuthorization']
    };
    let timeout = 0;
    let httpOptions = {
        method: 'POST',
        host: options['edgeHost'],
        port: options['edgePort'],
        path: options['edgeServicePath'],
        headers: headers,
        timeout: timeout
    };
    let req = http.request(httpOptions, function (res) {
        let data = [];
        //console.log(res);
        res.on('data', function (chunk) {
//                    //requestPromise.resolve(chunk);
            //console.log(chunk);
            data.push(chunk);
        });
        res.on('end', function () {
            //console.log('done');
            requestPromise.resolve(Buffer.concat(data));
            //requestPromise.resolve('done');
        });
    });
    req.on('socket', function (socket) {
        socket.setTimeout(90000);
        socket.on('timeout', function () {
            //console.log('setting timeout');
            req.abort();
        });
    });
    req.on('error', function (err) {
        console.log(err);
        console.log(err.stack);
    });
    let data = JSON.stringify({'id': 1 + '', 'method': method, 'params': params, 'jsonrpc': '2.0'});
    req.write(data);
    req.end();
    return requestPromise.promise;
}
