module.exports = function(grunt) {
	
	var environment = grunt.option('environment');
	var refEnvironment = grunt.option('refEnvironment');

	if(refEnvironment){
		environment = refEnvironment;
	}
	var pcEnvs = {

		'local': {'edgeHost': 'brqalgwc130', 'edgePort': '10507'},
        'dev45': {'edgeHost': 'brdvlgwb010', 'edgePort': '10500'},
        'dev46': {'edgeHost': 'brdvlgwb011', 'edgePort': '10500'},
        'dev47': {'edgeHost': 'brdvlgwb012', 'edgePort': '10500'},
        'dev48': {'edgeHost': 'brdvlgwb013', 'edgePort': '10500'},
        'dev49': {'edgeHost': 'brdvlgwb014', 'edgePort': '10500'},
        'dev50': {'edgeHost': 'brqalgwb020', 'edgePort': '10500'},
        'qa45' : {'edgeHost': 'brqalgwc130', 'edgePort': '10507'},
        'qa46' : {'edgeHost': 'brqalgwc144', 'edgePort': '10507'},
        'qa47' : {'edgeHost': 'brqalgwc149', 'edgePort': '10507'},
        'qa48' : {'edgeHost': 'brqalgwc146', 'edgePort': '10507'},
        'qa49' : {'edgeHost': 'brqalgwc143', 'edgePort': '10507'},
        'qa50' : {'edgeHost': 'brqalgwc150', 'edgePort': '10507'},
        'stage': {'edgeHost': 'brstlgwb011', 'edgePort': '10500'},
        'prod' : {'edgeHost': 'brqalgwb022', 'edgePort': '10500'}
    };
	
	var edgeHost = pcEnvs[environment].edgeHost;
	var edgePort = pcEnvs[environment].edgePort;
	
	console.log('edgeHost: ' + edgeHost);
	console.log('edgePort: ' + edgePort);
	grunt.loadTasks('configuration'); //load tasks under configuration folder
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.initConfig({
		createServiceEndPoints:{
			options: {
				endpointsFileLocation: 'configuration/config/ServiceEndPoint.json',
				endpointsTempOutputFile: 'tmp/config/',
				endpointsOutputFile: 'app/js/src/mercury/config/',
				environmentConfigFile: 'configuration/config/EnvironmentConfigValues.json',
				defaultEnvironment: 'qa45'
			}
		},
		generateAppDynamics:{
			options: {				
				configOutputFile: 'app/js/',
				defaultEnvironment: 'qa45'
			}
		},
		generateConfig:{
			options: {
				configLocation: 'configuration/config/GenerateConfig.json',
				configOutputFile: 'app/js/src/mercury/config/',
				defaultEnvironment: 'qa45'
			}
		},		
		generateValidValues:{
	      options: {
	        /* ... */
	    	allStateConfigFile: 'configuration/config/StateMeaning.json',
	    	allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
	        configFile: 'configuration/config/GenerateValidValues.json',
	        staticValidValuesFile: 'configuration/config/StaticValidValues.json',
	        outputDir: 'app/js/src/mercury/config/',
    		edgeHost: edgeHost,
    		edgePort: edgePort,
    		edgeServicePath: '/pc/service/edgev10/quote/typelistlookup',
    		edgeAuthorization: 'Basic bWlnc3U6Z3c=',
    		edgeMethodName: 'getFilteredTypeListByFilter',
    		outputFileName: 'ValidValues.json'
	      }
		},
		generateLabels:{
	      options: {
	        /* ... */
	    	allStateConfigFile: 'configuration/config/StateMeaning.json',
	    	allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
	    	configFile: 'configuration/config/GenerateLabels.json',
	        outputDir: 'app/js/src/mercury/config/',
    		outputFileName: 'Labels.json'
	      }
		},
		generateHelps:{
	      options: {
	        /* ... */
	    	allStateConfigFile: 'configuration/config/StateMeaning.json',
	    	allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
	    	configFile: 'configuration/config/GenerateHelps.json',
	        outputDir: 'app/js/src/mercury/config/',
    		outputFileName: 'Helps.json'
	      }
		},		
		generateCoverageDisplayType:{
          options: {
            /* ... */
            allStateConfigFile: 'configuration/config/StateMeaning.json',
            allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
            configFile: 'configuration/config/GenerateCoverageDisplayType.json',
            outputDir: 'app/js/src/mercury/config/',
            outputFileName: 'CoverageDisplayType.json'
          }
        },
		generateMessages:{
	      options: {
	        /* ... */
	    	allStateConfigFile: 'configuration/config/StateMeaning.json',
	    	allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
	    	configFile: 'configuration/config/GenerateMessages.json',
	        outputDir: 'app/js/src/mercury/config/',
    		outputFileName: 'Messages.json'
	      }
		},
		generateConstraintValues:{
	      options: {
	    	allStateConfigFile: 'configuration/config/StateMeaning.json',
	    	allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
	    	configFile: 'configuration/config/GenerateConstraintValues.json',
	        outputDir: 'app/js/src/mercury/config/',
    		outputFileName: 'ConstraintValues.json'
	      }
		},
		generateSubmissionDTO:{
	      options: {
	        outputDir: '',
    		edgeHost: 'brqalgwc130',
    		edgePort: '10507',
    		edgeServicePath: '/pc/service/edgev10/quote/quote',
    		edgeAuthorization: 'Basic bWlnc3U6Z3c=',
    		edgeMethodName: 'retrieve',
    		outputFileName: 'app/html/submissionDTO.json'
	      }
		},
		generateHideShow:{
	      options: {
	    	allStateConfigFile: 'configuration/config/StateMeaning.json',
	    	allRateLevelConfigFile: 'configuration/config/RateLevelMeaning.json',
	    	configFile: 'configuration/config/GenerateHideShow.json',
	        outputDir: 'app/js/src/mercury/config/',
    		outputFileName: 'HideShowRules.json'
	      }
		},
		requirejs: {
		  compile: {
		    options: {
		    	appDir: "app",
		        baseUrl: "js",
		        dir: "./build",
		        fileExclusionRegExp: /^index.html$/,
		        mainConfigFile: 'app/js/main.js',
		        modules: [
		            {
		                name: "main",
		            } 
		        ],		       
		        uglify2: {

		    	    //Custom value supported by r.js but done differently
		    	    //in uglifyjs directly:
		    	    //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
		    	    mangle: true
		        },
		      //removed combined file from build directories
		        removeCombined: true,
		        optimize: 'uglify2'	        		        		        		        
		    }
		  }
		}		
	});
	grunt.registerTask('generateConfiguration',
			['generateValidValues', 'generateLabels', 'generateCoverageDisplayType', 'generateMessages', 'generateHideShow', 'generateConstraintValues', 'generateHelps', 'generateSubmissionDTO', 'generateConfig', 'generateAppDynamics']);
	grunt.registerTask('default',
			['generateConfiguration', 'createServiceEndPoints', 'requirejs']);
	
};
