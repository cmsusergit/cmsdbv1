'use strict'
const _ =require('lodash')

module.exports = function(Timetableinfo) {
  Timetableinfo.getTTRecordListByLocation=function(id,ayid,cb){
    Timetableinfo.find({
        where:{
             fAyearInfoId:ayid
        },
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
        },
        {
          arg:'ayid',
          type:'number'
        }],
        http:{
          path:'/getTTRecordListByLocation/:id/:ayid',
          verb:'get'
        },
        returns:{
         arg:'ttRecordList',
         type:'Object'
       }
  });


Timetableinfo.getTTRecordListByClassID=function(id,ayid,batchid,cb){
     const ob =  {
          and:[
            {fClassId: id}
        ]
      }
      if(batchid!=-1){
        ob.and.push({or:[{fBatchId:batchid},{fBatchId:'-'}]})
      }
    Timetableinfo.find({
        where:{
             fAyearInfoId:ayid
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
            where:ob
          }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetableinfo.remoteMethod('getTTRecordListByClassID',{
        accepts:[{
          arg:'id',
          type:'number'
        },

        {
          arg:'ayid',
          type:'number'
        },{
          arg:'batchid',
          type:'number'
        }],
        http:{
          path:'/getTTRecordListByClassID/:id/:ayid/:batchid',
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



  Timetableinfo.getStudentAttdBySubjectId=function(inputOb,cb){
    Timetableinfo.find({
        where:{
          fAyearInfoId:inputOb.ayId
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
              where:inputOb.loadDetail,
              include:{
                relation:"ddClassSchedules",
                scope:{
                    include:{
                      relation:"attndanceInfos",
                      scope:{
                        where:{"fstudenrollId":inputOb.stuEnroll}
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
          arg:'inputOb',
          type:'Object'
        }],
        http:{
          path:'/getStudentAttdBySubjectId',
          verb:'post'
        },
        returns:{
         arg:'attndList',
         type:'Object'
       }
  });
  // Timetableinfo.getStudentAttdBySubjectId=function(ayId,stuEnroll,subjectId,cb){
  //   Timetableinfo.find({
  //       where:{
  //         fAyearInfoId:ayId
  //       },
  //       include:{
  //         relation:"timetableRecordInfos",
  //         scope:{
  //             where:{
  //
  //               fSubjectId:subjectId,
  //             },
  //             include:{
  //               relation:"ddClassSchedules",
  //               scope:{
  //                   include:{
  //                     relation:"attndanceInfos",
  //                     scope:{
  //                       where:{"fstudenrollId":stuEnroll}
  //                     }
  //                   }
  //                 }
  //             }
  //           }
  //       }
  //   }).then(rr=>{
  //     let temp=[]
  //     rr.map(ob=>{
  //         const tt=JSON.parse(JSON.stringify(ob)).timetableRecordInfos;
  //         temp=_.union(temp,tt)
  //     })
  //
  //     let temp1=[]
  //     temp.map(ob=>{
  //         const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
  //         temp1=_.union(temp1,tt)
  //     })
  //     cb(null,{ddClassSchedules:temp1})
  //   })
  //   .catch(error=>{
  //     cb(error,null)
  //   })
  // };
  // Timetableinfo.remoteMethod('getStudentAttdBySubjectId',{
  //       accepts:[{
  //         arg:'ayId',
  //         type:'number'
  //       },
  //       {
  //         arg:'stuEnroll',
  //         type:'string'
  //       },
  //       {
  //         arg:'subjectId',
  //         type:'number'
  //       }
  //     ],
  //       http:{
  //         path:'/getStudentAttdBySubjectId',
  //         verb:'get'
  //       },
  //
  //       returns:{
  //        arg:'attndList',
  //        type:'Object'
  //      }
  // });
  Timetableinfo.getAttdByForClasswiseReport=function(inputOb,cb){
    if(inputOb.fBatchId==-1)
      inputOb=_.pick(inputOb,['ayId','fClassId','fSubjectId','ttLoadType'])
    console.log('++++',inputOb)
    Timetableinfo.find({
        where:{
          fAyearInfoId:inputOb.ayId
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
              where:inputOb,
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


  Timetableinfo.remoteMethod('getAttdByForClasswiseReport',{
        accepts:[{
          arg:'loadDetail',
          type:'Object'
        }],
        http:{
          path:'/getAttdByForClasswiseReport/',
          verb:'post'
        },
        returns:{
         arg:'attndList',
         type:'array'
       }
  });
  // Timetableinfo.getAttdBySubjectId=function(ayId,classId,subjectId,cb){
  //   Timetableinfo.find({
  //       where:{
  //         fAyearInfoId:ayId
  //       },
  //       include:{
  //         relation:"timetableRecordInfos",
  //         scope:{
  //             where:{
  //               fClassId:classId,
  //               fSubjectId:subjectId,
  //               ttLoadType:"Theory"
  //             },
  //             include:{
  //               relation:"ddClassSchedules",
  //               scope:{
  //                   include:{
  //                     relation:"attndanceInfos",
  //                   }
  //                 }
  //             }
  //           }
  //       }
  //   }).then(rr=>{
  //     let temp=[]
  //     rr.map(ob=>{
  //         const tt=JSON.parse(JSON.stringify(ob)).timetableRecordInfos;
  //         temp=_.union(temp,tt)
  //     })
  //
  //     let temp1=[]
  //     temp.map(ob=>{
  //         const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
  //         temp1=_.union(temp1,tt)
  //     })
  //     cb(null,{ddClassSchedules:temp1})
  //   })
  //   .catch(error=>{
  //     cb(error,null)
  //   })
  // };
  // Timetableinfo.remoteMethod('getAttdBySubjectId',{
  //       accepts:[{
  //         arg:'ayId',
  //         type:'number'
  //       },
  //       {
  //         arg:'classId',
  //         type:'number'
  //       },
  //       {
  //         arg:'subjectId',
  //         type:'number'
  //       }
  //     ],
  //       http:{
  //         path:'/getAttdBySubjectId',
  //         verb:'get'
  //       },
  //       returns:{
  //        arg:'attndList',
  //        type:'Object'
  //      }
  // });
};
