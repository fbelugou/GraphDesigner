//$(document).ready(function(){

///////////////////////////////////////////////////////////////

              //STYLE//

///////////////////////////////////////////////////////////////
var style1 = cytoscape.stylesheet()
    .selector(':selected')
      .css({
        'border-color':'red',
        'border-width':5,
      })
    .selector('node')
      .css({
        'content': 'data(id)',
        'text-transform': "uppercase",
        'text-valign': 'center',
        'color':'#fff',
        'width': 100,
        'height':100,
        'font-size':50,
        'font-weight' : 'bold'
      })
    .selector('edge')
      .css({
       'target-arrow-shape': 'triangle',
        'width': 10,
        'line-color': '#888',
        'target-arrow-color': '#888',
        'color': "#fff",
        'mergeWidth': 2,
        'opacity': 1,
        'content': 'data(weight)',
        /*'text-outline-width': 4,
        'text-outline-color': '#888',*/
        'curve-style':'ellipse',
        'font-size' : 60,
        'font-weight' : 'bold'
      })
    .selector('.edgeRevisite')
      .css({
        'text-outline-color': '#00FF00',
        'background-color': '#00FF00',
        'line-color': '#00FF00',
        'target-arrow-color': '#00FF00',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s',
        'line-style':'dashed',
        'curve-style':'ellipse'
      })
     .selector('.edgeVisite')
      .css({

        'text-outline-color': '#61bffc',
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s',
        'curve-style':'ellipse'
      })
       .selector('.nodeVisite')
      .css({

        'text-outline-color': '#61bffc',
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      })
       .selector('.nodeVisite:selected')
      .css({


        'border-color': 'red',
        'border-width':5,
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      });



///////////////////////////////////////////////////////////////

              //LAYOUT//

///////////////////////////////////////////////////////////////

 var layout1= {
              name: 'circle',
              radius: 500,
             // padding: 100,
              directed: true,
              maximalAdjustments:10,
              fit:true



            };


var layoutcose={
  name: 'cose',

  // Called on `layoutready`
  ready               : function() {},

  // Called on `layoutstop`
  stop                : function() {},

  // Whether to animate while running the layout
  animate             : true,

  // Number of iterations between consecutive screen positions update (0 -> only updated on the end)
  refresh             : 4,

  // Whether to fit the network view after when done
  fit                 : true,

  // Padding on fit
  padding             : 30,

  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox         : undefined,

  // Whether to randomize node positions on the beginning
  randomize           : true,

  // Whether to use the JS console to print debug messages
  debug               : false,

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion       : 400000,

  // Node repulsion (overlapping) multiplier
  nodeOverlap         : 10,

  // Ideal edge (non nested) length
  idealEdgeLength     : 50,

  // Divisor to compute edge forces
  edgeElasticity      : 100,

  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor       : 5,

  // Gravity force (constant)
  gravity             : 250,

  // Maximum number of iterations to perform
  numIter             : 100,

  // Initial temperature (maximum node displacement)
  initialTemp         : 200,

  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor       : 0.95,

  // Lower temperature threshold (below this point the layout will end)
  minTemp             : 1.0
};

///////////////////////////////////////////////////////////////

              //GRAPHE//

///////////////////////////////////////////////////////////////


function Graphe  (Tadjacence,Boriente,root,Sstyle){
        this.adjacence=[];
        this.oriente=Boriente;
        this.style=Sstyle;
        (Tadjacence[0].length == 3) ? this.value=true : this.value= false

        layout1.roots='#'+String(root); //Update Racine//

        this.G = cytoscape({
        container: $('#cy')[0],


                layout: layout1,
                style: style1,
                elements: {
                        nodes:  [],
                        edges: []
                }
        });
        if (!isNaN( Tadjacence[0][0]) ){
              Tadjacence.sort(function(a, b){
              if(parseInt(a[0]) == parseInt(b[0])){
                return (parseInt(a[1]) <parseInt(b[1])) ? -1 : 1
              }
              else return parseInt(a[0]) - parseInt(b[0]);
            });
        }

        else Tadjacence.sort();
        console.log(Tadjacence);
        for (i=0; i < Tadjacence.length;i++){
           var A=Tadjacence[i];
           var A0=String(A[0]);
           var A1=String(A[1]);
          if (this.value) var A2=String(A[2]);

          if((A2 == 'undefined' && this.value) || A0 === 'undefined' || A1 === 'undefined' ) {

                alert("Erreur Node"+ String(i+1));
                return 0;

          }
          else{

            //Create Nodes//
            if(this.G.nodes('[id=\''+A0+'\']').length == 0) {
                this.G.add( { group:"nodes", data: {id: A0 ,degreE:0, degreS: 0, degre:0} } );
                this.adjacence[A0]=[];
               
            }
            if(this.G.nodes('[id=\''+A1+'\']').length == 0) {
                this.G.add( { group:"nodes", data: {id: A1,degreE:0, degreS: 0,degre:0} } );
                this.adjacence[A1]=[];
            }


            //Create arete//

            if (this.value){

              if(this.G.edges('[id=\''+A0+'-'+A1+'\']').length == 0 && Boriente){
                 this.G.add( { group:"edges", data: {id: A0+'-'+A1, source: A0, target:A1,weight: A2} } );
                 this.adjacence[A0].push( {target:A1, weight:A2} );
                 this.G.getElementById(A0).data().degreS +=1;
                 this.G.getElementById(A1).data().degreE +=1;
		          }

              else if(!Boriente && this.G.edges('[id=\''+A1+'-'+A0+'\']').length == 0 && A0 != A1 && this.G.edges('[id=\''+A0+'-'+A1+'\']').length == 0){
                this.adjacence[A1].push( {target:A0, weight:A2} );
                this.G.add( { group:"edges", data: {id: A0+'-'+A1, source: A0, target:A1,weight: A2} } );
                this.adjacence[A0].push( {target:A1, weight:A2} );
                this.G.getElementById(A0).data().degre +=1;
                this.G.getElementById(A1).data().degre +=1;
              } 

            }

            else{

              if(this.G.edges('[id=\''+A0+'-'+A1+'\']').length == 0 && Boriente){

                 this.G.add( { group:"edges", data: {id: A0+'-'+A1, source: A0, target:A1} } );
                 this.adjacence[A0].push( {target:A1} );       
                 this.G.getElementById(A0).data().degreS +=1;
                 this.G.getElementById(A1).data().degreE +=1;
              }

		          else if(!Boriente && this.G.edges('[id=\''+A1+'-'+A0+'\']').length == 0 && A0 != A1 && this.G.edges('[id=\''+A0+'-'+A1+'\']').length == 0){

                this.G.add( { group:"edges", data: {id: A0+'-'+A1, source: A0, target:A1} } );
                this.adjacence[A0].push( {target:A1} );
                this.adjacence[A1].push( {target:A0} );
                this.G.getElementById(A0).data().degre +=1;
                this.G.getElementById(A1).data().degre +=1;
              } 
            }
          }
        }
        this.G.boxSelectionEnabled( true );
        this.G.resize();
}



///////////////////////////////////////////////////////////////

              //Affichage//

///////////////////////////////////////////////////////////////

Graphe.prototype.affiche = function(result) {

  var i;
  for(i = 0; i < result.length; i++ )setTimeout( function(ident,type,G){G.$('#'+ident).addClass(type);},1000*i,result[i].id,result[i].type,this.G);

}


//Tableau associatif de coloration 'color' type de couleur int color[id].couleur //
Graphe.prototype.colorCss = function (color) {

  var myColor = randomColor({
    count: this.G.nodes().length,
    luminosity: 'dark'
  });

  var i;
  //MAJ  css couleur node//
  for(i=0; i < this.G.nodes().length ;i++)    this.G.nodes()[i].css("background-color", myColor[color[this.G.nodes()[i].data().id]]); 

}
///////////////////////////////////////////////////////////////
                  /*ALGO*/

              //PARCOURS//

///////////////////////////////////////////////////////////////



Graphe.prototype.bfs = function (s) {

  var f = [];
  var v =[];
  var p=[];
  var retour=[];
  var i;
  s = String(s);
  for(i=0; i < this.G.nodes().length; i++) v[this.G.nodes()[i].data().id] =  0;

  f.push(s);
  v[s]=1;
  retour.push({id:String(s),type:'nodeVisite'}); //Premier Sommet


  while(f.length>0){

    s=f[0];
    f.shift();

    retour.push({id:s,type:'nodeVisite'});

    for (i=0; i < this.adjacence[s].length; i++){

      //  console.log(this.adjacence[i]); //Debug Log
        var y = this.adjacence[s][i].target;

      if (v[y] == 0){
          v[y] = 1;
          p[y]=s;
          f.push(y);
          if(!this.oriente){
            (this.G.$('#'+y+'-'+s).length > 0) ? retour.push({id:y+'-'+s, type:'edgeVisite'}) : retour.push({id:s+'-'+y, type:'edgeVisite'});
          }            
          else retour.push({id:s+'-'+y, type:'edgeVisite'}); 

      }
      else if (v[y] != 0 && p[s]!=y){

         if(!this.oriente){
            (this.G.$('#'+y+'-'+s).length > 0) ? retour.push({id:y+'-'+s, type:'edgeRevisite'}) : retour.push({id:s+'-'+y, type:'edgeRevisite'});
          }            
          else retour.push({id:s+'-'+y, type:'edgeRevisite'}); 

      }
    }
  }
   return retour;
}




Graphe.prototype.dfs = function(s,v,r,p) {
    
    (v == undefined) ? v= [] : v = v;

    

    s= String(s);
    (r == undefined) ? r = [] : r = r;
    v[s] = 1;
    r.push({id:s,  type:"nodeVisite"});
    (p == undefined) ? p= [] : p = p;

    var i;
    for (i = 0; i < this.adjacence[s].length; i++){

        var y = this.adjacence[s][i].target;
        if(v[y] != 1 ){
          console.log(y);
          if(!this.oriente){
            (this.G.$('#'+y+'-'+s).length > 0) ? r.push({id:y+'-'+s, type:'edgeVisite'}) : r.push({id:s+'-'+y, type:'edgeVisite'});
          }            
          else r.push({id:s+'-'+y, type:'edgeVisite'});  
          p[y]=s;
          this.dfs(y,v,r,p);
        }  
        else{
          if(v[y] == 1 && p[s] != y){
            console.log(y);
            if(!this.oriente){
              (this.G.$('#'+y+'-'+s).length > 0) ? r.push({id:y+'-'+s, type:'edgeRevisite'}) : r.push({id:s+'-'+y, type:'edgeRevisite'});
            }            
            else r.push({id:s+'-'+y, type:'edgeRevisite'});  
          }   
        }
    }
    return r;

}

///////////////////////////////////////////////////////////////
                  /*ALGO*/

              //Arbre Couvrant de Poid minimun//

///////////////////////////////////////////////////////////////
function trieAretePoid(){
    return this.adjacence.sort(function(a,b){
      return(a[2] < b[2]) ?  1:-1;      
    });     
};
Graphe.prototype.kruskal = function(){
  /* body... */
};


///////////////////////////////////////////////////////////////
                  /*ALGO*/

              //COLORATION//

///////////////////////////////////////////////////////////////
Graphe.prototype.colorPerso = function(s) {

	var i;
	s=String(s);
	var color=[];
	var sommetInit;
  var visite =[];
	for(i=0; i < this.G.nodes().length; i++) {
		sommetInit = this.G.nodes()[i].data().id;
		color[sommetInit]=[];
		color[sommetInit].push({id:sommetInit, couleur:0});
    visite[sommetInit]=0;
	}
	var file=[];
	file.push(s);
	while(file.length > 0){

		s=file[0];
		file.shift();

		  for(k=0; k < this.adjacence[s].length; k++){

			var y = this.adjacence[s][k].target;

			if (color[s][0].couleur == color[y][0].couleur){
				color[y][0].couleur = color[y][0].couleur+1;
        visite[y] = 1;
        file.push(y);

			}
      else if (visite[y] == 0){
        visite[y] = 1;
        file.push(y);
      }
		}
	}

	return color;
}

Graphe.prototype.colorNaif = function(step) {

  var color = [];

  for (var i = 0; i < this.G.nodes().length; i++) {

    var sommet = this.G.nodes()[i].data().id;
    color[sommet] = 0;
    var j = 0;
    while (j < this.adjacence[sommet].length ) {

      var voisin = this.adjacence[sommet][j].target;
      if (color[sommet] == color[voisin]) {

        j = 0;
        color[sommet] += 1;

      } else j += 1;
    }
  } return color;
}

Graphe.prototype.clone = function () {

  var retour = [];
  for (var i = 0; i < this.G.nodes().length; i++) {

    retour.push(this.G.nodes()[i].data().id);

  }

  return retour;

}

Graphe.prototype.colorGlouton = function () {

  var retour = [];

  var file = [];
  for (var i = 0; i < this.G.nodes().length; i++) file.push(this.G.nodes()[i].data().id);

  var color = 0;
  while (file.length > 0) {

    var soute = [];
    for (var i = 0; i < file.length; i++)  soute.push(file[i]);

    while (soute.length > 0) {

      var sommet = soute[0];
      soute.shift();
      retour[sommet] = color;
      file.splice(file.indexOf(sommet), 1);

      for (var j = 0; j < this.adjacence[sommet].length; j++) {

        var successeur = this.adjacence[sommet][j].target;
        var indice = soute.indexOf(successeur);

        if (indice != -1) soute.splice(indice, 1);

      }

    }

    color += 1;

  }

  return retour;

}

Graphe.prototype.colorBelugou = function (s) {
  var t=0;
  var couleurPere =[];
  var couleurPereDiff =[];
  for(i=0; i<this.G.nodes().length; i++) {
    couleurPere[this.G.nodes()[i].data().id] = [];
    couleurPereDiff[this.G.nodes()[i].data().id] = 0;
  }

  var color= [];
  var v = 0;
  couleurPere[s].push(-1);

  do{
    var i;
    var max = -1;
    var maxDegre= -1;
    var maxDifference=-1;
    var idmax;

    for(i=0; i < this.G.nodes().length; i++){

      if(couleurPere[this.G.nodes()[i].data().id] != undefined){

        if( (couleurPere[this.G.nodes()[i].data().id].length > max) ||
         (couleurPere[this.G.nodes()[i].data().id].length == max && couleurPereDiff[this.G.nodes()[i].data().id] > maxDifference) ||
         (couleurPere[this.G.nodes()[i].data().id].length == max && couleurPereDiff[this.G.nodes()[i].data().id] == maxDifference && this.G.nodes()[i].data().degre > maxDegre)){

          max = couleurPere[this.G.nodes()[i].data().id].length;
          idmax = this.G.nodes()[i].data().id;
          maxDifference = couleurPereDiff[this.G.nodes()[i].data().id];
          maxDegre = this.G.nodes()[i].data().degre;
          //console.log(couleurPere[this.G.nodes()[i].data().id].length+String(maxDegre) + String(maxDifference));
      
        }
      }
    }

    var colorAssocie = 0;
    for(i = 0; i < couleurPere[idmax].length; i++) {if (couleurPere[idmax].indexOf(colorAssocie) > -1) colorAssocie++;}
   // console.log(couleurPere);
    color[idmax] = colorAssocie;
    delete couleurPere[idmax];

    for(i = 0; i < this.adjacence[idmax].length; i++){
      
        if(couleurPere[this.adjacence[idmax][i].target] != undefined){
              if(couleurPere[this.adjacence[idmax][i].target].indexOf(color[idmax]) == -1) {
                couleurPereDiff[this.adjacence[idmax][i].target] += 1;
              }
              couleurPere[this.adjacence[idmax][i].target].push(color[idmax]);
        }

    }


    v++;
    
    t++;

  }while (v < this.G.nodes().length);
  return color;

}





///////////////////////////////////////////////////////////////
                  /*ALGO*/

                  //TEST//

///////////////////////////////////////////////////////////////





//var parcoursLareur = function(x){
Graphe.prototype.parcoursLargeur = function(x) {

  var result = this.bfs(x);
  this.affiche(result);

}


//Test/



//var monGraphe = new Graphe([['1','2'],['1','3'],['1','4'],['2','6'],['2','3'],['3','8'],['4','5'],['4','9'],['4','10'],['5','10'],['5','6'],['6','7'],['6','10'],['7','10'],['7','8'],['8','10'],['8','9'],['9','10']],false,6);
//var monGraphe = new Graphe([[1,2],[1,3],[1,6],[1,7],[2,3],[2,6],[2,7],[2,5],[3,4],[3,8],[4,8],[4,5],[5,6]],false,6);
var monGraphe = new Graphe([[1,2,6],[1,6,2],[2,3,1],[2,6,4],[3,1,8],[3,4,2],[3,5,0],[4,2,10],[4,5,3],[5,1,4],[6,4,4],[6,5,7]],false,6);
/*var monGraphe = new Graphe([['a','b'],['a','g'],['a','f'],
                            ['b','c'],['b','g'],
                            ['c','g'],['c','d'],
                            ['d','g'],['d','e'],
                            ['e','g'],['e','f'],
                            ['f','g']],false);
/*

grapheAleatoire = function(n){
  var retour=[];
  for(i=0; i<n ;i++){
    var nbarete = Math.floor((Math.random() * (4)) + 1);
    for(j=0; j < nbarete;j++){
      retour.push([i+1,Math.floor((Math.random() * n) + 1)]);
    }
  }
    return retour;
}
//var monGraphe = new Graphe([[1,2],[1,3],[2,4],[2,5],[3,4],[3,6],[4,5],[4,6],[5,6]],false,6);
//var monGraphe = new Graphe(grapheAleatoire(7),false,6);
//monGraphe.parcoursLargeur(1);

//monGraphe.parcoursLargeur(1);




//console.log(window['graphe'+0]);
   
var cpt=0;
var monGraphe = new Graphe(window['graph'+cpt],false);
var c = monGraphe.colorBelugou('1');
monGraphe.colorCss(c);
cpt+=1;
var r=0;
var timer=setInterval("testAlgo()",1000);
//testAlgo();
function testAlgo(){
  if(i==632) clearInterval(timer);
  console.log('graph'+cpt);
   var monGraphe = new Graphe(window['graph'+cpt],false);
   var c = monGraphe.colorBelugou('1');
   monGraphe.colorCss(c);
  
  var j;
  var max = 0;
  for(j=0 ; j< monGraphe.G.nodes().length; j++){
      if(c[monGraphe.G.nodes()[j].data().id] > 3) {
        alert("baizer");
      }
      if(c[monGraphe.G.nodes()[j].data().id] > max) max=c[monGraphe.G.nodes()[j].data().id];

}
  cpt+=1;
  console.log("result:"+max);
}
*/

var i = monGraphe.dfs('1');
monGraphe.affiche(i);

///////////////////////////////////////////////////////////////

              //PARCOURS PROFONDEUR//

///////////////////////////////////////////////////////////////
$('#cy').cyNavigator({
          container: '.cytoscape-navigator',
          viewLiveFramerate: 0,
          thumbnailEventFramerate: 0,
          thumbnailLiveFramerate: false,
          dblClickDelay: 200
})
	window.onresize = function(){
	monGraphe.G.resize();
	monGraphe.G.fit();

}
//});
