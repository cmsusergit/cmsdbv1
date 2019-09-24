'use strict';
module.exports = function(Apiobservationhod) {

  Apiobservationhod.getReportByHODForEmployee=function(ayId,empId,cb){
    Apiobservationhod.find({
        where:{
          fEmpId:empId,
          fAyId:ayId
        },
        include:{
          relation:"apiParamHod",
          scope:{

          }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Apiobservationhod.remoteMethod('getReportByHODForEmployee',{
        accepts:[{
          arg:'ayId',
          type:'number'
        },{
          arg:'empId',
          type:'number'
        }
      ],
        http:{
          path:'/getReportByHODForEmployee/:ayId/:empId',
          verb:'get'
        },
        returns:{
         arg:'observationList',
         type:'array'
       }
  });
};
