'use strict'


const {writeFileSync} = require("fs");
const {readFileSync} = require("fs");
module.exports = CreateServiceEndPoints;

function readJSONFile(fileName) {
  return JSON.parse(readFileSync(fileName, 'utf8'));
}

function getValue(source, dest) {
  if (dest) {
    return dest;
  }
  return source;
}

function setEdgeValues(service, envValues, serviceName) {
  let serviceOverwrite = envValues[serviceName];
  if (serviceOverwrite) {
    for (let val in serviceOverwrite) {
      service[val] = serviceOverwrite[val];
    }
  } else {
    service.baseURL = getValue(service.baseURL, envValues.baseURL);
    service.serviceEndPoint = getValue(service.serviceEndPoint, envValues.serviceEndPoint);
    service.gatewayEnable = getValue(service.gatewayEnable, envValues.gatewayEnable);
    service.httpMethod = getValue(service.httpMethod, envValues.httpMethod);
  }
}

function setHeaderValues(service, envValues) {
  for (let val in envValues) {
    service[val] = envValues[val];
  }
  delete service.source;
}

function setGatewayValues(service, envValues) {
  for (let val in envValues) {
    service[val] = envValues[val];
  }
}

function setConfigValues(service, envValues) {
  for (let val in envValues) {
    service[val] = envValues[val];
  }
}

function CreateServiceEndPoints(options) {
  let endPointsFileLocation = options['endpointsFileLocation'] || '';
  let outputFileName = options['endpointsOutputFile'];
  let outputTempFileName = options['endpointsTempOutputFile'];
  let configFileLocation = options['environmentConfigFile'];
  let environment = process.env.environment || options['defaultEnvironment'];

  try {
    let endPoints = readJSONFile(endPointsFileLocation);
    let envConfigValues = readJSONFile(configFileLocation);

    if (endPoints && envConfigValues) {
      let envValues = envConfigValues[environment];
      for (let val in endPoints) {
        let service = endPoints[val];
        if (service && service.source) {
          let source = service.source;
          switch (source) {
            case('gatewayHeaders'): {
              setHeaderValues(service, envValues.gatewayHeaders);
              break;
            }
            case('edge'): {
              setEdgeValues(service, envValues.edge, val);
              break;
            }
            case('gateway'): {
              setGatewayValues(service, envValues.gateway);
              break;
            }
            case('config'): {
              setConfigValues(service, envValues.config);
              break;
            }
          }
        }
      }
      writeFileSync(outputTempFileName + "/" + environment + "/" + "ServiceEndPoint.json", JSON.stringify(endPoints));
      writeFileSync(outputFileName + "/" + "ServiceEndPoint.json", JSON.stringify(endPoints))
    }
  } catch (e) {
    console.log('in error');
    console.log(e);
  }
}
