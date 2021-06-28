'use strict'
// const fs = require('fs');
//
// function readJSONFile(fileName) {
//     return JSON.parse(fs.readFileSync(fileName, 'utf8'));
// }

const {writeFileSync} = require("fs");
module.exports = GenerateAppDynamics;

function GenerateAppDynamics(options) {
    let configOutputFile = options['configOutputFile'];
    let environment = process.env.environment || options['defaultEnvironment'];

    try {
        let script = "window['adrum-start-time'] = new Date().getTime(); window['adrum--app-key'] = ";

        if (environment === 'prod') {
            script += "'AD-AAB-AAC-HDJ';"
        } else {
            script += "'AD-AAB-AAB-YBA';"
        }
        writeFileSync(configOutputFile + "/" + "appDynamics.js", script);
    } catch (e) {
        console.log('in error');
        console.log(e);
    }
}
