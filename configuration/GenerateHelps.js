'use strict'

// const fs = require('fs');

const {writeFileSync} = require("fs");
const {readFileSync} = require("fs");

function readJSONFile(fileName) {
    return JSON.parse(readFileSync(fileName, 'utf8'));
}

module.exports = GenerateHelps;

function GenerateHelps(options) {
    let outputDir = options['outputDir'] || '';
    let constraintConfig = readJSONFile(options['configFile']);
    let allStates = readJSONFile(options['allStateConfigFile']);
    let allRateLevels = readJSONFile(options['allRateLevelConfigFile']);
    allStates = allStates["ALL"];
    allRateLevels = allRateLevels["ALL"];
    let output = {};

    let stateOutput = {};
    for (let constraint in constraintConfig) {
        let values = constraintConfig[constraint];
        for (let value in values) {
            let stateValues = values[value].state;
            let rateLevel = values[value].rateLevel;
            if (stateValues) {
                if (stateValues[0] === "ALL") {
                    stateValues = allStates;
                }
            }
            for (let state in stateValues) {
                let rates = [];
                let rateLevelPath;
                if (rateLevel && rateLevel !== "ALL") {
                    rates.push(rateLevel);
                } else {
                    rates = allRateLevels;
                }
                for (let rate in rates) {
                    rateLevelPath = "/" + rates[rate] + "/";
                    let fileName = stateValues[state] + rateLevelPath + stateValues[state] + options['outputFileName'];
                    let fileContent = output[fileName];
                    if (fileContent === undefined) {
                        fileContent = {};
                    }
                    fileContent[constraint] = values[value].value;

                    output[fileName] = fileContent;
                }
            }
        }

    }

    for (let file in output) {
        writeFileSync(outputDir + file, JSON.stringify(output[file]));
    }
}
