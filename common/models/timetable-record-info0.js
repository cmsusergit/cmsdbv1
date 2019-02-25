'use strict';
module.exports = function(Timetablerecordinfo) {

  Timetablerecordinfo.getschedulelist=function(id){
      Timetablerecordinfo.findOne(
       {
         where:{ttId:id},
         include:['ddClassSchedules']
      })
      .then(temp=>{
        temp.ddClassSchedules().map(ob=>{
          let tt=Timetablerecordinfo.app.models.DdClassSchedule.test(ob)
            .then(rr=>{
             console.log('****',rr);
              return rr;
            })
            .catch(error=>{

              console.log('****',error);
            });
            // ob.find()
            // .then(rr=>{
            //   return rr;
            // })
            // .catch(error=>{
            //   console.log('****',error);
            //   return error;
            // });
        });
      })
      .catch(error=>{
        console.log('****',error);
        return error;
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
        arg:'testdt',
        type:'array'
      }
  })
};
