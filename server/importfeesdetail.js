'use strict';
const app = require('./server')
const path=require('path')
const XLSX=require('xlsx')
const feesDetailDt=require('../common/models/fees-info.js')
const studentdt=require('../common/models/student-info.js')
    let filepath=path.resolve(__dirname+'/feesdetail_template.xls');
    console.log('****',filepath);
    let wb=XLSX.readFile(filepath)
    let xcelDt1=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    xcelDt1.map(dt=>{

      const temp1=new Date(dt.receipt_date)
      let tt=new Date(temp1.getTime() + Math.abs(temp1.getTimezoneOffset()*60000))
      const studentInfo=app.models.StudentInfo;
      const feesInfo=app.models.FeesInfo;
      studentInfo.findOne({where:{stuEnroll:dt.enrollment}})
        .then(response=>{
          const ob={
            id:0,
            fStuId:response.stuId,
            feesAmountPaid:dt.fees_paid,
            feesPaymentStatus:dt.status,
            verified:1,
            feesSem:dt.fees_sem,
            feesReceiptDate:new Date(),
            feesReceiptNumber:dt.receipt_number,
            fAyId:1,
            feesComment:""
          }
          feesInfo.create(ob)
        })
        .catch(error=>{





          console.log(dt.enrollment);
        })
  })
