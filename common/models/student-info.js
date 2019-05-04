'use strict';
const app1 = require('../../server/server')

module.exports = function(Studentinfo) {
Studentinfo.getNameByEnrollment=function(enrollmentList,cb){
    let prList1=[]
    enrollmentList.map(enrollment=>{
      console.log('----',enrollment.stuEnroll);
      const pr=new Promise((resolve,reject)=>{
        Studentinfo.findOne({
              where:{
                stuEnroll:enrollment.stuEnroll
              },
              fields:{
                stuTitle:1,stuFirstname:1,stuMiddlename:1,stuLastname:1
              }
            }).then(rr=>{
              const result=rr.stuTitle+rr.stuFirstname+" "+rr.stuMiddlename+" "+rr.stuLastname;
              resolve(result)
            }).catch(error=>{
              console.log('****',error);
              reject(error)
        })
      });
      prList1.push(pr)
    });
    Promise.all(prList1).then(rr=>{cb(null,rr)}).catch(error=>{cb(error,null)});
  }
Studentinfo.remoteMethod('getNameByEnrollment',{
    accepts:[{arg:'enrollment',type:'array'}],
    http:{path:'/getNameByEnrollment',verb:'post'},
    returns:{arg:'studentNameList',type:'array'}
  })
Studentinfo.validatesUniquenessOf('stuEnroll', {message: 'Student enrollment required unique'})
Studentinfo.validatesUniquenessOf('stuEmail', {message: 'Student Email required unique'})
Studentinfo.validatesUniquenessOf('stuCollegeId', {message: 'Student CollegeId required unique'})
Studentinfo.observe('after save',(context,next)=>{
  if(context.isNewInstance){
    const user_model=app1.models.UserAccount;
    const user1={
      username:context.instance.stuEnroll,
      password:context.instance.stuEnroll,
      roleList:'STUDENT',
      email:context.instance.stuEmail
    };
    user_model.create(user1,next)
  }
})

Studentinfo.observe('before delete',(context,next)=>{
    const user_model=app1.models.UserAccount;
    Studentinfo.findOne({where:context.where,fields:{stuEnroll:1}},(error,dt)=>{
      if(!error){
        console.log(JSON.stringify(dt));
        const ob={where:{username:dt.stuEnroll}};
        user_model.findOne({where:{username:dt.stuEnroll}},(error,tt)=>{
          if(!error){
            user_model.destroyById(tt.id,next)
          }
          else {
            console.log('****',error);
          }
        })
      }
    })
})

// Studentinfo.addStudent=function(studentInfo,cb){
// }
//
// Studentinfo.remoteMethod('addStudent',{
//     accepts:[{arg:'enrollment',type:'array'}],
//     http:{path:'/getNameByEnrollment',verb:'post'},
//     returns:{arg:'studentNameList',type:'array'}
//   })
};
