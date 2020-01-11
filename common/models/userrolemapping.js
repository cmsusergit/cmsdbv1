'use strict';

module.exports = function(Userrolemapping) {
  Userrolemapping.deleteRoleMapping=function(ob,cb){
    Userrolemapping.destroyAll(ob)
    .then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  }

  Userrolemapping.remoteMethod('deleteRoleMapping',{
        accepts:[{
          arg:'ob',
          type:'Object'
        }],
        http:{
          path:'/deleteRoleMapping/',
          verb:'post'
        },
        returns:{
         arg:'result',
         type:'Object'
       }
  });
};
