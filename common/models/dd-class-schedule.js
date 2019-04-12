'use strict';
module.exports = function(Ddclasschedule) {

  Ddclasschedule.getAttendanceList=function(ob){
    return new Promise((resolve,reject)=>{
      console.log('++++',ob.csId);
      Ddclasschedule.findOne({
         where:{csId:ob.csId},
         include:['attndanceInfos']
       }).then(rr=>{
         resolve(rr)
       })
       .catch(error=>{
         console.log('****',error);
         reject(error)
       })
    })
  }
};
