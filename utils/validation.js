const isMetric= (value)=>{
  if(typeof(value)!="string")
    return true
  return false
};
const isDate = (value)=>{
  //return through valid date via moment
  return false;
};
const isValid = (value)=>{
  if(value !=null)
    return true
  return false
  
};
module.exports = {
  isMetric,
  isDate,
  isValid
}
