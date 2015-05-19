// $(document).ready(function(){

///////////////////////////////////////////////////////////////

              //STYLE//

///////////////////////////////////////////////////////////////

var IN_PRESENT = false;

var fil = Array();
var EXPORT_MODE = false;

var EScreenMode = {VIEWER:0, DESIGNER: 1, GAME:2};
var S_MODE = EScreenMode.VIEWER;

var EStepMode = {CONTINUE:0, BREAK: 1, FIN:2};
var V_MODE = {mode:EStepMode.CONTINUE, index:0};

var PALETTE = ["red", "blue", "green", "yellow", "white", "purple"];

//Style pour graphe oriente
var style1 = cytoscape.stylesheet()
    .selector(':selected')
      .css({
        'border-width':40
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
        'font-weight' : 'bold',
        'transition-property': 'border-width',
        'transition-duration': '0.5s',
        'border-color': '#888'
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
       'border-color': '#61bffc',
       'border-width':40,
       'target-arrow-color': '#4e859c',
       'transition-property': 'background-color, line-color, target-arrow-color',
       'transition-duration': '0.5s'
     })
      .selector('.label')
      .css({
        'text-outline-color': '#61bffc',
        'background-color': '#61bffc',
        'line-color': '#1c1c1c',
        'target-arrow-color': '#1c1c1c',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s',
        'curve-style': 'ellipse'
      })
      .selector('#illustration')
      .css({
        'line-color': 'red',
        'target-arrow-color': 'red',
        'target-arrow-shape':'triangle',
        'curve-style': 'ellipse'
      });

//Style pour graphe non oriente//
var style2 = cytoscape.stylesheet()

    .selector('node:selected')
    .css({
      'border-width':40
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
        'font-weight' : 'bold',
        'transition-property': 'border-width',
        'transition-duration': '0.5s',
        'border-color': '#888'
      })
    .selector('edge')
      .css({
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
        'text-outline-color': '#488b4d',
        'background-color': '#488b4d',
        'line-color': '#488b4d',
        'target-arrow-color': '#488b4d',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s',
        'line-style':'dashed',
        'curve-style':'ellipse'
      })
     .selector('.edgeVisite')
      .css({

        'text-outline-color': '#4e859c',
        'background-color': '#4e859c',
        'line-color': '#4e859c',
        'target-arrow-color': '#4e859c',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s',
        'curve-style':'ellipse'
      })
      .selector('.edgeFail')
      .css({

        'text-outline-color': '#8c4c4c',
        'background-color': '#8c4c4c',
        'line-color': '#8c4c4c',
        'target-arrow-color': '#8c4c4c',
        'transition-property': 'background-color, line-color, target-arrow-color, width',
        'transition-duration': '0.5s'
      })
      .selector('.edgeCorrect')
      .css({

        'text-outline-color': '#488b4d',
        'background-color': '#488b4d',
        'line-color': '#488b4d',
        'target-arrow-color': '#488b4d',
        'transition-property': 'background-color, line-color, target-arrow-color, width',
        'transition-duration': '0.5s'
      })
      .selector('.edgeNone')
      .css({

        'visibility': 'hidden',
        'transition-property': 'background-color, line-color, target-arrow-color, width',
        'transition-duration': '0.5s'
      })
      .selector('.nodeVisite')
      .css({

        'text-outline-color': '#4e859c',
        'background-color': '#4e859c',
        'line-color': '#4e859c',
        'target-arrow-color': '#4e859c',
        'transition-property': 'background-color, line-color, border-width, target-arrow-color, width',
        'transition-duration': '0.5s'
      })
       .selector('.nodeVisite:selected')
      .css({
        'border-color': '#4e859c',
        'border-width':40,
        'target-arrow-color': '#4e859c',
        'transition-property': 'border-width, background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      })
      .selector('.label')
      .css({
        'text-outline-color': '#61bffc',
        'background-color': '#61bffc',
        'line-color': '#1c1c1c',
        'target-arrow-color': '#1c1c1c',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s',
        'curve-style': 'ellipse'
      })
      .selector('#illustration')
      .css({
        'line-color': 'red',
        'target-arrow-color': 'red',
        'target-arrow-shape':'triangle',
        'curve-style': 'unbundled-bezier',
        'control-point-distance': '100px'
      });

///////////////////////////////////////////////////////////////

              //LAYOUT//

///////////////////////////////////////////////////////////////

 var layout1= {
              name: 'circle',
              sort: function(a,b) { return a.data().id - b.data().id },
              radius: 500,
              positions: undefined,
             // padding: 100,
              directed: true,
              maximalAdjustments:10,
              fit:true,
              padding:100
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
  padding             : 100,

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


function Graphe (Tadjacence,Boriente, lastPos, layout) {

        this.copyForClone = {adjacence:Tadjacence.slice(), oriente:Boriente};

        if (lastPos != undefined) this.nodePositions = lastPos.slice();
        else this.nodePositions = Array(); 

        this.adjacence=[];
        this.oriente=Boriente;

        $("#bOriente").prop("checked", Boriente);

        this.value= false;
        for (var i = 0; i < Tadjacence.length; i++) this.value = this.value || (Tadjacence.length > 0 && Tadjacence[i].length == 3);
        $("#bValue").prop("checked", this.value);

        var that = this;
        if(Boriente){
        this.G = cytoscape({
          container: $('#cy')[0],


                  layout: layout1,
                  style: style1,
                  elements: {
                          nodes:  [],
                          edges: []
                  },
                  selectionType: 'additive',
                  ready: function() {

                    if (that.nodePositions.length > 0) {
                      for (var i = 0; i < that.nodePositions.length; i++) monGraphe.G.$("#" + that.nodePositions[i].id).position(that.nodePositions[i].pos);
                    }

                  }
          });
        }
        else{
          this.G = cytoscape({
            container: $('#cy')[0],


                    layout: layout1,
                    style: style2,
                    elements: {
                            nodes:  [],
                            edges: []
                    },
                    selectionType: 'additive',
                    ready: function() {

                    if (that.nodePositions.length > 0) {
                      for (var i = 0; i < that.nodePositions.length; i++) monGraphe.G.$("#" + that.nodePositions[i].id).position(that.nodePositions[i].pos);
                    }

                  }
            });
        }
        if (Tadjacence.length > 0 && !isNaN( Tadjacence[0][0]) ){
              Tadjacence.sort(function(a, b){
              if(parseInt(a[0]) == parseInt(b[0])){
                return (parseInt(a[1]) <parseInt(b[1])) ? -1 : 1
              }
              else return parseInt(a[0]) - parseInt(b[0]);
            });
        }

        else Tadjacence.sort();
        for (i=0; i < Tadjacence.length;i++){
           var A=Tadjacence[i];
           var A0=String(A[0]);
           var A1=String(A[1]);
          if (this.value) var A2=A[2];

          if((A2 == 'undefined' && this.value) || A0 === 'undefined' /* || A1 === 'undefined' */ ) {

            alert("Erreur Node"+ String(i+1));
            return 0;

          }
          else if (A1 === 'undefined') {

            //Create Nodes//
            if(this.G.nodes('[id=\''+A0+'\']').length == 0) {
                this.G.add( { group:"nodes", data: {id: A0 ,degreE:0, degreS: 0, degre:0, info:""} } );
                this.adjacence[A0]=[];

            }

          }
          else{

            //Create Nodes//
            if(this.G.nodes('[id=\''+A0+'\']').length == 0) {
                this.G.add( { group:"nodes", data: {id: A0 ,degreE:0, degreS: 0, degre:0, info:""} } );
                this.adjacence[A0]=[];

            }
            if(this.G.nodes('[id=\''+A1+'\']').length == 0) {
                this.G.add( { group:"nodes", data: {id: A1,degreE:0, degreS: 0,degre:0, info:""} } );
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

        for(var i = 0; i < this.G.nodes().length; i++) {

          var graphe = this.G;
          this.G.nodes()[i].qtip({

              content: {
                text: function(event, api) { return this.data().info; }
              },
              position: {
                my: 'bottom left',
                at: 'top center'
              },
              style: {
                classes: 'qtip-bootstrap',
                tip: {
                  width: 16,
                  height: 8
                }
              },
              show: {event: 'qshow'},
              hide: {event: 'qhide'}

          });

        }

        // Informations
        this.general = $("#panel-right-editor #general-form");
        this.currentSelection = $("#panel-right-editor #selection-form");

        this.constructInfo();

        var that = this;
        this.G.on( "touchend mouseup ", function (e) {

          that.nodePositions = Array();
          for (var i = 0; i < that.G.nodes().length; i++)
            that.nodePositions.push({id:that.G.nodes()[i].data().id, pos:that.G.nodes()[i].position()});

          if (e.cyTarget.group != undefined && e.cyTarget.group() == "nodes") {

            var nodeSelected = Array();
            monGraphe.G.nodes().each(function () {

              if (this.selected()) nodeSelected.push(this);

            });

            console.log($.inArray(e.cyTarget, nodeSelected));
            if ($.inArray(e.cyTarget, nodeSelected) > -1) {

              nodeSelected.splice( $.inArray(e.cyTarget, nodeSelected), 1 );
              monGraphe.constructInfo(nodeSelected);

            } else {

              nodeSelected.push(e.cyTarget);
              monGraphe.constructInfo(nodeSelected);

            }

          } else {

            monGraphe.G.nodes().each(function () {

              if (this.selected()) this.unselect();

            });
            monGraphe.constructInfo();

          }

          if (monGraphe.IsPlanaire()) {

            $("#panel-right-game #reponse").html("Le graphe est planaire");
            $("#panel-right-game #recap-game").css({'background-color': 'green'});

          } else {

            $("#panel-right-game #reponse").html("Rendre le graphe planaire");
            $("#panel-right-game #recap-game").css({'background-color': '#333'});
          }

        });

}

///////////////////////////////////////////////////////////////

              //Affichage//

///////////////////////////////////////////////////////////////

Graphe.prototype.affiche = function(result) {

  var i;
  this.createNotification("",'Sommet actif ' +result[0].id);
  this.createNotification("Default",'Visite du sommet ' +result[0].id);

  for(i = 0; i < result.length; i++ ){

      var noeudActif;
      if(result[i].type == "nodeVisite" )  noeudActif = result[i].id;

      fil.push(setTimeout( function(ident,type,G,cl,noeudActif,i){
      if(type == "nodeVisite" && i != 0) cl.createNotification("",'Sommet actif ' +ident);
      if(type == "edgeVisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Default",'Visite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Default",'Visite du sommet ' +ident.replace('-'+noeudActif,''));
      }

      else if(type == "edgeRevisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace('-'+noeudActif,''));
      }
      G.$('#'+ident).addClass(type);
      setTimeout(function(s){ s.refresh(); },1000,scrollPanelLeft);

      },3000*i,result[i].id,result[i].type,this.G,this,noeudActif,i));
      console.log(result);
    }

  }


Graphe.prototype.clearGraphe = function () {

  var i; 
  for (i = 0; i < this.G.edges().length; i++) {

    this.G.edges()[i].removeClass("edgeVisite");
    this.G.edges()[i].removeClass("edgeFail");
    this.G.edges()[i].removeClass("edgeCorrect");
    this.G.edges()[i].removeClass("edgeNone");
    this.G.edges()[i].removeClass("edgeRevisite");

    this.G.edges()[i].css("line-color", "#888");
  }

  this.G.$("#illustration").remove();
  for(i = 0; i < this.G.nodes().length; i++) {

    this.G.nodes()[i].removeClass("nodeVisite");
    this.G.$("#" + this.G.nodes()[i].data().id ).trigger("qhide");

    this.G.nodes()[i].css("background-color", "#888");

  }

  clearNotif();
  for (var i = 0; i < fil.length; i++) clearInterval(fil[i]);
  fil = Array();

}

Graphe.prototype.showInfoOf = function(ident, txt) {

  if (txt == undefined) txt = String(ident);
  this.G.$("#"+String(ident)).data().info = txt;

}

Graphe.prototype.hideInfoOf = function(ident) { this.G.$("#"+String(ident)).trigger("qhide"); }

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

Graphe.prototype.afficheDijkstra = function(result) {

  for (var i = 0; i < result.length; i++) {

    fil.push(setTimeout(

      function(ident, type, Gr, source, str) {

        if (type == 1) {

          Gr.G.$("#" + ident).addClass("nodeVisite");
          Gr.createNotification("Default",'Sommet actif ' + ident);
          Gr.G.$("#illustration").remove();

        }
        else if (type == 2) {

          if (Gr.G.$("#illustration")) Gr.G.$("#illustration").remove();
          Gr.G.add({ group:"edges", data: {id: 'illustration', source: source, target: ident}});
          Gr.createNotification("",'Visite du sommet ' + ident);

        }
        else if (type == 3) {

          /* if (Gr.G.$("#label" + ident)) Gr.G.$("#label" + ident).remove();
          Gr.G.add({ group:"edges", data: {id: 'label' + ident, source: ident, target: ident, weight: str}});
          Gr.G.$("#label" + ident).addClass("label"); */

          Gr.showInfoOf(ident, str);
          Gr.createNotification("Revisite","Calcul de la distance<br>" + str);

        } Gr.G.$("").each(function () { if (this.data().info != "") this.trigger("qshow"); } );

        setTimeout(function(s){ s.refresh(); },3000,scrollPanelLeft);

      },
      3000 * i,
      result[i][0],
      result[i].length,
      this,
      result[i][1],
      result[i][2]

    ));

  }

  IN_PRESENT = true;
  setTimeout(function() { IN_PRESENT = false; }, result.length * 500);

}

Graphe.prototype.afficheKruskal = function(result) {

  for (var i = 0; i < result.length; i++) {

    fil.push(setTimeout(

      function(ident, color, Gr) {

        Gr.G.$("#"+ident).removeClass("edgeVisite");
        Gr.G.$("#"+ident).removeClass("edgeFail");
        Gr.G.$("#"+ident).removeClass("edgeCorrect");
        Gr.G.$("#"+ident).removeClass("edgeNone");

        Gr.G.$("#"+ident).addClass(color);

        if (color == "edgeVisite") Gr.createNotification("Visite", "Test de l'arrête "+ident);
        else if (color == "edgeFail") Gr.createNotification("Fail", "Cycle detecté");
        else if (color == "edgeCorrect") Gr.createNotification("Correct", "Aucun cycle detecté")
        else if (color == "edgeNone") Gr.createNotification("None", "Arrête supprimée");

        setTimeout(function(s){ s.refresh(); },3000,scrollPanelLeft);

      },
      3000 * i,
      result[i].id,
      result[i].color,
      this

    ));

  }

}
//Tableau associatif de coloration 'color' type de couleur int color[id].couleur //
Graphe.prototype.colorCssNaif = function (color) {

  /*var myColor = randomColor({
    count: this.G.nodes().length,
    luminosity: 'dark'
  });*/

  var i;
  //MAJ  css couleur node//
  for(i=0; i < color.length ;i++) {

    fil.push(setTimeout(function (Gr, id, result, obj) {

      if (result[id].type == 0) {

        obj.createNotification("Correct", "Sommet actif " + result[id].ident);
        Gr.$("#" + result[id].ident).select();
        setTimeout(function (g, i) { g.$("#" + i).unselect() }, 500, Gr, result[id].ident);      

      } else if (result[id].type == 1) {

        Gr.$("#"+result[id].ident).css("background-color", PALETTE[result[id].color]);
        obj.createNotification("Visite", "Coloration du sommet " + result[id].ident);

      } else if (result[id].type == 2) {

        obj.createNotification("None", "Test du voisin " + result[id].ident);
        Gr.$("#" + result[id].ident).select();
        setTimeout(function (g, i) { g.$("#" + i).unselect() }, 500, Gr, result[id].ident); 

      } else if (result[id].type == 3) {

        obj.createNotification("Fail", "Voisin de meme couleur"); 

      }
      

    }, 2000 * i, this.G, i, color, this));


    // this.G.nodes()[i].css("background-color", myColor[color[this.G.nodes()[i].data().id]]);

  }

}
Graphe.prototype.colorCssGlouton = function (color) {

  var i;
  //MAJ  css couleur node//
  for(i=0; i < color.length ;i++) {

    fil.push(setTimeout(function (Gr, id, result, obj) {

      if (result[id].type == 0) {

        obj.createNotification("None", "Test des sommets restants");
        console.log(result[id].reste);

        for (var i = 0; i < result[id].reste.length; i++) Gr.$("#" + result[id].reste[i]).select();
        setTimeout(function (g, i) { 

          for (var j = 0; j < i.length; j++) g.$("#" + i[j]).unselect();

        }, 500, Gr, result[id].reste);     

      } else if (result[id].type == 1) {

        Gr.$("#"+result[id].node).css("background-color", PALETTE[result[id].color]);
        obj.createNotification("Visite", "Sommet en cours " + result[id].node);

      } else if (result[id].type == 2) {

        obj.createNotification("Fail", "Exclusion du voisin " + result[id].node);
        Gr.$("#" + result[id].node).select();
        setTimeout(function (g, i) { g.$("#" + i).unselect() }, 500, Gr, result[id].node); 

      }
      

    }, 2000 * i, this.G, i, color, this));


    // this.G.nodes()[i].css("background-color", myColor[color[this.G.nodes()[i].data().id]]);

  }

}

/* Graphe.prototype.afficheDijkstra = function(result) {

  for (var i = 0; i < result.length; i++) {

    setTimeout(

      function(ident, type, G, source, str) {

        if (type == 1) G.$("#" + ident).addClass("nodeVisite");
        else if (type == 2) {

          if (G.$("#illustration")) G.$("#illustration").remove();
          G.add({ group:"edges", data: {id: 'illustration', source: source, target: ident}});

        }
        else if (type == 3) {

          if (G.$("#label" + ident)) G.$("#label" + ident).remove();
          G.add({ group:"edges", data: {id: 'label' + ident, source: ident, target: ident, weight: str}});
          G.$("#label" + ident).addClass("label");

        }

      },
      2000 * i,
      result[i][0],
      result[i].length,
      this.G,
      result[i][1],
      result[i][2]

    );

  }
  this.createNotification("",'Sommet actif ' +result[0].id);
  this.createNotification("Default",'Visite du sommet ' +result[0].id);

  for(i = 0; i < result.length; i++ ){

      var noeudActif;
      if(result[i].type == "nodeVisite" )  noeudActif = result[i].id;

      setTimeout( function(ident,type,G,cl,noeudActif,i){
      if(type == "nodeVisite" && i != 0) cl.createNotification("",'Sommet actif ' +ident);
      if(type == "edgeVisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Default",'Visite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Default",'Visite du sommet ' +ident.replace('-'+noeudActif,''));
      }

      else if(type == "edgeRevisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace('-'+noeudActif,''));
      }
      G.$('#'+ident).addClass(type);
      setTimeout(function(s){ s.refresh(); },1000,scrollPanelLeft);

      },3000*i,result[i].id,result[i].type,this.G,this,noeudActif,i);
      console.log(result);
    }

} */

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



Graphe.prototype.createNotification = function(type,t,a){
  var contentNotif ;
  (a != undefined) ? contentNotif= '<li><div class="notifications animated fadeInDown"><div class="notif notif'+type+'"><div class="head">'+t+'</div><div class="text">'+a+'</div></div></div></li>' :  contentNotif = '<li><div class="notifications animated fadeInDown "><div class="notif notif'+type+'"><div class="head">'+t+'</div><div class="text"></div></div></div></li>'
  $(contentNotif).prependTo('#log-panel>#wrapper>#scroller> ul').hide().slideDown(1000);
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
        if(v[y] != 1){
          console.log(y);
          if(!this.oriente){
            (this.G.$('#'+y+'-'+s).length > 0) ? r.push({id:y+'-'+s, type:'edgeVisite'}) : r.push({id:s+'-'+y, type:'edgeVisite'});
          }
          else r.push({id:s+'-'+y, type:'edgeVisite'});
          p[y]=s;
          this.dfs(y,v,r,p);
          r.push({id:s,  type:"nodeVisite"});
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

// Neccessite connexité et non orienté
Graphe.prototype.Kruskal = function(){

  var retour = [];

  // Liste d'adgacence
  var adj = [];
  var i;
  for (i = 0; i < this.G.nodes().length; i++) adj[this.G.nodes()[i].data().id] = [];

  
  
  // Construction de la liste d'arrete
  var listOfEdges = [];
  this.G.edges().each(function () { listOfEdges.push({id: this.data().id, weight: this.data().weight}); });

  // Tri par ordre croissant
  listOfEdges.sort(function (a, b) {

    if (a.weight > b.weight) return 1;
    if (a.weight < b.weight) return -1;
    return 0;

  });

  // Liste des sommets visites
  /* var listOfNodes = new Array();
  var nbVisite = 0;
  this.G.nodes().each(function() { listOfNodes[this.data().id] = 0; }); */

  for (i = 0; i < listOfEdges.length; i += 1) {

    // Prendre les deux sommets de l'arrete
    var str = listOfEdges[i].id.match(/([a-zA-Z0-9]+)\-([a-zA-Z0-9]+)/);
    var x = str[1];
    var y = str[2];

    // Copie de la liste plus les deux candidats    
    var copyAdj = [];
    var j;
    for (j = 0; j < this.G.nodes().length; j++) {

      var k;
      copyAdj[this.G.nodes()[j].data().id] = [];
      for (k = 0; k < adj[this.G.nodes()[j].data().id].length; k++) {

        copyAdj[this.G.nodes()[j].data().id].push(adj[this.G.nodes()[j].data().id][k]);

      }

    }
    copyAdj[x].push(y);
    if (!this.oriente) copyAdj[y].push(x);

    // Affichage
    retour.push({id:str[0], color:"edgeVisite"});

    // Verification du cycle
    var test = this.IsCyclique(copyAdj, x);
    if (!test) {

      retour.push({id:str[0], color:"edgeCorrect"});
      adj[x].push(y);
      if (!this.oriente) adj[y].push(x);

    } else {

      retour.push({id:str[0], color:"edgeFail"});
      retour.push({id:str[0], color:"edgeNone"});

    }


  }

  return retour;

};

Graphe.prototype.IsCyclique = function (l, s, v, p) {

  

  (v == undefined) ? v= [] : v = v;

  s= String(s);
  v[s] = 1;
  (p == undefined) ? p= [] : p = p;

  var i;
  for (i = 0; i < l[s].length; i++){

      var y = l[s][i];
      if(v[y] != 1){
        p[y]=s;
        if (this.IsCyclique(l,y,v,p)) return true;
      }
      else{
        if(v[y] == 1 && p[s] != y){
          return true;
        }
      }
  }
  return false;

}

Graphe.prototype.IsPlanaire = function () {

  for (var i = 0; i < monGraphe.G.edges().length; i++) {
    for (var j = i + 1; j < monGraphe.G.edges().length; j++) {

      var p0 = monGraphe.G.edges()[i].source().position();
      var p1 = monGraphe.G.edges()[i].target().position();

      var p2 = monGraphe.G.edges()[j].source().position();
      var p3 = monGraphe.G.edges()[j].target().position();

      var s1_x; var s1_y; var s2_x; var s2_y;
      s1_x = p1.x - p0.x;         s1_y = p1.y - p0.y;
      s2_x = p3.x - p2.x;         s2_y = p3.y - p2.y;

      var s; var t;
      s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
      t = ( s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);

      var b1 = monGraphe.G.edges()[i].source().id();
      var b2 = monGraphe.G.edges()[j].source().id();

      var t1 = monGraphe.G.edges()[i].target().id();
      var t2 = monGraphe.G.edges()[j].target().id();

      if (s > 0 && s < 1 && t > 0 && t < 1 && b1 != b2 && t1 != t2) return false;

    }
  }

  return true;

}

///////////////////////////////////////////////////////////////
                  /*ALGO*/

              //CHEMINS//

///////////////////////////////////////////////////////////////


// Neccessite des poids positifs et connexe
Graphe.prototype.Dijkstra = function(n) {

  // Retour
  var retour = new Array();

  // Initialisation du sommet de depart
  if (n == undefined) n = this.G.nodes()[0];
  else n = this.G.nodes()[n - 1];

  var x = n.data().id;

  // Initialisation du nombre de sommets
  var nbSommet = this.G.nodes().length;

  // Initialisation de la file d'attente
  var file = new Array();
  file.push(x);

  // Initiatilisation du tableau des distances
  var dist = new Array();
  for (var i = 0; i < nbSommet; i++) {

    if (this.G.nodes()[i].data().id == x) dist[x] = 0;
    else dist[this.G.nodes()[i].data().id] = undefined; // Pour l'infini

  }
  while (file.length > 0) {

    x = file.shift(); // Tete
    retour.push([String(x)]);

    for (var i = 0; i < this.adjacence[x].length; i++) {

      var y = this.adjacence[x][i].target;

      retour.push([String(y), String(x)]);

      var poids = dist[y];
      var poidsEnCours = dist[x] + this.adjacence[x][i].weight;

      if (poids == undefined || poids > poidsEnCours) {

        if (poids > poidsEnCours)
        retour.push([String(y), String(x), String(poids) + " > " + String(dist[x]) + " + " + String(this.adjacence[x][i].weight)]);

        dist[y] = poidsEnCours;
        file.push(y);

        retour.push([String(y), String(x), String(poidsEnCours)]);

      }

    }

  }

  return retour;

}

///////////////////////////////////////////////////////////////
                  /*ALGO*/

              //COLORATION//

///////////////////////////////////////////////////////////////
/* Graphe.prototype.colorPerso = function(s) {

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
} */

Graphe.prototype.colorNaif = function(step) {

  var color = [];
  for (var i = 0; i < this.G.nodes().length; i++)
    color[this.G.nodes()[i].data().id] = 99999999;
  var retour = Array();

  for (var i = 0; i < this.G.nodes().length; i++) {

    retour.push({ident: this.G.nodes()[i].data().id, type:0});

    var sommet = this.G.nodes()[i].data().id;
    color[sommet] = 0;
    retour.push({ident: this.G.nodes()[i].data().id, type:1, color:0});

    var j = 0;
    while (j < this.adjacence[sommet].length ) {

      var voisin = this.adjacence[sommet][j].target;
      retour.push({ident: voisin, type:2});

      if (color[sommet] == color[voisin]) {

        j = 0;
        retour.push({ident: voisin, type:3});
        color[sommet] += 1;
        retour.push({ident: sommet, type:1, color:color[sommet]});

      } else {

        j += 1;

      }
    }
  } return retour;
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
  var mesages = Array();

  var file = [];
  for (var i = 0; i < this.G.nodes().length; i++) file.push(this.G.nodes()[i].data().id);

  var color = 0;
  while (file.length > 0) {

    var soute = [];
    for (var i = 0; i < file.length; i++)  soute.push(file[i]);

    mesages.push({reste: soute.slice(), type:0});

    while (soute.length > 0) {

      var sommet = soute[0];
      soute.shift();
      retour[sommet] = color;
      file.splice(file.indexOf(sommet), 1);

      mesages.push({node:sommet, type:1, color:retour[sommet]});

      for (var j = 0; j < this.adjacence[sommet].length; j++) {

        var successeur = this.adjacence[sommet][j].target;
        if (soute.indexOf(successeur) != -1) mesages.push({node:successeur, type:2});
        var indice = soute.indexOf(successeur);

        if (indice != -1) soute.splice(indice, 1);

      }

    }

    color += 1;

  }

  return mesages;

}

Graphe.prototype.constructInfo = function (nodeSelected) {

  this.general.find("#nbSommets").val(this.G.nodes().length);

  var strSelection = "";

  if (nodeSelected == undefined || nodeSelected.length < 1) strSelection += "<div style=\"font-size:12px;text-align:center;margin-top:4%\">Aucune sélection</div>";
  else {

    strSelection += "<div>";

    if (nodeSelected.length == 1) {

      strSelection += "<div class=\"head-node\">Sommet " + nodeSelected[0].id() + "</div>";

      strSelection += "<div class=\"node-content\">";
      if (this.oriente) {

        strSelection += "degrés entrant " + monGraphe.G.$("#" + nodeSelected[0].id()).data().degreE;
        if (monGraphe.G.$("#" + nodeSelected[0].id()).data().degreE > 0) {

          strSelection += "<button style=\"float:right\" id=\"btnRemoveDegE_" + nodeSelected[0].id() + "\">supprimer</button>";
          strSelection += "<script>$(\"#btnRemoveDegE_" + nodeSelected[0].id() + "\").on( \"touchend mouseup\", function (e) { removeDegE(" + nodeSelected[0].id() + "); });</script>";

        }
        strSelection += "<br><br>degrés sortant " + monGraphe.G.$("#" + nodeSelected[0].id()).data().degreS;
        if (monGraphe.G.$("#" + nodeSelected[0].id()).data().degreS > 0) {

          strSelection += "<button style=\"float:right\" id=\"btnRemoveDegS_" + nodeSelected[0].id() + "\">supprimer</button>";
          strSelection += "<script>$(\"#btnRemoveDegS_" + nodeSelected[0].id() + "\").on( \"touchend mouseup\", function (e) { removeDegS(" + nodeSelected[0].id() + "); });</script>";

        }
      } else {

        strSelection += "degrés " + monGraphe.G.$("#" + nodeSelected[0].id()).data().degre;
        strSelection += "<button style=\"float:right\" id=\"btnRemoveDeg_" + nodeSelected[0].id() + "\">supprimer</button>";
        strSelection += "<script>$(\"#btnRemoveDeg_" + nodeSelected[0].id() + "\").on( \"touchend mouseup\", function (e) { removeDeg(" + nodeSelected[0].id() + "); });</script>";

      }
      strSelection += "</div>";
    } else {

      strSelection += "<div class=\"head-node\">Sommets ";
      for (var i = 0; i < nodeSelected.length; i += 1) {

        strSelection += String(nodeSelected[i].id());
        if (i + 1 < nodeSelected.length) strSelection += " - ";

      } strSelection += "<button style=\"float:right\" id=\"addAllEdges\">lier</button><button style=\"float:right\" id=\"removeAllEdges\">délier</button></div>";
      strSelection += "<script>$(\"#addAllEdges\").on( \"touchend mouseup\", function (e) { linkNodes([";

        for (var i = 0; i < nodeSelected.length; i++) {

          strSelection += nodeSelected[i].id();
          if (i + 1 < nodeSelected.length) strSelection += ",";
          else strSelection += "]";

        }
      strSelection += "); });";
      strSelection += "$(\"#removeAllEdges\").on( \"touchend mouseup\", function (e) { unlinkNodes([";

        for (var i = 0; i < nodeSelected.length; i++) {

          strSelection += nodeSelected[i].id();
          if (i + 1 < nodeSelected.length) strSelection += ",";
          else strSelection += "]";

        }
      strSelection += "); });"
      strSelection += "</script>";


      strSelection += "<div class=\"node-content\">";
      var weight;
      if (nodeSelected.length == 2 && this.oriente) {

        strSelection += "lien de " + nodeSelected[0].id() + " vers " + nodeSelected[1].id() + " ";
        if (this.G.$("#" + nodeSelected[0].id() + '-' + nodeSelected[1].id()).length > 0) weight = this.G.$("#" + nodeSelected[0].id() + '-' + nodeSelected[1].id()).data().weight;
        else weight = 0;

        if (this.G.$("#" + nodeSelected[0].id() + "-" + nodeSelected[1].id()).length > 0) {

          strSelection += '<label class="input-control text">- poid <input id="currentWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '" value="' + weight + '" type="number"/>'
                    + '<div class="button-group"><button id="btnChangeWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '">ok</button>'
                    + '<script>$(\"#btnChangeWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '").on( \"touchend mouseup\", function (e) { changeWeight(' + nodeSelected[0].id() + ', ' + nodeSelected[1].id() + ', true, $("#currentWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '").val()); });</script>';

          strSelection += "<button style=\"float:right\" id=\"removeEdge_" + nodeSelected[0].id() + "-" + nodeSelected[1].id() + "\">supprimer</button>";
          strSelection += "<script>$(\"#removeEdge_" + nodeSelected[0].id() + "-" + nodeSelected[1].id() + "\").on( \"touchend mouseup\", function (e) { removeEdge(" + nodeSelected[0].id() + ", " + nodeSelected[1].id() + "); });</script>";

        } else {

          strSelection += "<button style=\"float:right\" id=\"addEdge_" + nodeSelected[0].id() + "-" + nodeSelected[1].id() + "\">ajouter</button>";
          strSelection += "<script>$(\"#addEdge_" + nodeSelected[0].id() + "-" + nodeSelected[1].id() + "\").on( \"touchend mouseup\", function (e) { addEdge(" + nodeSelected[0].id() + ", " + nodeSelected[1].id() + "); });</script>";

        }
        if (this.G.$("#" + nodeSelected[1].id() + '-' + nodeSelected[0].id()).length > 0) weight = this.G.$("#" + nodeSelected[1].id() + '-' + nodeSelected[0].id()).data().weight; 
        else weight = 0;
        strSelection += "<br><br>lien de " + nodeSelected[1].id() + " vers " + nodeSelected[0].id() + " ";
        
        if (this.G.$("#" + nodeSelected[1].id() + "-" + nodeSelected[0].id()).length > 0) {

          strSelection += '<label class="input-control text">- poid <input id="currentWeight_' + nodeSelected[1].id() + '-' + nodeSelected[0].id() + '" type="number" value="' + weight + '"/>'
                    + '<div class="button-group"><button id="btnChangeWeight_' + nodeSelected[1].id() + '-' + nodeSelected[0].id() + '">ok</button>'
                    + '<script>$(\"#btnChangeWeight_' + nodeSelected[1].id() + '-' + nodeSelected[0].id() + '").on( \"touchend mouseup\", function (e) { changeWeight(' + nodeSelected[1].id() + ', ' + nodeSelected[0].id() + ', true, $("#currentWeight_' + nodeSelected[1].id() + '-' + nodeSelected[0].id() + '").val()); });</script>';

          strSelection += "<button style=\"float:right\" id=\"removeEdge_" + nodeSelected[1].id() + "-" + nodeSelected[0].id() + "\">supprimer</button>";
          strSelection += "<script>$(\"#removeEdge_" + nodeSelected[1].id() + "-" + nodeSelected[0].id() + "\").on( \"touchend mouseup\", function (e) { removeEdge(" + nodeSelected[1].id() + ", " + nodeSelected[0].id() + "); });</script>";

        } else {

          strSelection += "<button style=\"float:right\" id=\"addEdge_" + nodeSelected[1].id() + "-" + nodeSelected[0].id() + "\">ajouter</button>";
          strSelection += "<script>$(\"#addEdge_" + nodeSelected[1].id() + "-" + nodeSelected[0].id() + "\").on( \"touchend mouseup\", function (e) { addEdge(" + nodeSelected[1].id() + ", " + nodeSelected[0].id() + "); });</script>";

        }

      } else if (nodeSelected.length == 2 && this.oriente == false) {

        var weight = null;
        if (this.G.$("#" + nodeSelected[0].id() + '-' + nodeSelected[1].id()).length > 0) weight = this.G.$("#" + nodeSelected[0].id() + '-' + nodeSelected[1].id()).data().weight;
        if (this.G.$("#" + nodeSelected[1].id() + '-' + nodeSelected[0].id()).length > 0) weight = this.G.$("#" + nodeSelected[1].id() + '-' + nodeSelected[0].id()).data().weight;

        if (weight != null) {
          strSelection += '<label class="input-control text">Poid <input id="currentWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '" value="' + weight + '" type="number"/>'
                      + '<div class="button-group"><button id="btnChangeWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '">ok</button>'
                      + '<script>$(\"#btnChangeWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '").on( \"touchend mouseup\", function (e) { changeWeight(' + nodeSelected[1].id() + ', ' + nodeSelected[0].id() + ', false, $("#currentWeight_' + nodeSelected[0].id() + '-' + nodeSelected[1].id() + '").val()); });</script>';
        }

      }
      strSelection += "</div>";
    }

    strSelection += "</div>";

  }

  this.currentSelection.html(strSelection);

}


//Coloration Naive Optimisé
/* Graphe.prototype.colorBelugou = function (s) {
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

} */





///////////////////////////////////////////////////////////////
                  /*ALGO*/

                  //TEST//

/////////////////////////////////////////////////////////////////

//var parcoursLareur
Graphe.prototype.parcoursLargeur = function(x) {

  var result = this.bfs(x);
  this.affiche(result);

}
//var parcoursProfondeur
Graphe.prototype.parcoursProfondeur= function(x) {

  var result = this.dfs(x);
  this.affiche(result);
}
Graphe.prototype.dijkstra_cmd= function() {

  var result = this.Dijkstra();
  this.afficheDijkstra(result);
}
Graphe.prototype.kruskal_cmd= function() {

  var result = this.Kruskal();
  this.afficheKruskal(result);
}
Graphe.prototype.glouton = function(){
  var result = this.colorGlouton();
  this.colorCssGlouton(result);
}

Graphe.prototype.naif = function(){
  var result = this.colorNaif();
  this.colorCssNaif(result);
}
/*TEST*/
//var monGraphe = new Graphe([['1','2'],['1','3'],['1','4'],['2','6'],['2','3'],['3','8'],['4','5'],['4','9'],['4','10'],['5','10'],['5','6'],['6','7'],['6','10'],['7','10'],['7','8'],['8','10'],['8','9'],['9','10']],false,6);
//var monGraphe = new Graphe([[1,2],[1,3],[1,6],[1,7],[2,3],[2,6],[2,7],[2,5],[3,4],[3,8],[4,8],[4,5],[5,6]],false,6);
 var monGraphe = new Graphe([[1,2,6],[1,6,2],[2,3,1],[2,6,4],[3,1,8],[3,4,2],[3,5,0],[4,2,10],[4,5,3],[5,1,4],[6,4,4],[6,5,7], [7]],false);
/* var monGraphe = new Graphe([['a','b', 4],['a','g', 2],['a','f', 6],
                            ['b','c', 3],['b','g', 0],
                            ['c','g', 1],['c','d', 7],
                            ['d','g', 6],['d','e', 0],
                            ['e','g', 6],['e','f', 2],
                            ['f','g', 5]],false); */


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
  /*
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

//var i = monGraphe.dfs('1');
//monGraphe.affiche(i);




////////////////////////////////////////////
///     ExportationLatex Utilitaire  //////
///////////////////////////////////////////



/////////////////////////////
///   UtilitaireFunction ///
///////////////////////////
//parcoursLareurEXPORTERcmd
Graphe.prototype.parcoursLargeurExport = function(x) {

  var result = this.bfs(x);
  this.afficheExport(result);

}
//parcoursProfondeurEXPORTERcmd
Graphe.prototype.parcoursProfondeurExport= function(x) {

  var result = this.dfs(x);
  this.afficheExport(result);
}
//dijkstraEXPORTERcmd
Graphe.prototype.dijkstraExport= function() {

  var result = this.Dijkstra();
  this.afficheDijkstra(result);
}


///////////////////////////////////////////////////////////////

              //AffichageExport//

///////////////////////////////////////////////////////////////

Graphe.prototype.afficheExport = function(result) {

  var i;
  this.createNotification("",'Sommet actif ' +result[0].id);
  this.createNotification("Default",'Visite du sommet ' +result[0].id);

  for(i = 0; i < result.length; i++ ){
      var noeudActif;
      if(result[i].type == "nodeVisite" )  noeudActif = result[i].id;

      afficheAux(result[i].id,result[i].type,this.G,this,noeudActif,i);
    }

}
afficheAux = function(ident,type,G,cl,noeudActif,i){
      if(type == "nodeVisite" && i != 0) cl.createNotification("",'Sommet actif ' +ident);
      if(type == "edgeVisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Default",'Visite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Default",'Visite du sommet ' +ident.replace('-'+noeudActif,''));
      }

      else if(type == "edgeRevisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace('-'+noeudActif,''));
      }
      G.$('#'+ident).addClass(type);
}




/*
Graphe.prototype.afficheDijkstra = function(result) {

  for (var i = 0; i < result.length; i++) {

    setTimeout(

      function(ident, type, G, source, str) {

        if (type == 1) G.$("#" + ident).addClass("nodeVisite");
        else if (type == 2) {

          if (G.$("#illustration")) G.$("#illustration").remove();
          G.add({ group:"edges", data: {id: 'illustration', source: source, target: ident}});

        }
        else if (type == 3) {

          if (G.$("#label" + ident)) G.$("#label" + ident).remove();
          G.add({ group:"edges", data: {id: 'label' + ident, source: ident, target: ident, weight: str}});
          G.$("#label" + ident).addClass("label");

        }

      },
      2000 * i,
      result[i][0],
      result[i].length,
      this.G,
      result[i][1],
      result[i][2]

    );

  }
  this.createNotification("",'Sommet actif ' +result[0].id);
  this.createNotification("Default",'Visite du sommet ' +result[0].id);

  for(i = 0; i < result.length; i++ ){

      var noeudActif;
      if(result[i].type == "nodeVisite" )  noeudActif = result[i].id;

      setTimeout( function(ident,type,G,cl,noeudActif,i){
      if(type == "nodeVisite" && i != 0) cl.createNotification("",'Sommet actif ' +ident);
      if(type == "edgeVisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Default",'Visite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Default",'Visite du sommet ' +ident.replace('-'+noeudActif,''));
      }

      else if(type == "edgeRevisite"){
        if(ident.match(noeudActif+'-') != null) cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace(noeudActif+'-',''));
        else cl.createNotification("Revisite",'Revisite du sommet ' +ident.replace('-'+noeudActif,''));
      }
      G.$('#'+ident).addClass(type);
      setTimeout(function(s){ s.refresh(); },1000,scrollPanelLeft);

      },3000*i,result[i].id,result[i].type,this.G,this,noeudActif,i);
      console.log(result);
    }

}
*/



//Tableau associatif de coloration 'color' type de couleur int color[id].couleur //
Graphe.prototype.colorCssExport = function (color) {

  var myColor = randomColor({
    count: this.G.nodes().length,
    luminosity: 'dark'
  });
  var i;
  //MAJ  css couleur node//
  for(i=0; i < this.G.nodes().length ;i++)    this.G.nodes()[i].css("background-color", myColor[color[this.G.nodes()[i].data().id]]);

}
// });
