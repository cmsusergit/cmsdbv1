'use strict';
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

// Studentinfo.addStudent=function(studentInfo,cb){
// }
//
// Studentinfo.remoteMethod('addStudent',{
//     accepts:[{arg:'enrollment',type:'array'}],
//     http:{path:'/getNameByEnrollment',verb:'post'},
//     returns:{arg:'studentNameList',type:'array'}
//   })
};
