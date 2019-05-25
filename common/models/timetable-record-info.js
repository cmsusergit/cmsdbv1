'use strict'
const _ =require('lodash')

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
  Timetablerecordinfo.getStudentAttdBySubject=function(subjectId,stuEnroll,cb){
    Timetablerecordinfo.find({
        where:{
          fSubjectId:subjectId,
          ttLoadType:"Theory"
        },
        fields:{
          ttId:1
        },
        include:{
          relation:"ddClassSchedules",
          scope:{
              include:{
                relation:"attndanceInfos",
                scope:{
                  where:{"fstudenrollId":stuEnroll}
                }
              }
            }
        }
    }).then(rr=>{
      let temp=[]
      rr.map(ob=>{
          const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
          temp=_.union(temp,tt)
      })
      cb(null,{ddClassSchedules:temp})
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetablerecordinfo.remoteMethod('getStudentAttdBySubject',{
        accepts:[{
          arg:'subjectId',
          type:'string'
        },{arg:'stuEnroll',type:'string'}
      ],
        http:{
          path:'/getStudentAttdBySubject',
          verb:'get'
        },
        returns:{
         arg:'attndList',
         type:'Object'
       }
  });

  Timetablerecordinfo.getAttendanceListBySubject=function(id,cb){
    Timetablerecordinfo.find({
        where:{
          fSubjectId:id,
          ttLoadType:"Theory"
        },
        fields:{
          ttId:1
        },
        include:{
          relation:"ddClassSchedules",
          scope:{
              include:{
                relation:"attndanceInfos"
              }
            }
        }
    }).then(rr=>{
      let temp=[]
      rr.map(ob=>{
          const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
          temp=_.union(temp,tt)
      })
      cb(null,{ddClassSchedules:temp})
    })
    .catch(error=>{
      cb(error,null)
    })
  }
  Timetablerecordinfo.remoteMethod('getAttendanceListBySubject',{
        accepts:[{
          arg:'id',
          type:'number'
        }],
        http:{
          path:'/getAttendanceListBySubject/:id',
          verb:'get'
        },
        returns:{
         arg:'attndList',
         type:'Object'
       }









  });
}
