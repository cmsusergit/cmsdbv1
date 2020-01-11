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

  Timetableinfo.getSubjectListByClassId=function(id,ayid,cb){
    Timetableinfo.find({
        where:{
             fAyearInfoId:ayid
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
            where:{
              fClassId:id,
              ttLoadType:"Theory"
            },
            include:{
              relation:"subjectInfos"
            }
        }
        }
    }).then(rr=>{
        let list=JSON.parse(JSON.stringify(rr))
        list=_.filter(list,ob=>{
          if(ob.timetableRecordInfos.length>0){
            ob.timetableRecordInfos=_.uniqBy(ob.timetableRecordInfos,'fSubjectId')
            return true
          }
          else {
            return false
          }
        })
        let result=[]
        list.map(record=>{
          record.timetableRecordInfos.map(rr=>{
              result.push(rr.subjectInfos)
          })
        })
      cb(null,result)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetableinfo.remoteMethod('getSubjectListByClassId',{
        accepts:[{
          arg:'id',
          type:'number'
        },
        {
          arg:'ayid',
          type:'number'
        }],
        http:{
          path:'/getSubjectListByClassId/:ayid/:id',
          verb:'get'
        },
        returns:{
         arg:'subjectList',
         type:'array'
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







  Timetableinfo.getStudentAttdByFaculty=function(inputOb,cb){
    // if(inputOb.fBatchId==-1)
    //   inputOb.loadDetail=_.pick(inputOb.loadDetail,['ayId','fFacultyId','fClassId','fSubjectId','ttLoadType'])
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
                      relation:"attndanceInfos"
                    }
                  }
              }
            }
        }
    }).then(rr=>{
      // let temp=[]
      // rr.map(ob=>{
      //     const tt=JSON.parse(JSON.stringify(ob)).timetableRecordInfos;
      //     temp=_.union(temp,tt)
      // })
      // let temp1=[]
      // temp.map(ob=>{
      //     const tt=JSON.parse(JSON.stringify(ob)).ddClassSchedules;
      //     temp1=_.union(temp1,tt)
      // })
      // cb(null,{ddClassSchedules:temp1})







      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Timetableinfo.remoteMethod('getStudentAttdByFaculty',{
        accepts:[{
          arg:'inputOb',
          type:'Object'
        }],
        http:{
          path:'/getStudentAttdByFaculty',
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
  Timetableinfo.getSubjectListForFaculty=function(detail,cb){
    Timetableinfo.find({
        where:{
          fAyearInfoId:detail.ayId,
        },
        fields:{timetableId:1},
        include:{
          relation:"timetableRecordInfos",
          scope:{
                where:{
                    fFacultyId:detail.facultyId
                },
                fields:["fFacultyId","fDeptId","ttSem","fSubjectId","fClassId","ttLoadType","fBatchId"]
          }
        }
    }).then(rr=>{
      let ttRecordList=JSON.parse(JSON.stringify(rr))
      _.remove(ttRecordList,temp=>{
          return !(temp.timetableRecordInfos && temp.timetableRecordInfos.length>0)
      })
      cb(null,ttRecordList)
    })
    .catch(error=>{
      cb(error,null)
    })
  }
  Timetableinfo.remoteMethod('getSubjectListForFaculty',{
        accepts:[{
          arg:'detail',

          type:'Object'
        }],
        http:{
          path:'/getSubjectListForFaculty/',
          verb:'post'
        },
        returns:{
         arg:'subjectList',
         type:'array'
       }
  });

  Timetableinfo.getSummaryStudentAttendance=function(detail,cb){
    Timetableinfo.find({
        where:{
             fAyearInfoId:detail.ayId
        },
        include:{
          relation:"timetableRecordInfos",
          scope:{
            where:{
              fClassId:detail.classId,
              ttLoadType:detail.loadType,

//              fSubjectId:detail.subjectId
            },
            fields:["fSubjectId","ttId"],
            include:[{
                relation:"ddClassSchedules",
                scope:{
                  include:{
                    relation:"attndanceInfos"
                  }
                }
            },
            {
              relation:"subjectInfos"
            }]
          }
          }
      }).then(rr=>{

        let summaryList=JSON.parse(JSON.stringify(rr))
        summaryList=_.filter(summaryList,ob=>{
          if(ob.timetableRecordInfos.length>0){
              ob.timetableRecordInfos=_.filter(ob.timetableRecordInfos,temp=>{
                return temp.ddClassSchedules.length>0
              })
              return true
          }
          else
            return false
        })
          let result=[]
        summaryList.map(tt=>{
            tt.timetableRecordInfos.map((record,indx)=>{
              record.ddClassSchedules.map(temp=>{
                  //temp.attndanceInfos=_.countBy(temp.attndanceInfos,'attPresent')
                  // temp.subjectId=record.fSubjectId
                  temp.subjectId=record.subjectInfos.subAlias
                })
              result=_.unionWith(result,record.ddClassSchedules,ob=>{return ob.fSubjectId})
            })
        })
        result=_.groupBy(result,"subjectId")
        let output=[]
        for(let record in result) {
            let mergedList=[]
            result[record].map(dd=>{
              mergedList.push(dd.attndanceInfos)
            })
            output.push({subjectId:record,list:mergedList})
          }
        output.map(oo=>{
          oo.list=_.groupBy(_.concat(...oo.list),"fstudenrollId");
          for (let studentEnroll in oo.list) {
            let count=_.countBy(oo.list[studentEnroll],'attPresent')
            let presentCount=count["1"]?count["1"]:0
            let absentCount=count["0"]?count["0"]:0
            oo.list[studentEnroll]={presentCount:presentCount,absentCount:absentCount}
          }
        })
          output.map(tt=>{
            let tempList={}
            Object.keys(tt.list).sort().forEach(rr=>{
              tempList[rr]=tt.list[rr]
            })
            tt.list=tempList
          })
        cb(null,output)
      })
      .catch(error=>{
        cb(error,null)
      })
    };
    Timetableinfo.remoteMethod('getSummaryStudentAttendance',{
          accepts:[{
            arg:'detail',
            type:'Object'
          }],
          http:{
            path:'/getSummaryStudentAttendance',
            verb:'post'
          },
          returns:{
           arg:'summaryList',
           type:'array'
         }
    });
};
