'use strict';
module.exports = {
    reporter: function (res) {
        var len = res.length;
        var str = "";
        console.log(111111111111111111111111111111111)
        if(len){
          str += `<?xml version="1.0" encoding="utf-8" ?><jshint>`
        }
        res.forEach(function (r) {
          var file = r.file;
          var err = r.error;

          str += `<file name="${file}">
                    <issue line="${err.line}" severity="${err.id}" char="${err.character}" reason="${(""+err.reason).replace(/"/g,"\'")}" evidence="@charset 'UTF-8';"/>
                  </file>`;
        });
        if (str) {
          process.stdout.write(str + "</jshint>");
        }
      }
}