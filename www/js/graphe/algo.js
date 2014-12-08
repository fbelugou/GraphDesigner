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
        'font-size':50
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
        'text-outline-width': 2,
        'text-outline-color': '#888',
        'curve-style':'ellipse'
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
              padding: 30,
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

        Tadjacence.sort();
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
                this.G.add( { group:"nodes", data: {id: A0} } );
                this.adjacence[A0]=[];
                console.log(A0);
            }
            if(this.G.nodes('[id=\''+A1+'\']').length == 0) {
                this.G.add( { group:"nodes", data: {id: A1} } );
                this.adjacence[A1]=[];
            }


            //Create arete//

            if (this.value){

             if(this.G.edges('[id=\''+A0+'-'+A1+'\']').length == 0)
                 this.G.add( { group:"edges", data: {id: A0+'-'+A1, source: A0, target:A1,weight: A2} } );
                 this.adjacence[A0].push( {target:A1, weight:A2} );
		 if(!Boriente) this.adjacence[A1].push( {target:A0, weight:A2} );
              }

            else{
              if(this.G.edges('[id=\''+A0+'-'+A1+'\']').length == 0)
                 this.G.add( { group:"edges", data: {id: A0+'-'+A1, source: A0, target:A1} } );
                 this.adjacence[A0].push( {target:A1} );
		 if(!Boriente) this.adjacence[A1].push( {target:A0} );
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
  for(i = 0; i < result.length; i++ )
    setTimeout( function(ident,type,G){ G.$('#'+ident).addClass(type);},1000*i,result[i].id,result[i].type,this.G);

}


///////////////////////////////////////////////////////////////
                  /*ALGO*/

              //PARCOURS LARGEUR//

///////////////////////////////////////////////////////////////



Graphe.prototype.bfs = function (s) {

  var f = [];
  var v =[];
  var retour=[];
  var i;
  s = String(s);
  for(i=0; i < this.G.nodes().length; i++) v[this.G.nodes()[i].data().id] =  0;

  f.push(s);
  v[s]=1;
  retour.push({id:String(s),type:'nodeVisite'}) //Premier Sommet


  while(f.length>0){

    s=f[0];
    f.shift();

    retour.push({id:s,type:'nodeVisite'});

    for (i=0; i < this.adjacence[s].length; i++){

      //  console.log(this.adjacence[i]); //Debug Log
        var y = this.adjacence[s][i].target;

      if (v[y] == 0){
          v[y] = 1;

          f.push(y);
          retour.push({id:s+'-'+y, type:'edgeVisite'});

      }
      else if (v[y] != 0){

         retour.push({id:s+'-'+y, type:'edgeRevisite'});

      }
    }
  }
   return retour;
}



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
		console.log(s);

		  for(k=0; k < this.adjacence[s].length; k++){

			var y = this.adjacence[s][k].target;

			if (color[s][0].couleur == color[y][0].couleur){
				color[y][0].couleur = color[y][0].couleur+1;
        console.log(y);
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

Graphe.prototype.colorNaif = function() {

  var color = [];

  for (var i = 0; i < this.G.nodes().length; i++) {

    var sommet = this.G.nodes()[i].data().id;
    color[sommet] = 0;
    var j = 0;
    while (j < this.adjacence[sommet].length) {

      var voisin = this.adjacence[sommet][j].target;
      if (voisin in color && color[sommet] == color[voisin]) {

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

Graphe.prototype.colorFabien = function (s,step) {
  var t=0;
  var couleurPere =[];
  for(i=0; i<this.G.nodes().length; i++) couleurPere[this.G.nodes()[i].data().id] = [];
  var color= [];
  var v = 0;
  couleurPere[s].push(-1);
  do{
    var i;
    var max = -1;
    var idmax;
    for(i=0; i<this.G.nodes().length; i++){

      if(couleurPere[this.G.nodes()[i].data().id] != undefined){

        if(couleurPere[this.G.nodes()[i].data().id].length > max){

          max = couleurPere[this.G.nodes()[i].data().id].length;
          idmax = this.G.nodes()[i].data().id;

      
        }
      }
    }

    var colorAssocie = 0;
    for(i=0; i < couleurPere[idmax].length; i++) {if (couleurPere[idmax].indexOf(colorAssocie) > -1) colorAssocie++;}
    console.log(couleurPere);
    color[idmax]=colorAssocie;
    delete couleurPere[idmax];

    for(i=0; i < this.adjacence[idmax].length; i++){
      
        if(couleurPere[this.adjacence[idmax][i].target] != undefined)
              couleurPere[this.adjacence[idmax][i].target].push(color[idmax]);
    }


    v++;
    
    t++;


  }while (v < this.G.nodes().length && t < step);
  return color;

}


//Tableau associatif de coloration 'color' type de couleur int color[id].couleur //
Graphe.prototype.colorationParseCss = function (color) {

	var myColor = randomColor({count: this.G.nodes().length});

  var i;
  for(i=0; i < this.G.nodes().length ;i++)    this.G.nodes()[i].css("background-color", myColor[color[this.G.nodes()[i].data().id]]);

	//MAJ  css couleur node//

}





//var parcoursLareur = function(x){
Graphe.prototype.parcoursLargeur = function(x) {

  var result = this.bfs(x);
  this.affiche(result);

}


//Test/



var monGraphe = new Graphe([[1,2],[1,3],[1,4],[2,6],[2,3],[3,8],[4,5],[4,9],[4,10],[5,10],[5,6],[6,7],[6,10],[7,10],[7,8],[8,10],[8,9],[9,10]],false,6);


//monGraphe.parcoursLargeur(1);

//monGraphe.parcoursLargeur(1);


///////////////////////////////////////////////////////////////

              //PARCOURS PROFONDEUR//

///////////////////////////////////////////////////////////////
$('#cy').cyNavigator({

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
