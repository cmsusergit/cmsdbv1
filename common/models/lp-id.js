'use strict';

module.exports = function(Lpid) {
  Lpid.getAttendanceList=function(id,cb){
    Lpid.findOne({
        where:{
          lpId:id
        },
        include:{
          relation:"lpUnits",
          scope:{
              include:["lpTopics"]
            }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  }
  Lpid.remoteMethod('getTopicList',{
        accepts:[{
          arg:'id',
          type:'number'
        }],
        http:{
          path:'/getTopicList/:id',
          verb:'get'
        },
        returns:{
         arg:'topicList',
         type:'Object'
       }
  });
};
