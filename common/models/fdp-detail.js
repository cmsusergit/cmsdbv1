'use strict';
module.exports = function(Fdpdetail) {

  Fdpdetail.getFDPList=function(deptId,cb){
    Fdpdetail.find({
        include:{
          relation:"employeeProfile",
          scope:{
            where:{
              deptId:deptId
            }
          }

        }
    }).then(rr=>{
      const record=JSON.parse(JSON.stringify(rr))
      let fdpList=[]
      record.map(oo=>{
        if(oo.employeeProfile)
          fdpList.push(oo)
      })
      cb(null,fdpList)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Fdpdetail.remoteMethod('getFDPList',{
    accepts:[
      {arg:'deptId',type:'Number'}
    ],








      http:{
          path:'/getFDPList/:deptId',
          verb:'get'
        },
        returns:{
         arg:'fdpList',
         type:'array'
       }
  });
};
