'use strict';

module.exports = function(Useraccount) {

//   Useraccount.observe('after save', function(context,next) {
//     if(context.isNewInstance){
//       console.log('++++',context.instance.email);
//        Useraccount.app.models.Email.send({
//          to: context.instance.email,
//          from: 'cmsusergit@gmail.com',
//          subject: 'CMS User Registration Confirmed',
//          text: 'You Have been Successfully Registeed',
//
//        },function(err, mail) {
//          console.log('email sent!');
//           if(err){
//             next(err,null)
//          }
//          else {
//            next()
//          }
//        });
// }
// else{
//   next();
// }
// })
}
