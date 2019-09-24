const appl = require('../server')
module.exports = function enableAuthentication(appl) {
  appl.dataSources.apiproofstorage.connector.getFilename=function(file,request,response){
    const filename=request.query.filename || file.name
    return filename
  }
};
