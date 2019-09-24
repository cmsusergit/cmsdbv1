'use strict';
module.exports = function(Apiemployee) {

  Apiemployee.getTotalApprovedScore=function(empCode,cb){
    Apiemployee.find({
        where:{
          apiEmpCode:empCode,
          apiEmpApproved:1
        },
        include:{
          relation:"apiMeta",
          scope:{

            fields:['apiMetaPerpt','apiMetaSection']
          }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Apiemployee.remoteMethod('getTotalApprovedScore',{
        accepts:[{
          arg:'empCode',
          type:'string'
        },
      ],
        http:{
          path:'/getTotalApprovedScore/:empCode',
          verb:'get'
        },
        returns:{
         arg:'scoreList',
         type:'array'
       }
  });
};
