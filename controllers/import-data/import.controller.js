const constants = require("../../utils/constants.js");
const fs	 = require("fs");
const {parse}	 = require("fast-csv");
const Cypher 	 = require("../../services/cypher.service.js");

const addData => async( request, response ) =>{
  try{
    const requestData = request.body;
    const dataId      = requestData.id;
    const nodes       = requestData.files;
    //example of files data
  /*files = [{
      table_name         : 'abc.csv', 
      primary_column_name:'id', 
      foreign_keys       :[
        {column_name :'f_id', references:'ert', references_column:'abc_id'}
     ]
    }]*/
    const relations   = requestData.relations;
    let metaData      = [];
    for(let i=0; i<files.length; i++){
    	const file_name = nodes[i].table_name;
    	const primaryKey = nodes[i].primary_column_name; 	    	
    	let s=0;
 fs.createReadStream(path.resolve(__dirname, file_name))
    .pipe(
      parse({headers: true})
    )
    .on('data',(row)=>{
      s++;
      await Cypher.createAsNode(row, primary_column_name );
    })
    .on('end',end =>{
      metaData.push({type: 'NODE', nodes_created:s, file_name: file_name})
    });
    	
    
    for (let j=0; j<foreign_keys.length; j++){
	const file_name2 = foreign_keys[i].references;
    	const start_key = foreign_keys[i].column_name; 	
    	const end_key  = foreign_keys[i].references_column;    	
    	let s1=0;
    fs.createReadStream(path.resolve(__dirname, file_name2))
    .pipe(
      parse({headers: true})
    )
    .on('data',(row)=>{
      s1++;
      await Cypher.createAsRelation(row, start_key , end_key);
    })
    .on('end',end =>{
     metaData.push({type: 'RELATION', relations_created:s, file_name1: file_name1,file_name2: file_name2,file_name1_column:start_key, file_name2_column:end_key })
    });
    }   
    }
    return response.status(constants.CODES.SUCCESS).send({
    	success: true,
    	data   : metaData
    });
  }
  catch(error){
    return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
    	success: false,
    	message: error.message
    });
  }
};
const initialize = (request, response) => {
try{
  const request = request.body;
  const {Id, databse_name} = Cypher.createDataBase();
  return response.status(constants.CODES.SUCCESS).send({
  	success: true,
  	data   : {
  		id: Id,
  		database: databse_name
  	},
  	message: constants.MESSAGES.SUCCESS
  });
}
catch(error){
  return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
    	success: false,
    	message: error.message
    });
}

};


module.exports = {addData};
