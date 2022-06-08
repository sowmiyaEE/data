const {parse} = require("fast-csv");
const fs = require("fs");
const path = require("path");
const neo4j = require('neo4j-driver');
const formatter = require("./utils/formatter");
const initializer= require("./utils/formatter/initializer.js");
let driver = neo4j.driver('neo4j://localhost:7687',
neo4j.auth.basic('neo4j', 'password'),{});
async function readCSV (file_name){
  try{
  let Inititalizer = new initializer();   
    fs.createReadStream(path.resolve(__dirname, file_name))
    .pipe(
      parse({headers: true})
    )
    .on('data',(row)=>{
      formatter.format(row, Inititalizer);
    })
    .on('end',end =>{
      console.log("ended");
    });
  }
  catch(error){
  
  }
}
readCSV('files/shopping.csv');


