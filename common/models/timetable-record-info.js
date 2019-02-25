'use strict';
module.exports = function(Timetablerecordinfo) {

  Timetablerecordinfo.getschedulelist=function(id,cb){
      let prList1=[]
       Timetablerecordinfo.findOne(
       {
         where:{ttId:id},
         include:['ddClassSchedules']
      })
      .then(temp=>{


        temp.ddClassSchedules().map(ob=>{
          let tt=Timetablerecordinfo.app.models.DdClassSchedule.getAttendanceList(ob);
          prList1.push(tt);
        });
        Promise.all(prList1).then(rr=>{
          console.log('----',rr);
          cb(null,rr);
        })
      })
      .catch(error=>{
        console.log('****',error);
        cb(error,null);
      });
    }
Timetablerecordinfo.remoteMethod('getschedulelist',{
      accepts:[{
        arg:'id',
        type:'number'
      }],
      http:{
        path:'/getschedulelist/:id',
        verb:'get'
      },

      returns:{
        arg:'attndList',
        type:'Object'
      }

  })
};
