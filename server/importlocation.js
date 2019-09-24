'use strict';
const app = require('./server')
const path=require('path')
const XLSX=require('xlsx')
    let filepath=path.resolve(__dirname+'/locationAERO.xls');
    console.log('****',filepath);
    let wb=XLSX.readFile(filepath)
    let xcelDt1=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    console.log('----',xcelDt1);
    const locationInfo=app.models.TtLocationInfo;
    locationInfo.create(xcelDt1,null)
