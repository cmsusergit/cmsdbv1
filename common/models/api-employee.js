'use strict';
const appl=require('../../server/server')

const _=require('lodash')
module.exports = function(Apiemployee) {

  Apiemployee.getTotalApprovedScore=function(empCode,cb){
    Apiemployee.find({
        where:{
          apiEmpCode:empCode,
          apiEmpApproved:1
        },



        include:{
          relation:"apiMeta",
          scope:{

            fields:['apiMetaPerpt','apiMetaSection']
          }
        }
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Apiemployee.remoteMethod('getTotalApprovedScore',{
        accepts:[{
          arg:'empCode',
          type:'string'
        },
      ],
        http:{
          path:'/getTotalApprovedScore/:empCode',
          verb:'get'
        },
        returns:{
         arg:'scoreList',
         type:'array'
       }
  });
Apiemployee.getDeptSummary=function(deptId,cb){
  const Employee=appl.models.EmpProfile

  Employee.find({
    where:{
      deptId:deptId
    },
  })
  .then(rr=>{
      let prList1=[]
      rr.map(ob=>{
        const pr=new Promise((resolve, reject)=>{
          Apiemployee.find({
            where:{
              apiEmpApproved:1,
              apiEmpCode:ob.empCode
            },
            include:{
              relation:"apiMeta",
              scope:{
                fields:['apiMetaPerpt','apiMetaSection']
              }
            }
          })
          .then(response=>{
            if(response && response.length>0)
              resolve(response)
            else
              resolve("")
          })
          .catch(error=>{
            reject(error)
          })
        })
        prList1.push(pr)
    });
    Promise.all(prList1)
      .then(result=>{
        const list=[]
        result.map(ob=>{
          if(ob && ob.length>0)list.push(ob)
        })
        cb(null,list)
      })
      .catch(error=>{
        cb(error,null)
      })
  })
  .catch(error=>{
    cb(error,null)
  })
  // Apiemployee.find({
  //     where:{
  //       apiEmpCode:empCode,
  //       apiEmpApproved:1
  //     },
  //     include:{
  //       relation:"apiMeta",
  //       scope:{
  //
  //         fields:['apiMetaPerpt','apiMetaSection']
  //       }
  //     }
  // }).then(rr=>{
  //   cb(null,rr)
  // })
  // .catch(error=>{
  //   cb(error,null)
  // })
};
Apiemployee.remoteMethod('getDeptSummary',{
      accepts:[{
        arg:'deptId',
        type:'number'
      },
    ],
      http:{



        path:'/getDeptSummary/:deptId',
        verb:'get'
      },
      returns:{
       arg:'scoreList',
       type:'array'
     }
});
};
