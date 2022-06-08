
const createAsNode = async(data,label) =>{
  const query = `MERGE (p:$label {$params}`;
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
  params = {label:label, params:params.join(',')};
  tx.run(query,params).then((data)=>{
  }).catch((error)=>{throw error;})
};

const createAsRelation = async(start_data, end_data,  start, end) =>{
  const query = `MERGE (a:$start {$start_data} )-[R:$relation]->(B:$end {$end_data})`;
  let start_params =[];
  let end_params =[];
  const attributes = Object.keys(start_data);
  for( let i=0; i<attributes.length; i++){
  	if(typeof(start_data[attributes[i]])==='string'){
  		start_params.push(attributes[i]+":"+ "'" +start_data[attributes[i]] +"'");
  	}
  	else{
  		start_params.push(attributes[i]+":"+start_data[attributes[i]]);
  	}
  } 
  const attributes2 = Object.keys(end_data);
  for( let i=0; i<attributes2.length; i++){
  	if(typeof(end_data[attributes2[i]])==='string'){
  		end_params.push(attributes2[i]+":"+ "'" +end_data[attributes2[i]] +"'");
  	}
  	else{
  		end_params.push(attributes2[i]+":"+ end_data[attributes2[i]]);
  	}
  } 

  const params = { start: start, end: end, relation: start+end, start_data: start_params.join(','), end_data: end_params.join(',')};
  tx.run(query, params).then((data)=>{
 }).catch((error)=>{throw error;})
};

const createDataBase = async(name) => {
  const query = ``;
   tx.run(query).then((data)=>{
  }).catch((error)=>{throw error;})
};

const getAllRelations =async(nodeLabel) =>{
  const query = `()-[]->()`;
   tx.run(query).then((data)=>{
    return data;
  }).catch((error)=>{throw error;})
};

module.exports= {
  createAsNode,
  createAsRelation,
  createDataBase
};

