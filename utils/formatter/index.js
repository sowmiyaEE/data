const{breaker}= require("./breakArray.js");
const{gatherer}= require("./gather.js");
const{union}= require("./unionOfSets.js");
const initializer= require("./initializer.js");

const format = ( ValuesArray, program ) =>{
  try{
   let value = ValuesArray; 
   return program
   .start(value, "cust")
   .pipe(breaker)
   .pipe(gatherer)
   .pipe(union);
  }
  catch(error){
    throw error;
  }
    
};

const start = ()=>{
  let Inititalizer = new initializer();   
  let program = Inititalizer.start({});
  return program;
}

module.exports = {format}

