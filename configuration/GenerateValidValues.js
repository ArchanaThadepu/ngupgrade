'use strict'
// const fs = require('fs');
// let configUtil = require('./ConfigUtil');
// let extend = require('util')._extend;
// let Q = require('q');
// let http = require('https');

module.exports = GenerateValidValues;

function GenerateValidValues(options) {
    console.log("\tGenerateValidValues");
}
//
// function GenerateValidValues2(options) {
//     process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
//     let outputDir = options['outputDir'] || '';
//
//     let validValueConfig = readJSONFile(options['configFile']);
//     let allStates = readJSONFile(options['allStateConfigFile']);
//     let staticValidValues = readJSONFile(options['staticValidValuesFile']);
//     let allRateLevels = readJSONFile(options['allRateLevelConfigFile']);
//     //get all state values of ALL key word from file
//     allStates = allStates["ALL"];
//     allRateLevels = allRateLevels["ALL"];
//     let outputValues = {};
//     let promises = [];
//
//
//     let stateOutput = {};
//     for (let validValueKey in validValueConfig) {
//         let typeList = validValueConfig[validValueKey];
//         let typeListName = typeList.typeListName;
//         let typeListFilters = typeList.typeListFilters;
//         let changes = typeList.changes;
//         //this is array
//         for (let filter in typeListFilters) {
//             let name = typeListFilters[filter].filterName;
//             let states = typeListFilters[filter].state;
//             let rateLevel = typeListFilters[filter].rateLevel;
//             let retPromise = sendData(options['edgeMethodName'], [typeListName, name], validValueKey, states, rateLevel, changes);
//             promises.push(retPromise);
//         }
//     }
//
//     Q.all(promises).then(function (resp) {
//         let output = {};
//         for (let index in resp) {
//             //make a clone of resp objec so that each change in changes will not affect other states or ratelevel
//             let retValidValue = extend({}, resp[index]);
//             let stateValues = retValidValue.stateValues;
//             let rateLevel = retValidValue.rateLevel;
//             if (stateValues) {
//                 if (stateValues[0] === "ALL") {
//                     stateValues = allStates;
//                 }
//             }
//             //stateValues is array
//             for (let state in stateValues) {
//                 let rates = [];
//                 let rateLevelPath;
//                 if (rateLevel && rateLevel != "ALL") {
//                     rates.push(rateLevel);
//                 } else {
//                     rates = allRateLevels;
//                 }
//
//                 for (let rate in rates) {
//                     rateLevelPath = "/" + rates[rate] + "/";
//                     let fileName = stateValues[state] + rateLevelPath + stateValues[state] + options['outputFileName'];
//
//                     let fileContent = output[fileName];
//                     if (fileContent === undefined || fileContent === null) {
//                         fileContent = {};
//                     }
//                     retValidValue.values = configUtil.copyArrayOfObjects(resp[index].values)
//                     let validValues = makeChanges(retValidValue.changes, retValidValue.values, stateValues[state], rates[rate]);
//                     //sort by priority values
//                     validValues.sort(compare);
//                     fileContent[retValidValue.validValueKey] = validValues;
//                     output[fileName] = fileContent;
//                 }
//
//             }
//         }
//         addStaticValidValues(output);
//         for (let file in output) {
//             grunt.file.write(outputDir + file, JSON.stringify(output[file]));
//         }
//         done();
//     });
// }
//
// function sendData(method, params, validValueKey, states, rateLevel, changes) {
//     let requestPromise = Q.defer();
//     let headers = {
//         'Content-Type': 'application/json',
//         'usertoken': 'any',
//         'Authorization': options['edgeAuthorization']
//     };
//     let timeout = 90000;
//     let httpOptions = {
//         method: 'POST',
//         host: options['edgeHost'],
//         port: options['edgePort'],
//         path: options['edgeServicePath'],
//         headers: headers,
//         timeout: timeout
//     };
//     let req = http.request(httpOptions, function (res) {
//         let data = [];
//         res.on('data', function (chunk) {
//             data.push(chunk);
//         }).on('end', function () {
//             //console.log(JSON.parse(Buffer.concat(data)))
//             let output = {};
//             output.stateValues = states;
//             output.rateLevel = rateLevel;
//             output.changes = changes;
//             output.values = convertToFinalValidValueOutput(validValueKey, JSON.parse(Buffer.concat(data)).result.data);
//             output.validValueKey = validValueKey;
//             requestPromise.resolve(output);
//         });
//     });
//
//
//     let data = JSON.stringify({'id': 1 + '', 'method': method, 'params': params, 'jsonrpc': '2.0'});
//     req.write(data);
//     req.end();
//     return requestPromise.promise;
// }
//
// function readJSONFile(fileName) {
//     let obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
//     return obj;
// }
//
// function convertToFinalValidValueOutput(typeListName, value) {
//     let items = value;
//     let formattedItems = [];
//
//     for (let item in items) {
//         let val = {};
//         val.code = items[item].code;
//         val.displayName = items[item].displayName;
//         val.priority = item;
//         formattedItems.push(val);
//     }
//     return formattedItems;
// }
//
// function compare(a, b) {
//     let aValue = parseInt(a.priority);
//     let bValue = parseInt(b.priority);
//     if (aValue < bValue)
//         return -1;
//     if (aValue > bValue)
//         return 1;
//     return 0;
// }
//
// function makeChanges(changes, validValues, state, rateLevel) {
//     for (let index in changes) {
//         let change = changes[index];
//         if ((change.state.indexOf(state) > -1 || change.state[0] === 'ALL') && (change.rateLevel && (change.rateLevel == rateLevel || change.rateLevel == "ALL"))) {
//             let toAdd = [];
//             for (let i in validValues) {
//                 let validValue = validValues[i];
//                 if (validValue.code === change.code) {
//                     switch (change.action) {
//                         case ('C'): {
//                             let displayName = change.displayName;
//                             let priority = change.priority;
//                             if (displayName) {
//                                 validValue.displayName = displayName;
//                             }
//                             if (priority) {
//                                 validValue.priority = priority;
//                             }
//                             break;
//                         }
//                         case ('D'): {
//                             validValues.splice(i, 1);
//                             break;
//                         }
//                     }
//
//
//                 }
//             }
//             for (let d in toAdd) {
//                 let add = toAdd[d];
//                 validValues.push(add);
//             }
//         }
//     }
//     return validValues;
// }
//
// function addStaticValidValues(output) {
//     if (output) {
//         for (let index in staticValidValues) {
//             let staticValidValue = staticValidValues[index];
//             let validValueKey = index;
//             let states = staticValidValue.state;
//             let rateLevelPath;
//             let rates = [];
//             if (staticValidValue.rateLevel && staticValidValue.rateLevel != 'ALL') {
//                 rates.push(staticValidValue.rateLevel);
//             } else {
//                 rates = allRateLevels;
//             }
//             for (let rate in rates) {
//                 rateLevelPath = "/" + rates[rate] + "/";
//                 for (let state in states) {
//                     let fileName = states[state] + rateLevelPath + states[state] + options['outputFileName'];
//                     let validValues = output[fileName];
//                     validValues[index] = staticValidValue.values;
//                 }
//             }
//         }
//     }
//     return output;
// }
