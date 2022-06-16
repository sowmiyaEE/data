function topologicalSort( graph ){
  let L =[],S =[], tree= graph;

  for( let i= 0; i< tree.length; i++){
  	if( tree[i].chi.length==0) S.push(tree[i].par)
  }
  while(S.length!=0){ 
  	let a =S.pop();
  	for( let i=0;i< tree.length; i++){
  		if( tree[i].chi.includes(a) ){
  			tree[i].chi= tree[i].chi.filter( aa=>{return  aa!=a });
  			if( tree[i].chi.length==0){
  				S.push(tree[i].par)
  			}
  		}
  	}
  	L.push(a);
  }
  L = L.map( a => { return graph.find( gr=> { return gr.par === a }); });
  console.log("sorted order" , L);
  return L;
}
module.exports ={ topologicalSort };
