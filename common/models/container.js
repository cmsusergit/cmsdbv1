'use strict';
const app = require('../../server/server')
const path=require('path')
const XLSX=require('xlsx')
const studentdt=require('./student-info.js')
module.exports = function(Container) {
  Container.afterRemote('upload',(ct,mInst,next)=>{
    console.log(`****${JSON.stringify(mInst.result.fields.type)}****`);
    let filepath=path.resolve(__dirname+'/../../',mInst.result.files.excel[0].container,mInst.result.files.excel[0].name);
    console.log('****',filepath);
    let wb=XLSX.readFile(filepath)
    let xcelDt1=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    if(mInst.result.fields.type[0]=='studentlist'){
      const studentInfo=app.models.StudentInfo;
      studentInfo.create(xcelDt1,next)
    }
    else if(mInst.result.fields.type[0]=='employeelist'){
      const employeeProfile=app.models.EmpProfile;
      employeeProfile.create(xcelDt1,next)
    }
  })
};
