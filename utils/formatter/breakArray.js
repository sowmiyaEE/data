const {isMetric, isDate, isValid} = require("./../validation.js");
const breaker= (value, entryValue, table)=>{
  let  node_names = Object.keys(value);
  node_names = node_names.filter(n=> {return (n!="abc" && n!="table_column_mapping")});
  let Dif =1;
  let columns = Object.keys(entryValue);
  let metric=false;
  value["table_column_mapping"] = value["table_column_mapping"]||[];
  var s='', N='';
  columns.map(c=>{
    const alMapped = value["table_column_mapping"].find(map=>{ return map.table==table && map.column==c && map.column!=map.node_name})
    if(alMapped!=null){
	s = alMapped["node_name"];
	Dif    = alMapped['diff'];
    }


    else if (!isMetric(entryValue[c])  && isValid(entryValue[c])) {
     metric=false
     let flag=false, founde;
     for( i of  node_names){
	founde = value["table_column_mapping"].find(a=> { return a.node_name==c && a.column==i} )
        if(i!=c && !founde && value[i].includes(entryValue[c]))
        {  
            N=i;
            entries = value[c].length;
            if( entries.length==0 ){ flag = true; break;}
            let  diff=0,  dif=0, r, attain = 0,main_diff=0;
            for( let pe=0; pe<value["table_column_mapping"].length; pe++){
                 let a = value["table_column_mapping"][pe];
                 if(value["table_column_mapping"][pe].table===table && 
                 value["table_column_mapping"][pe].node_name===N){
		    if(attain==2){
		    diff =  value["table_column_mapping"][pe]['diff'];
                    value["table_column_mapping"][pe]['index']+=main_diff;
                    value["table_column_mapping"][pe]['diff']=diff+1;
                    }
		    dif=1;
                    attain = 3;
                    r = a['index']; 
                  }
                 if(a.table===table && value["table_column_mapping"][pe].node_name===c){
                   if(attain==0){
                     dif = 0;
                     r = value["table_column_mapping"].find(a => a.table==table && a.node_name==N);
                     diff =  r.diff;
                     r = r.index;
                   }
                   attain=2;
                   let oldValue = value[c][value["table_column_mapping"][pe]['index']];
                   value["table_column_mapping"][pe]['index']=r+dif;
                   value["table_column_mapping"][pe]['node_name']=i;
                   value["table_column_mapping"][pe]['diff']=diff+1;
                   value[N].splice(r+dif, 0, oldValue);
                   dif++;
                   main_diff++;
                 }
                 }
                
          s=i;
          Dif=diff+1;
          flag=true;
         console.log(value["table_column_mapping"],value[N]);
          break;
          
        }       
      }
      if(!flag) {s=c;}
    }
    else{
      s = c;
      console.log('metric');
      metric =true;
    }
    value[s]= value[s]||[];
    value[s].push(entryValue[c]);
    value["table_column_mapping"].push({'table':table, 'column':c,'node_name':s, 'index':value[s].length-1,'type': typeof(entryValue[c]),'isMetric':metric, 'diff':Dif})
  });
  return value;
}
module.exports = {breaker}

