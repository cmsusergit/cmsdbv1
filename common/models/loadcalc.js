'use strict';
const _ =require('lodash')

module.exports = function(Loadcalc) {
  Loadcalc.getCalculation=function(ob,cb){

    Loadcalc.find({
        where:{
          ayId:ob.ayId,
          deptId:ob.deptId
        },
        include:{

          relation:"loadcalcDepts",
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
  Loadcalc.remoteMethod('getCalculation',{
        accepts:[
          {arg:'ob',type:'Object'}
      ],










        http:{
          path:'/getCalculation',
          verb:'post'
        },
        returns:{
         arg:'loadCalculation',
         type:'array'
       }
  });
}
