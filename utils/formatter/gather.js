const gatherer= (value, entryValue, table)=>{
  const node_values =  entryValue;
  const node_value_keys = Object.keys(node_values);

  value['abc']=value['abc']||{};
  value['abc'][table]=value['abc'][table]||{};
  //value['abc'][table]['relations_attributes']=value['abc'][table]['relations_attributes']||{};
  let myKeys = value['table_column_mapping'].slice(-node_value_keys.length)
  
  for(var i=0; i<myKeys.length; i++ ){
    const insertColumn = myKeys[i]['node_name'];
    const insertIndex  = myKeys[i]['index'];
    const iDiff  = myKeys[i]['diff'];
    const insertedValue = value[insertColumn][insertIndex];
    for(var j=0;j<myKeys.length; j++){
      const mappedColumn = myKeys[j]['node_name'];
      const jDiff= myKeys[j]['diff'];
      value['abc'][table][insertColumn]=value['abc'][table][insertColumn]||{};
      if( insertColumn == mappedColumn || myKeys[i].isMetric){
        //both belong to same node or in relations
        

        
        
      }
      else if ( i!=j){
      value['abc'][table][insertColumn][mappedColumn]=value['abc'][table][insertColumn][mappedColumn]||'--';  
      if(value['abc'][table][insertColumn][mappedColumn]=='--'){
        //console.log(insertColumn, mappedColumn);
        const mappedIndex  = myKeys[j]['index'];
        const mappedValue  = value[mappedColumn][mappedIndex];   
        let index = insertIndex, index2 = mappedIndex;   	
//        value["table_column_mapping"].map(row=>{ if( row[insertColumn] && row[mappedColumn] ){Indexes1.push(row[insertColumn]index); Indexes2.push(row.[mappedColumn].index);}});
      	while(index>=0 && index2>=0){
          let a= value[insertColumn][index];
          let b= value[mappedColumn][index];
          if(a==insertedValue){          
            if(b !== mappedValue){
               value['abc'][table][insertColumn][mappedColumn] ='!!';
            }
          }
          index-=iDiff; index2-=jDiff;
        }
      }
    }
    }
  }

/*
    const v = value[m.column];
    if(node_values[m] != value['abc'][table][m]){    
     const rem =value['abc'][table][m];
     delete value['abc'][table][m];
     if(typeof(rem) == 'number' || typeof(rem) == 'date'){
       value['abc'][table]['relations_attributes'][m]=rem;
     }   
     else{
       //new node attributes
     }
  }
  else{
    //Node 1 -- node 2?
    //node 1? Attribute1, attrbute 2?
    //node 1? -- Related To  -- node 2?
    //Related To -- atribute?
  }
  }*/
  //console.log("showing the gather",value['table_column_mapping']);
  //relations
  /*
  for(m of value['table_column_mapping']){
    const column = m.column
    const type   = m.type
    const node   = m.node_name
    
    if(value[node]){
      if(  !Object.keys(value['abc'][m.table]).includes(node)){
        for(let index=0; index < value[node].length; index++){
	console.log("mapped ",index,m, " ---",value[node][index]);
	
   // given: entry value value['entryValue'],
   //all the full columns where we have defined relations previously
   //        the columns which to be considered as nodes, which as relations
       
        }
        
      }
    //gather the similar 
   }
    //change the columns for others also IMP
  }
*/
/*  const node_store = value[table]["node_attributes"]||node_value_keys ;
  const relation_store = value[table]["relation_attributes"] ||[];
  let nodes= relations={};
  
  node_value_keys.map( v=>{
    if(node_store.includes(v)){
      nodes[v]=node_values[v];
    }
    if(relation_store.includes(v)){
    
    relations[v]=node_values[v];
    //start node and end node find with relation-attributes;
    }
  })*/
 return value;
}
function compare(a,b){
  
}
module.exports = {gatherer};

