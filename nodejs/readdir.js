var testFolder = './data'; //data와 같음.
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist){
    console.log(filelist);
})