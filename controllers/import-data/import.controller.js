const constants = require("../../utils/constants.js");
const fs	 = require("fs");
const {parse}	 = require("fast-csv");
const Cypher 	 = require("../../services/cypher.service.js");
const path      = require("path");
const { topologicalSort } = require("../../utils/sort" );
const addData = ( request, response ) =>{
  try{
    const requestData = request.body;
    const dataId      = requestData.id;
    let files         = requestData.files;
    let comitted      = false;
    //example of files data
  /*files = [{
      table_name         : 'abc', 
      foreign_keys       :[
        {column_name :'f_id', references:'ert', references_column:'abc_id'}
     ],
      relations          :['product_category']
    }]
    curl --request POST   --url http://localhost:8090/api/import/add-data   --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzkxZGFlNy01NWY1LTQyNWMtOGZiYS02ZWZiODZmMzNiYmEiLCJpYXQiOjE2NTUxMTk3MDh9._A4y4BMHlhrGN_8KnJgAIYC06uW4wVVPpO4SdzgwbpY'   --data '{"files":[{"table_name":"abc","relations":["product_category"],"foreign_keys":[{"column_name":"f_id","references":"ert","references_column":"abc_id"}] }] }' --header 'content-Type:application/json'
    */
    let graph  = files.map( file => {
      let references = file.foreign_keys.map( f=> {return f.references });
      return  { par: file.table_name, chi: references }
    });
    
    graph = topologicalSort(graph)
    
    files = graph.map( g=> { return files.find( file =>{ return file.table_name===g.par})      });
    
    let metaData = [], i=0;
    for (file of files){
    	const file_name = file.table_name;	    	
    	let s=0; let rel_count =0;
    	let columns,foreign_keys, file_relations;
        fs.createReadStream(path.resolve(__dirname, "../../files/"+file_name+".csv"))
    .pipe(
      parse({headers: true})                  
    )
    .on('data',(row)=>{
      s++;
      let node ={};
      let relations=[];
      columns= columns || Object.keys(row);
      foreign_keys=foreign_keys||file.foreign_keys;
      file_relations= file_relations||file.relations;
      console.log("relations input", file_relations);
      for( let r=0;r<columns.length; r++){
	  let index = foreign_keys.findIndex( f=> {return  f.column_name===columns[r]; });
          if(  file_relations.includes(columns[r]) || index !== -1){
            let relation ={},node_name;
            if(file_relations.includes(columns[r])){
              relation[columns[r]] = row[columns[r]];
              node_name = columns[r];
            }
            else{
              relation[foreign_keys[index].references_column] = row[columns[r]];
              node_name = foreign_keys[index].references;
            }
            relations.push([node_name,relation]);
          }
          
          else{
            node[columns[r]]= row[columns[r]]
          }
      }
      
      rel_count += relations.length;
      file_name[0] = file_name[0].toUpperCase();//change to first letter caps
      Cypher.createAsNode(node, file_name );
      for( let k=0;k<file_relations.length;k++){
        let relation_Value = {};
        relation_Value[file_relations[k]] = row[file_relations[k]];
        console.log(relation_Value, file_relations[k]);;
        Cypher.createAsNode(relation_Value, file_relations[k]);
      }
     // console.log(relations);
      for ( let k=0;k< relations.length; k++){
         Cypher.createAsRelation(node,relations[k][1],file_name, relations[k][0]);  
      }
    })
    .on('end',end =>{
      metaData.push({relationships:rel_count, nodes:s, file_name: file_name});
      i++;
      if(i==files.length){
      tx.commit();
       return response.status(constants.CODES.SUCCESS).send({
    	  success: true,
          data   : metaData,
       });
     }
       
    });
    }
    
    
   // let metaCypher = await Cypher.getAllRelations();
   
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
