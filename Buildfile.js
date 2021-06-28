#!/usr/bin/env node

'use strict';

let createServiceEndPoints = require("./configuration/CreateServiceEndPoints");
let generateAppDynamics = require("./configuration/GenerateAppDynamics");
let generateConfig = require("./configuration/GenerateConfig");
let generateValidValues = require("./configuration/GenerateValidValues");
let generateLabels = require("./configuration/GenerateLabels");
let generateHelps = require("./configuration/GenerateHelps");
let generateCoverageDisplayType = require("./configuration/GenerateCoverageDisplayType");
let generateMessages = require("./configuration/GenerateMessages");
let generateConstraintValues = require("./configuration/GenerateConstraintValues");
let generateSubmissionDTO = require("./configuration/GenerateSubmissionDTO");
let generateHideShow = require("./configuration/GenerateHideShow");

const pcEnvs = {
    'local': {'edgeHost': 'brqalgwc130', 'edgePort': '10507'},
    'dev45': {'edgeHost': 'brdvlgwb010', 'edgePort': '10500'},
    'dev46': {'edgeHost': 'brdvlgwb011', 'edgePort': '10500'},
    'dev47': {'edgeHost': 'brdvlgwb012', 'edgePort': '10500'},
    'dev48': {'edgeHost': 'brdvlgwb013', 'edgePort': '10500'},
    'dev49': {'edgeHost': 'brdvlgwb014', 'edgePort': '10500'},
    'dev50': {'edgeHost': 'brqalgwb020', 'edgePort': '10500'},
    'qa45': {'edgeHost': 'brqalgwc130', 'edgePort': '10507'},
    'qa46': {'edgeHost': 'brqalgwc144', 'edgePort': '10507'},
    'qa47': {'edgeHost': 'brqalgwc149', 'edgePort': '10507'},
    'qa48': {'edgeHost': 'brqalgwc146', 'edgePort': '10507'},
    'qa49': {'edgeHost': 'brqalgwc143', 'edgePort': '10507'},
    'qa50': {'edgeHost': 'brqalgwc150', 'edgePort': '10507'},
    'stage': {'edgeHost': 'brstlgwb011', 'edgePort': '10500'},
    'prod': {'edgeHost': 'brqalgwb022', 'edgePort': '10500'}
};

let environment = process.argv[2];
let refEnvironment = process.argv[3]
console.log('environment: ' + environment);
console.log('refEnvironment: ' + refEnvironment);

if (refEnvironment) {
    environment = refEnvironment;
}

let edgeHost = pcEnvs[environment].edgeHost;
let edgePort = pcEnvs[environment].edgePort;
generateConfiguration(edgeHost, edgePort);

function generateConfiguration(edgeHost, edgePort) {
    console.log('edgeHost: ' + edgeHost);
    console.log('edgePort: ' + edgePort);
    //grunt.loadTasks('configuration'); //load tasks under configuration folder
    //grunt.loadNpmTasks('grunt-contrib-requirejs');

    let options = {
        endpointsFileLocation: './configuration/config/ServiceEndPoint.json',
        endpointsTempOutputFile: 'd://temp/config',
        endpointsOutputFile: './src/mercury/config',
        environmentConfigFile: './configuration/config/EnvironmentConfigValues.json',
        defaultEnvironment: 'qa45'
    };
    createServiceEndPoints(options);

    options =  {
        configOutputFile: 'src/app/',
        defaultEnvironment: 'qa45'
    }
    generateAppDynamics(options);

    options = {
        configLocation: 'configuration/config/GenerateConfig.json',
        configOutputFile: './src/mercury/config',
        defaultEnvironment: 'qa45'
    }
    generateConfig(options);

    options = {
        /* ... */
        allStateConfigFile: 'configuration/config/StateMeaning.json',
        allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
        configFile: 'configuration/config/GenerateValidValues.json',
        staticValidValuesFile: 'configuration/config/StaticValidValues.json',
        outputDir: './src/mercury/config',
        edgeHost: edgeHost,
        edgePort: edgePort,
        edgeServicePath: '/pc/service/edgev10/quote/typelistlookup',
        edgeAuthorization: 'Basic bWlnc3U6Z3c=',
        edgeMethodName: 'getFilteredTypeListByFilter',
        outputFileName: 'ValidValues.json'
    }
    generateValidValues(options);

    options = {
        /* ... */
        allStateConfigFile: 'configuration/config/StateMeaning.json',
        allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
        configFile: 'configuration/config/GenerateLabels.json',
        outputDir: './src/mercury/config/',
        outputFileName: 'Labels.json'
    }
    generateLabels(options);

    options = {
        /* ... */
        allStateConfigFile: 'configuration/config/StateMeaning.json',
        allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
        configFile: 'configuration/config/GenerateHelps.json',
        outputDir: './src/mercury/config/',
        outputFileName: 'Helps.json'
    }
    generateHelps(options);

    options= {
        /* ... */
        allStateConfigFile: 'configuration/config/StateMeaning.json',
        allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
        configFile: 'configuration/config/GenerateCoverageDisplayType.json',
        outputDir: './src/mercury/config',
        outputFileName: 'CoverageDisplayType.json'
    };
    generateCoverageDisplayType(options);

    options = {
        /* ... */
        allStateConfigFile: 'configuration/config/StateMeaning.json',
            allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
            configFile: 'configuration/config/GenerateMessages.json',
            outputDir: './src/mercury/config',
            outputFileName: 'Messages.json'
    }
    generateMessages(options);

    options = {
        allStateConfigFile: 'configuration/config/StateMeaning.json',
        allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
        configFile: 'configuration/config/GenerateConstraintValues.json',
        outputDir: './src/mercury/config',
        outputFileName: 'ConstraintValues.json'
    };
    generateConstraintValues(options);

    // options = {
    //     outputDir: '',
    //     edgeHost: 'brqalgwc130',
    //     edgePort: '10507',
    //     edgeServicePath: '/pc/service/edgev10/quote/quote',
    //     edgeAuthorization: 'Basic bWlnc3U6Z3c=',
    //     edgeMethodName: 'retrieve',
    //     outputFileName: 'app/html/submissionDTO.json'
    // };
    // generateSubmissionDTO(options);

    options = {
        allStateConfigFile: 'configuration/config/StateMeaning.json',
            allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
            configFile: 'configuration/config/GenerateHideShow.json',
            outputDir: './src/mercury/config',
            outputFileName: 'HideShowRules.json'
    };
    generateHideShow(options);

    // grunt.initConfig({
    //     requirejs: {
    //         compile: {
    //             options: {
    //                 appDir: "app",
    //                 baseUrl: "js",
    //                 dir: "./build",
    //                 fileExclusionRegExp: /^index.html$/,
    //                 mainConfigFile: 'app/js/main.js',
    //                 modules: [
    //                     {
    //                         name: "main",
    //                     }
    //                 ],
    //                 uglify2: {
    //
    //                     //Custom value supported by r.js but done differently
    //                     //in uglifyjs directly:
    //                     //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
    //                     mangle: true
    //                 },
    //                 //removed combined file from build directories
    //                 removeCombined: true,
    //                 optimize: 'uglify2'
    //             }
    //         }
    //     }
    // });
    // grunt.registerTask('generateConfiguration',
    //     ['generateValidValues', 'generateLabels', 'generateCoverageDisplayType', 'generateMessages', 'generateHideShow', 'generateConstraintValues', 'generateHelps', 'generateSubmissionDTO', 'generateConfig', 'generateAppDynamics']);
    // grunt.registerTask('default',
    //     ['generateConfiguration', 'createServiceEndPoints', 'requirejs']);
}
