'use strict'

const {readFileSync} = require("fs");
const {writeFileSync} = require("fs");
module.exports = GenerateConfig;

// const fs = require('fs');
function readJSONFile(fileName) {
    return JSON.parse(readFileSync(fileName, 'utf8'));
}

function GenerateConfig(options) {
    let configLocation = options['configLocation'] || '';
    let configOutputFile = options['configOutputFile'];
    let environment = process.env.environment || options['defaultEnvironment'];

    try {
        let config = readJSONFile(configLocation);
        //let envConfigValues = readJSONFile(configFileLocation);

        if (config) {
            //grunt.file.write(outputTempFileName + "/" + environment + "/" + "ServiceEndPoint.json", JSON.stringify(endPoints));
            writeFileSync(configOutputFile + "/" + "EnvConfig.json", JSON.stringify(config[environment]));
        }
    } catch (e) {
        console.log('in error');
        console.log(e);
    }
}
