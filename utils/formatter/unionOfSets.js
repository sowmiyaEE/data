const union= (value, entryValue, table)=>{
  
  let nodes = Object.keys(value);
  let schema  = value["table_column_mapping"];
  schema.slice(-Object.keys(entryValue).length).map(s =>{
    let last_column = s['column'];
    let main_column = s['node_name'];
     let rows = value[last_column];
      rows.map(a => {
        let index=0;
        if(value[main_column].includes(a)){
          index = value[main_column].indexOf(a);
        }
        else {
          value[main_column].push(a); 
          index = value[main_column].length-1;
        }
        const ID = index;
        const v = a;
        const name = main_column;
        const type = Object.keys(value['abc'][s.table]).includes(last_column)?'node':'relation';// find if node or relation
        const source= s.table;
        const others = {};
       // console.log("potential :", {id: ID, value: a, name: main_column, type: type, source: source});
//        alter relations of the last_column+Killer+ wih new index.
      });
//     add it to the else block of breakArray to find Relations of them.
//     let relationships_of_n = findRelations
 
     //value["nodes_official"] = value["nodes_official"] ||[];
    // value["nodes_official"].push({"node":main_column,"attributes":{value: value[main_column]}});
     
//     delete value[last_column];
console.log(value["abc"]);
   })
  return value;
  
  
}
module.exports = {union}

