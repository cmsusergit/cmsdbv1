'use strict'
const _ =require('lodash')

module.exports = function(Timetableinfo) {
  Timetableinfo.getTTRecordListByLocation=function(id,cb){
    Timetableinfo.find({
        include:{
          relation:"timetableRecordInfos",
          scope:{
          where:{
            fLocationId:id
          }}
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetableinfo.remoteMethod('getTTRecordListByLocation',{
        accepts:[{
          arg:'id',
          type:'number'
        }],
        http:{
          path:'/getTTRecordListByLocation/:id',
          verb:'get'
        },
        returns:{
         arg:'ttRecordList',
         type:'Object'
       }
  });





  Timetableinfo.getBusyFacultyList=function(loadDetail,cb){
    Timetableinfo.find({
        where:{
          fAyearInfoId:loadDetail.ayId,
        },
        fields:{timetableId:1},
        include:{
          relation:"timetableRecordInfos",
          scope:{
                where:{
                  and:[
                    {ttDay:loadDetail.ttDay},
                    {or:[{ttStartTime:loadDetail.ttStartTime},{ttEndTime:loadDetail.ttEndTime}]}
                  ]
                },
                fields:{
                  fFacultyId:1
                }
          }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  }

  Timetableinfo.remoteMethod('getBusyFacultyList',{
        accepts:[{
          arg:'loadDetail',
          type:'Object'
        }],
        http:{
          path:'/getBusyFacultyList/',
          verb:'post'
        },
        returns:{
         arg:'facultyList',
         type:'array'
       }
  });


  Timetableinfo.getStudentAttdBySubjectId=function(ayId,stuEnroll,subjectId,cb){
    Timetableinfo.find({
        where:{
          fAyearInfoId:ayId
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
              where:{

                fSubjectId:subjectId,
                ttLoadType:"Theory"
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
            }
        }
    }).then(rr=>{
      let temp=[]
      rr.map(ob=>{
          const tt=JSON.parse(JSON.stringify(ob)).timetableRecordInfos;
          temp=_.union(temp,tt)
      })

      let temp1=[]
      temp.map(ob=>{
          const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
          temp1=_.union(temp1,tt)
      })
      cb(null,{ddClassSchedules:temp1})
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetableinfo.remoteMethod('getStudentAttdBySubjectId',{
        accepts:[{
          arg:'ayId',
          type:'number'
        },
        {
          arg:'stuEnroll',
          type:'string'
        },
        {
          arg:'subjectId',
          type:'number'
        }
      ],
        http:{
          path:'/getStudentAttdBySubjectId',
          verb:'get'
        },

        returns:{
         arg:'attndList',
         type:'Object'
       }
  });

  Timetableinfo.getAttdBySubjectId=function(ayId,classId,subjectId,cb){
    Timetableinfo.find({
        where:{
          fAyearInfoId:ayId
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
              where:{
                fClassId:classId,
                fSubjectId:subjectId,
                ttLoadType:"Theory"
              },
              include:{
                relation:"ddClassSchedules",
                scope:{
                    include:{
                      relation:"attndanceInfos",
                    }
                  }
              }
            }
        }
    }).then(rr=>{
      let temp=[]
      rr.map(ob=>{
          const tt=JSON.parse(JSON.stringify(ob)).timetableRecordInfos;
          temp=_.union(temp,tt)
      })

      let temp1=[]
      temp.map(ob=>{
          const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
          temp1=_.union(temp1,tt)
      })
      cb(null,{ddClassSchedules:temp1})
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetableinfo.remoteMethod('getAttdBySubjectId',{
        accepts:[{
          arg:'ayId',
          type:'number'
        },
        {
          arg:'classId',
          type:'number'
        },
        {
          arg:'subjectId',
          type:'number'
        }
      ],
        http:{
          path:'/getAttdBySubjectId',
          verb:'get'
        },
        returns:{
         arg:'attndList',
         type:'Object'
       }
  });
};
