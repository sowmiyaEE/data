// npm install --save neo4j-driver
// node example.js
const neo4j = require('neo4j-driver');
const driver = neo4j.driver('neo4j+s://67f71edc.databases.neo4j.io',
                  neo4j.auth.basic('neo4j', 'AP5g3tmjBE_n0MPXmLhEuBu5VLb2vL6QMzS0jJyGsoE'), 
                 {/* encrypted: 'ENCRYPTION_OFF' */});
 
 function(start, end, relation, cond={}){
   try{     
     const query = `MATCH path = (start:${start})-[r:${relation}]->(end:${end}) return *`;
     let   params = {};
     if(cond !={} ){
       if(cond.start){}
       if(cond.relation){}
       if(cond.end){}
     }
     session.run(query, params)
     .then((result) => {
       
       result.records.forEach((record) => {
         const keys = record.keys;  
         keys.forEach((recordKey)=>{
           const recordValue = record.get(recordKey);
           if((recordKey === 'start')||(recordKey === 'end')){
             
           }
           if(recordKey==='relation'){
           
           }
         })
        //console.log(record.get('path').end.properties.title);
     });
     session.close();

  })
  .catch((error) => {
    console.error(error);
    session.close();

  });
   }
   catch(error){
     console.log(error);
   }
 }
/*const query =
  `
  MATCH path=(
  m:Movie {title:$movie})<-[rated:RATED]-(u:User)-[:RATED]->(rec:Movie)
  where rated.rating>3
  RETURN * limit 20
  `;

const params = {"movie": "Crimson Tide"};

const session = driver.session({database:"neo4j"});

session.run(query, params)
  .then((result) => {
  
    result.records.forEach((record) => {
        //console.log(record.get('path').end.properties.title);
    });
    session.close();

  })
  .catch((error) => {
    console.error(error);
    session.close();

  });*/
  /*LOAD CSV FROM 'https://docs.google.com/spreadsheets/d/1McWrorAcKU35wK4hluDzjEBRFEaRevGYxlrLaVf9cho/edit#gid=0' AS line 
    RETURN linenumber() AS number, line
    CREATE (:User2 {name: line[2], id: line[1], doB: line[3], lang:line[4]})
    "https://data.neo4j.com/northwind/customers.csv"
    LOAD CSV WITH HEADERS FROM "file:///shopping.csv" AS line RETURN file() AS path 
        CREATE ( P: Bunnies {name: $name, height: $height, weight: $weight})
    */
  const session2 = driver.session();
  const csvLoadQuery = `
    LOAD CSV WITH HEADERS FROM "file:///shopping.csv" AS line 
    RETURN line
    `
;

const tx = session2.beginTransaction();

   // tx.run(csvLoadQuery).then((result)=>{
    
   // result.records.forEach((record) => {
   //     console.log(record);
   // });
    tx.run("MATCH (a:Person)-[w]->(m:Movie) return a, w, m limit 205").then((alldata)=>{
    //tx.run("MATCH a=()-->() return a").then((alldata)=>{
     let Nodes=[], Edges=[],i=0,j=1000,AllNodes=[], property='name',property2='title',title_property2='title', title_property='name';
      alldata.records.forEach((record)=>{
        const start = record.get("a"),
              relation = record.get("w"),
              end = record.get("m");
        let al = AllNodes.find(a=>{ return a.identity===start.labels[0]+start.identity.low}); 
        if(!al){
          i++;
          AllNodes.push({id:i,identity:`${start.labels[0]}${start.identity.low}`});
          sId = i;
          Nodes.push({ id: sId,//`${start.labels[0]}${start.identity.low}`, 
      	           label: `${start.properties[property]}`,
      	           title: `${start.properties[title_property]}`
      	  });
      }
      else sId=al.id;
      al=AllNodes.find(a=>{ return  a.identity===end.labels[0]+end.identity.low });
      if(!al){
        j++;
        AllNodes.push({id:j, identity:`${end.labels[0]}${end.identity.low}`});
        eId=j;
         Nodes.push({ id: eId,//`${end.labels[0]}${end.identity.low}`, 
      	           label: `${end.properties[property2]}`,
      	           title: `${end.properties[title_property2]}`
      	          });
        
      }
      else
       eId=al.id;
       
       Edges.push({ 
      		from:sId,//`${start.labels[0]}${start.identity.low}`,
	      	to: eId,//`${end.labels[0]}${end.identity.low}`
	      	});
      
   
     
      
});
   // })
   console.log(Nodes, Edges);
    session2.close();
    driver.close();
  })
  
  .catch((error) => {
    console.error(error);
    session2.close();
    driver.close();
  });
//return * keys are all variables
//get(kEY).
