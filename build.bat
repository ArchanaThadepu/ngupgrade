rmdir /s /q build
call updateBowerDependencies.bat
cd ../../
set NODE_TLS_REJECT_UNAUTHORIZED=0
call grunt --stack --force default --environment=%1 --refEnvironment=%2
cp "./tmp/config/%1/ServiceEndPoint.json" "./app/js/src/mercury/config/ServiceEndPoint.json"
mkdir build\js
cd build\js
rmdir /s /q bower_components
mkdir bower_components
cd ../../
mkdir build\js\bower_components\angular
mkdir build\js\bower_components\angular-messages
mkdir build\js\bower_components\angular-ui-router\release
mkdir build\js\bower_components\requirejs
mkdir build\js\bower_components\angular-ui-mask\dist
cp ./app/js/bower_components/angular/angular.js ./build/js/bower_components/angular/angular.min.js
cp ./app/js/bower_components/angular-ui-mask/dist/mask.min.js ./build/js/bower_components/angular-ui-mask/dist/mask.min.js
cp ./app/js/bower_components/angular-messages/angular-messages.min.js ./build/js/bower_components/angular-messages/angular-messages.min.js
cp ./app/js/bower_components/angular-ui-router/release/angular-ui-router.min.js ./build/js/bower_components/angular-ui-router/release/angular-ui-router.min.js
cp ./app/js/bower_components/requirejs/require.js ./build/js/bower_components/requirejs/require.js
IF [%1] NEQ [prod] (
	cp ./app/html/index.html ./build/html/index.html
) 
