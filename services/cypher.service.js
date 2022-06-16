const createAsNode = (data,label) =>{

  const attributes = Object.keys(data);
  let params  =[];
  for( let i=0; i<attributes.length; i++){
  	if(typeof(data[attributes[i]])==='string'){
  		params.push(attributes[i]+":"+ "'" +data[attributes[i]] +"'");
  	}
  	else{
  		params.push(attributes[i]+":"+data[attributes[i]]);
  	}
  }
  params = params.join(',');
  const query = `MERGE (p:${label} {${params}}) return p`;
  return tx.run(query).then((data)=>{
    const keys= data.records[0].keys;
    //console.log(data.records[0].get(keys[0]));
   
     return data.records[0];
  }).catch((error)=>{throw error;})
};

const createAsRelation = (start_data, end_data,  start, end) =>{

  let start_params =[];
  let end_params =[];
  const attributes = Object.keys(start_data);
  for( let i=0; i<attributes.length; i++){
  	if(typeof(start_data[attributes[i]])==='string'){
  		start_params.push("a."+attributes[i]+"="+ "'" +start_data[attributes[i]] +"'");
  	}
  	else{
  		start_params.push("a."+attributes[i]+"="+start_data[attributes[i]]);
  	}
  } 
  const attributes2 = Object.keys(end_data);
  for( let i=0; i<attributes2.length; i++){
  	if(typeof(end_data[attributes2[i]])==='string') {
  		end_params.push("b."+attributes2[i]+"="+ "'" +end_data[attributes2[i]] +"'");
  	}
  	else {
  		end_params.push("b."+attributes2[i]+"="+ end_data[attributes2[i]]);
  	}
  } 
   start_data =  start_params.join(' AND ');
   end_data = end_params.join(' AND ');
   const query = `MATCH
  (a:${start}),
  (b:${end})
  WHERE ${start_data} AND
  ${end_data}
MERGE (a)-[r:${(start+end).toUpperCase()}]->(b)
RETURN type(r)`;
  tx.run(query).then((data)=>{

  return data;
 }).catch((error)=>{throw error;})
};

const createDataBase = (name) => {
  const query = ``;
   tx.run(query).then((data)=>{
  }).catch((error)=>{throw error;})
};

const getAllRelations =(start, end) =>{
  const query = `MATCH path= (a:${start})-[]->(b:${end}) return path limit 20`;
   tx.run(query).then((data)=>{
   console.log(data.records.length,data.records[0].get('path'));
   
    return data.records;
  }).catch((error)=>{throw error;})
};
/*
let s = createAsNode( {name:'L3', doB:'01-04-98'}, "Persom");

Promise.resolve(s).then((d)=>{

let p = createAsRelation({name:'L3', doB:'01-04-98'},{area:"Shill nagar"}, "Persom","Location");
Promise.resolve(p).then((d)=>{

let s2= getAllRelations("Persom","Location");
Promise.resolve(s2).then((d)=>{
  console.log(d);
})
})
}).catch(error =>console.log(error));
*/
const getMetaData = ()=>{
console.log("called");
  tx.run("CALL db.schema.visualization()").then((data)=>{
 //   console.log( data.records[0].get("relationships"));
 //   console.log( data.records[0].get("nodes"));
    return {rel:data.records[0].get("relationships"),nodes: data.records[0].get("nodes")};
  });
};

//getMetaData();
module.exports= {
  createAsNode,
  createAsRelation,
  createDataBase,
  getMetaData
};

