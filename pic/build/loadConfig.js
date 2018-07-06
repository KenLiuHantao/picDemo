/**
 * Created by liuhantao on 2018/7/6.
 */
var fs = require('fs');
var path = require('path');
fs.readFile('./src/images/config.js', 'utf8', function(err, data){
  console.log(data,err);
});
