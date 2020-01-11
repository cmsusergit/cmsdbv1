'use strict';
const app = require('./server')

const empProfile=app.models.EmpProfile


empProfile.find({
  where:{deptId:1},
  include:{
    relation:'lpIds'
  }},


(error,rr)=>{
  const tt=JSON.parse(JSON.stringify(rr))
    tt.map(ob=>{
      if(ob.lpIds&&ob.lpIds.length>0)
      console.log(ob.title+ob.firstName+" "+ob.middleName+" "+ob.lastName);
    })
})

// const lplan=app.models.LpId;
// lplan.find(
//     {
//       include:{
//         relation:'empProfile',
//         scope:{
//           where:{deptId:2},
//           fields:['firstName','middleName','lastName','title']
//         }
//
//       }
//     },
//
//     function(error,rr){
//           rr.map(temp=>{
//
//               const record=JSON.parse(JSON.stringify(temp))
//               if(record.empProfile)
//                 console.log(record.empProfile.title+record.empProfile.firstName+" "+record.empProfile.middleName+" "+record.empProfile.lastName)
//           })
//
//     })
