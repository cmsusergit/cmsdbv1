'use strict';
module.exports = function(Timetablerecordinfo) {

  Timetablerecordinfo.getAttendanceList=function(id,cb){
    Timetablerecordinfo.findOne({
        where:{
          ttId:id
        },
        fields:{
          ttId:1
        },
        include:{
          relation:"ddClassSchedules",
          scope:{

              include:["attndanceInfos"]
            }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  }
  Timetablerecordinfo.remoteMethod('getAttendanceList',{
        accepts:[{
          arg:'id',
          type:'number'
        }],
        http:{
          path:'/getAttendanceList/:id',
          verb:'get'
        },
        returns:{
         arg:'attndList',
         type:'Object'
       }
  });
//   Timetablerecordinfo.getschedulelist=function(id,cb){
//       let prList1=[]
//
//        Timetablerecordinfo.findOne(
//        {
//          where:{ttId:id},
//          include:['ddClassSchedules']
//       })
//       .then(temp=>{
//
//
//         temp.ddClassSchedules().map(ob=>{
//           let tt=Timetablerecordinfo.app.models.DdClassSchedule.getAttendanceList(ob);
//           prList1.push(tt);
//         });
//         Promise.all(prList1).then(rr=>{
//           cb(null,rr);
//         })
//       })
//       .catch(error=>{
//         console.log('****',error);
//         cb(error,null);
//       });
//     }
// Timetablerecordinfo.remoteMethod('getschedulelist',{
//       accepts:[{
//         arg:'id',
//         type:'number'
//       }],
//       http:{
//         path:'/getschedulelist/:id',
//         verb:'get'
//       },
//
//       returns:{
//         arg:'attndList',
//         type:'Object'
//       }
//
//   })
};
