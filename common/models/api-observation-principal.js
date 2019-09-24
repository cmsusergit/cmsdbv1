'use strict';


module.exports = function(Apiobservationprincipal) {
  Apiobservationprincipal.getReportByPrincipalForEmployee=function(ayId,empId,cb){
    Apiobservationprincipal.find({
        where:{
          fEmpId:empId,
          fAyId:ayId
        },
        include:{
          relation:"apiParamPrincipal",

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
  Apiobservationprincipal.remoteMethod('getReportByPrincipalForEmployee',{
        accepts:[{
          arg:'ayId',
          type:'number'
        },{
          arg:'empId',
          type:'number'
        }
      ],
        http:{
          path:'/getReportByPrincipalForEmployee/:ayId/:empId',
          verb:'get'
        },
        returns:{
         arg:'observationList',
         type:'array'
       }
  });
};
