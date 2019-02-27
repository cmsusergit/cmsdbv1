'use strict';
const _=require('lodash')

module.exports = function(Attndanceinfo) {
Attndanceinfo.getAttendanceReport=function(input,cb){
   let prList1=[]
    Attndanceinfo.find({
      where:{fstudenrollId:input.enroll}
    }).then(temp=>{
      temp.map(ob=>{
          const pr=new Promise(function(resolve, reject) {
            Attndanceinfo.app.models.DdClassSchedule.findOne(
            {
              where:{csId:ob.fclassscheduleid,ftimetableid:input.ttId}
            }).then(r1=>{
                if(r1)
                  resolve({present:ob.attPresent,cshedule:r1.csDateConducted})
                else {
                  resolve(null)
                }
            })
            .catch(e1=>{
              console.log('****',e1);
            })
          });
          prList1.push(pr)
      });
      Promise.all(prList1).then(rr=>{
        _.remove(rr,ob=>{
          return !ob;
        })
        cb(null,rr);
      })
    })
    .catch(error=>{
      console.log('****',error);
      cb(error,null)
    })
  }
  Attndanceinfo.remoteMethod('getAttendanceReport',{
    accepts:[{
      arg:'dt',
      type:'Object'
    }],
    http:{
      path:'/getAttendanceList',
      verb:'post'
    },
    returns:{
      arg:'attndList',
      type:'array'
    }
    })
};
