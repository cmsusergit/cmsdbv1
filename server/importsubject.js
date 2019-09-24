'use strict';
const app = require('./server')
const path=require('path')
const XLSX=require('xlsx')
const studentdt=require('../common/models/subject-info.js')

    let filepath=path.resolve(__dirname+'/subject_first.xls');
    console.log('****',filepath);
    let wb=XLSX.readFile(filepath)
    let xcelDt1=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    console.log('----',xcelDt1);


    const subjectInfo=app.models.SubjectInfo;
    subjectInfo.create(xcelDt1,null)
