var server = require('./server');
var ds = server.dataSources.cmsdbdtsource;


var lbTables = [ 'AccessToken', 'ACL', 'RoleMapping', 'Role','UserAccount'];
//
// var lbTables=['Taxchallan','Taxcollection']
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
