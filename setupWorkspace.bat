call npm install
call updateBowerDependencies.bat
REM cd ../..
call generateConfig.bat local local
call createServiceEndPoints.bat local
