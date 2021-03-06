'use strict'
const app1 = require('../../server/server')

module.exports = function(Empprofile) {
  Empprofile.validatesUniquenessOf('empCode', {message: 'Employee Code required unique'})
  Empprofile.validatesUniquenessOf('email', {message: 'Employee Email required unique'})
  Empprofile.observe('after save',(context,next)=>{
    if(context.isNewInstance){
      const user_model=app1.models.UserAccount;
      const user1={
        username:context.instance.empCode,
        password:context.instance.empCode,
        email:context.instance.email,
        userType:1
      };
      user_model.create(user1)
        .then(ob=>{
          console.log(`%%%%${JSON.stringify(ob)}%%%%`);
          const temp=[{
            id:0,
            roleId:2,
            userId:ob.id
          }]
          console.log(`----${context.instance.isTeaching}----`);
          if(context.instance.isTeaching){
            temp.push({
              id:0,
              roleId:4,
              userId:ob.id
            })
          }
          const rolemapping_model=app1.models.Userrolemapping;
          rolemapping_model.create(temp,next)
      })
      .catch(error=>{
        console.log("****",error);
        next(error,null)
      })
    }
    else{
      next()
    }

  })
  Empprofile.observe('before delete',(context,next)=>{
      const user_model=app1.models.UserAccount;

      Empprofile.findOne({where:context.where,fields:{empCode:1}},(error,dt)=>{
        if(!error){
          console.log(JSON.stringify(dt));
          const ob={where:{username:dt.empCode}};
          user_model.findOne({where:{username:dt.empCode}},(error,tt)=>{
            if(!error){
              user_model.destroyById(tt.id,next)
            }
            else {
              console.log('****',error);next(error,null)
            }
          })
        }
        else{
          next(error,null)

        }
      })
  })



  Empprofile.getDeptSummary=function(deptId,cb){
    Empprofile.find({
        where:{
          deptId:deptId
        },
        fields:['empId','empCode'],
        include:[{

          relation:"apiTeachings",
          scope:{
            fields:['id','fEmpId','gtuResult','instituteResult']
          }},
          {
            relation:"apiObservationHods",

            scope:{
              where:{
                fParamId:8
              }
            }
          },
          {
            relation:"apiObservationPrincipals",
            scope:{
              where:{






                or:[{fParamId:2},{fParamId:7}]
              }
            }
          }]
    }).then(rr=>{
      cb(null,rr)
    })
    .catch(error=>{
      cb(error,null)
    })
  };
  Empprofile.remoteMethod('getDeptSummary',{
        accepts:[{
          arg:'deptId',
          type:'Number'
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
