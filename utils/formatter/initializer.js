class initializer {

constructor(){
   this.initial_state ={};
   this.values ={};
   this.nodes=[];
   this.relationships=[];
   this.formatter=[];
   this.entryValue={};
   this.table="";
   
   this.start= (value, table)=>{
   console.log(value, table);
     this.entryValue = value;
     this.table = table;
     return this;
  }
  this.stop= ()=>{
    const temp  = this.values;
    destroy(this);
    return temp;
 } 
   this.pipe = (callback)=>{
    this.values= callback(this.values,this.entryValue,this.table);
    return this;
  }
  return this;
  }
   async getData(){
   return this.values;
  }
  async store(){
    return this;
  }
  async retrieve(){
    return this;
  }
  //format will be
  /*
  
  
  
  
  recieving a input of object+tablename
  {
    nodes_to_create_from:[{
  	node_name:"object",
  	node_attributes:["",""],//columnnames
    }],
    relations_to_create_from:[{
     relation_name:"relation",
     start_node:"",//node_name
     end_node:"",//node_name
     attributes:["",""]//columnnames
    }]
  }
}
*/
}
module.exports =initializer;
