const cypher = require("...");
let node_name = 'Movie';
let attributes = [
   {
     name: 'title',
     type: 'string',
     optional: false
   },
   {
     name: 'average_rating',
     type: 'float',
     optional: true
   }
];
const validation = (data)=>{
  for( let i = 0; i< attributes.length; i++ ) {
  	let attribute = attributes[i];
  	let value = data[attribute.name];
  	if(value){
  		if( typeof(value) === attribute.type ){
  			
  		}
  		else
  			return 'invalid'+ typeof(value) + "attribute "+ attribute.type;
  	}
  	else{
  		if(!attribute.optional)
  			return 'invalid' + attribute.name+ "is not optional";
  	}
  }
  return false;
};

const creation = (data) =>{
  let params=[];
  for( let i=0; i<attributes.length; i++){
  	if(attributes[i].type==='string'){
  		params.push(attributes[i].name+":"+ "'" +data[attributes[i]] +"'");
  	}
  	else{
  		params.push(attributes[i].name+":"+data[attributes[i]]);
  	}
  }
  const query  = `  CREATE (p:${node_name} {${params.join(',')}})`;
  cypher.run(query);
};

module.exports = {node_name, attributes, validation, creation};
     
