const { exec,spawn,fork } = require('child_process');
// print process.argv
 /* process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  }); */

let acceptable_back=["back_node","back_php"]

if(process.argv.length<3){
    console.log(`Please indicate which backend language you want to use in the followings:
    ${acceptable_back}
    `)
    process.exit()
}
if(process.argv.length>3){
    console.error("Error: invalid number of arguments")
    process.exit()
}

if(acceptable_back.indexOf(process.argv[2])==-1){
    console.error("Error: backend isn't valid");
    process.exit()
}


console.log(`Starting application with backend ${process.argv[2]}`)
switch(process.argv[2]){
    case "back_node":
        launchNodeServer()
        break;
}

function launchNodeServer() {
    exec(`npm --prefix .\\back_node\\ run test`);
}
function launchPHPServer(){
    exec("cd ./back_php")
    exec(`php -S localhost:5000 server.php`);
}
