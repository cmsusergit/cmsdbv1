'use strict';

module.exports = function(Studentallocation) {

  Studentallocation.getAllocatedStudentList=function(ob,cb){
    console.log('----',JSON.stringify(ob));
    Studentallocation.find({
        where:ob,
        include:{
          relation:"studentInfo",
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
  Studentallocation.remoteMethod('getAllocatedStudentList',{
        accepts:[{
          arg:'allocationDetail',
          type:'Object'
        }
      ],
      http:{
          path:'/getAllocatedStudentList/',
          verb:'post'
        },
        returns:{
          arg:'studentList',
          type:'array'
       }
  });





  Studentallocation.deallocateStudent=function(list,cb){
    list.map(ob=>{
        Studentallocation.destroyAll(ob).then(rr=>{
          cb(null,rr)
        })
        .catch(error=>{
          cb(error,null)
        })
      })
  };
  Studentallocation.remoteMethod('deallocateStudent',{
        accepts:[{
          arg:'list',
          type:'array'
        }
      ],
      http:{
          path:'/deallocateStudent/',
          verb:'post'
        },
        returns:{
          arg:'dt',
          type:'Object'
       }
  });
};
