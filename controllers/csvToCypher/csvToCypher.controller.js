const constants = require("../utils/constants.js");
const {parse}   = require("fast-csv");
const fs        = requrie("fs");
const path      = require("path");
const formatter = require("../utils/formatter");
const getFileDetails = async(req, res) =>{
  try{
    const files  = req.body;
    if(!Array.isArray(files)){
      return res.status(constants.CODES.VALIDATION_FAILED).send({
        success: false,
        message: constants.MESSAGES.VALIDATION_FAILED
      });
    }
    let data =[];
   let p = formatter.start();
   for( file of files){
    fs.createReadStream(path.resolve(__dirname, file.fileName))
    .pipe(
      parse({headers: true})
    )
    .on('data',(row)=>{
      console.log(row);
      data.push(row);
      p=formatter.format(row,p);
    })
    .on('end',end =>{
      console.log("ended");
  });
  }
  const {id, nodes, relationships} = Formatter.store();
  Formatter.close();
  return res.status(constants.CODES.SUCCESS).send({
        success: true,
        data: data.slice(0,data.length<10?data.length:10)
        nodes: nodes
        relationships :relationships,
        formatterId :id
    });
  }
  catch(Error){
    return res.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: Error.message
    });
  }
  const validateNodesAndRelationships= async( request, response) =>{
    try{
      if(! request.body.formatId){
        return response.status(constants.CODES.VALIDATION_FAILED).send({
          success: false,
          message: 'formatId required',
          dat    : request.body
        });
      }
      const {id,nodes, relationships }=formatter.retrieve(request.body.formatId, request.body.nodes, request.body.relationships);
       if(!id){
        return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
          success : false,
          data    : id
        })
      }
      return response.status(constants.CODES.SUCCESS).send({
        success: true,
        nodes  : nodes,
        relationships: relationships
      });
    }
    catch(Error){
      return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
      success: false,
      message: Error.message
    });
    }
    
  };
  const removeFormat = async(request, response)=>{
    try{
      if(! request.body.formatId){
        return response.status(constants.CODES.VALIDATION_FAILED).send({
          success: false,
          message: 'formatId required',
          dat    : request.body
        });
      }
      const removeFormat = formatter.destroy(request.body.formatId);
      if(!removeFormat.status){
        return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
          success : false,
          data    : removeFormat
        })
      }
      return response.status(constants.CODES.SUCCESS).send({
        success: true,
        data   : removeFormat
      })
    }
    catch(Error){
      return response.status(constants.CODES.SOMETHING_WENT_WRONG).send({
        success: false,
        message: Error.message
      });
    }
    
  }
module.exports = {
  getFileDetails,
  validateNodesAndRelationships,
  removeFormat
}

