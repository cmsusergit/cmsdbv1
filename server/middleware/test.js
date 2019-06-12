module.exports = function(){
  return function testlogger(request,response,next){

    console.log(request.url);
    next()
  }
}
