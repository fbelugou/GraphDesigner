$(function(){
    var exportationList=[];

     /////////////////////////
     /////  MINIMAP     //////
     /////////////////////////
     $('#cy').cyNavigator({

         container: '.cytoscape-navigator',
         viewLiveFramerate: 0,
         thumbnailEventFramerate: 0,
         thumbnailLiveFramerate: false,
         dblClickDelay: 200

     });



     /////////////////////////
     /////  CONTROL UI     //////
     /////////////////////////
     $("#btn-viewer").click(function () {

       if (S_MODE == EScreenMode.DESIGNER || S_MODE == EScreenMode.GAME) {

         $(".panel-left").css({'left' : '0'});
         $("#panel-right-editor").css({'right': '-30%'});
         $("#panel-right-game").css({'right': '-30%'});

         $("#cy").css({'width' : '55%', 'left' : '15%', 'z-index' : 1});

         S_MODE = EScreenMode.VIEWER;

         $("#blockMask").css({'z-index':999});
         monGraphe.G.animate({fit:{padding:100}}, {duration: 200});
         setTimeout(function() { 

            monGraphe.G.resize();
            $("#blockMask").css({'z-index':0});
            $("#cy").css({'z-index' : 1});
            $(".panel-right").css({'right' : '0'}); 

         }, 500);

       }

     });

     $("#btn-designer").click(function () {

       if (S_MODE == EScreenMode.VIEWER || S_MODE == EScreenMode.GAME) {

        $(".panel-right").css({'right' : '-30%'});
        $(".panel-left").css({'left' : '-15%'});
        $("#panel-right-game").css({'right': '-30%'});

        monGraphe.G.animate({fit:{padding:100}}, {duration: 200});
        monGraphe.clearGraphe();
        $("#cy").css({'width' : '70%', 'left' : '0','z-index' : 1});

        S_MODE = EScreenMode.DESIGNER;

        $("#blockMask").css({'z-index':999});
        monGraphe.G.resize();
        setTimeout(function() { 

            $("#blockMask").css({'z-index':0}); $("#cy").css({'z-index' : 1});
            $("#panel-right-editor").css({'right': '0'});
            monGraphe.G.resize();
            monGraphe.G.animate({fit:{padding:100}}, {duration: 200});

        }, 500);

       }

     });

     $("#btn-game").click(function () {

       if (S_MODE == EScreenMode.VIEWER || S_MODE == EScreenMode.DESIGNER) {

        $(".panel-right").css({'right' : '-30%'});
        $(".panel-left").css({'left' : '-15%'});
        $("#panel-right-editor").css({'right': '-30%'});

        monGraphe.G.animate({fit:{padding:100}}, {duration: 200});
        monGraphe.clearGraphe();
        $("#cy").css({'width' : '70%', 'left' : '0','z-index' : 1});

        S_MODE = EScreenMode.GAME;

        $("#blockMask").css({'z-index':999});
        monGraphe.G.resize();
        setTimeout(function() { 

            $("#blockMask").css({'z-index':0}); $("#cy").css({'z-index' : 1});
            $("#panel-right-game").css({'right': '0'});
            monGraphe.G.resize();
            monGraphe.G.animate({fit:{padding:100}}, {duration: 200});

        }, 500);

       }

     });


    $("#menu-algo>.accordion-frame").click(function(e){
         setTimeout(function(s){ s.refresh(); },500,scrollPanelRight);
     })


       //////////////////////////////////
     /////  CONTROL ALGO DIALOG     //////
     /////////////////////////////////////
    openDialog = function(data){
        //In EXPORT
        if(EXPORT_MODE){
            if(data == ""){
                $("#algo-dialog").html("<div id='title-bar'><span class='icon-printer'></span><span id='titleText'>Exportation en Latex</span>"
                    +"<div id='control'>First name: <input type='text' id='Nfichier' value='NomFichier'> <button onclick='callExport()'>Exporter</button> <button onclick='closeDialog()'>Fermer</button></div></div>"+
                    "<div class='content' >"+
                    "<div id ='list-algo' class='listview small'></div></div>");
                 $("#algo-dialog").removeClass("hide");
            }

            else{
            
                var context =  window[data];  
                var bExist = false;
                for(var i = 0; i<exportationList.length; i++){
                    if(exportationList[i].algo == data.replace("_D","")){
                        bExist = true;
                        exportationList.splice(i,1);
                    }
                }
                if(bExist){

                    $("#algo-dialog>.content>#list-algo>a[data='"+data.replace("_D","")+"']").remove();
                }
                else{
                    $("#algo-dialog>.content>#list-algo").append("<a href='#' class='list' data="+data.replace("_D","")+" style='width:calc(100% - 2px)'><div class='list-content'  data="+data.replace("_D","")+">"+
                                                        "<img src="+context.image+" class='span1 shadow' style='float:left; margin-right: 2%;'>"+
                                                        "<div class='data'>"+
                                                            "<span class='list-title'>"+context.titre+"</span>"+
                                                       "</div>"+
                                                    "</div></a>");    
                    exportationList.push({algo:data.replace("_D",""), notifList:1,pseudoCode:1});
                }       
            }   
        }
        else{
            console.log(data);
            var context =  window[data];
            $("#algo-dialog").html("<div id='title-bar'><img id='title-img' src='"+context.imageClass+"'><span id='titleText'>"+ context.titre +"</span></div><div id='wrapper'><div id='scroller'><ul><li><div id='description'>"+
                                    "<div id='desc-algo'><img  align='left' id='image-algo' class='shadow'  src="+ context.image +">"+ context.desc +"</div></div>"+
                                    "<div><p>"+ context.complexite +"</p></div><div id='control'> <button onclick=lancerAlgo('"+data+"')>Lancer</button> <button onclick='closeDialog()'>Fermer</button></div></li></ul></div></div>");
            $("#algo-dialog").css({"z-index:": 4});
            $("#algo-dialog").removeClass("hide");

            var tmpH = $("#algo-dialog>#title-bar").height();
            $("#algo-dialog>#wrapper").height($("#algo-dialog").height()-tmpH);
            scrollAlgoDialog = new IScroll('#algo-dialog>#wrapper', {
                scrollX: false, 
                scrollY: true,
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true,
                useTransform: true,
                useTransition: true,
                click:true
            });
           scrollAlgoDialog.refresh(); 
        }


        
    }

    closeDialog = function(){
        if(EXPORT_MODE){
            EXPORT_MODE = false;
            exportationList = [];
        } 
        $("#algo-dialog").addClass("hide");
    }

    lancerAlgo = function(data){
        monGraphe.clearGraphe();
        closeDialog();
        var context =  window[data];
        monGraphe[context.cmd].apply(monGraphe, context.args);
    }
    
    $(".list-content").click(function(){  
        openDialog($(this).attr("data"));
    });
     

    $( "#trashBtn" ).click(function() { clearNotif(); monGraphe.clearGraphe(); });

    clearNotif = function() {

        $("#log-panel>#wrapper>#scroller> ul").html('');
        $("#trashBtn").mouseout();
        $("#trashBtn").src = "images/trash.png";

    }

    //////////////////////////////
    /////     RESIZE       ///////
    //////////////////////////////
    window.onresize = function(){
        if(!$("#algo-dialog").hasClass("hide")){
            var tmpH = $("#algo-dialog>#title-bar").height();
            $("#algo-dialog>#wrapper").height($("#algo-dialog").height()-tmpH);
            if(scrollAlgoDialog != undefined) scrollAlgoDialog.refresh(); 
        }
        scrollPanelLeft.refresh();
        scrollPanelRight.refresh();
        monGraphe.G.resize();
        monGraphe.G.fit();
    }

      //////////////////////////////////
     /////  CONTROL GRAPH CREATION //////
     /////////////////////////////////////

    addNode = function() {

        var nodePositions = Array();
          for (var i = 0; i < monGraphe.G.nodes().length; i++)
            nodePositions.push({id:monGraphe.G.nodes()[i].data().id, pos:monGraphe.G.nodes()[i].position()});

        console.log(nodePositions);

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            adj.push(monGraphe.copyForClone.adjacence[i]);

        }
        

        var nodeToAdd = 1;
        while (monGraphe.adjacence[String(nodeToAdd)] != undefined) nodeToAdd += 1; 
        adj.push([nodeToAdd]);

        monGraphe = new Graphe(adj, bOr, nodePositions);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    removeNode = function() {

        var nodePositions = Array();
          for (var i = 0; i < monGraphe.G.nodes().length; i++)
            nodePositions.push({id:monGraphe.G.nodes()[i].data().id, pos:monGraphe.G.nodes()[i].position()});

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;

        var badNode = monGraphe.G.nodes()[monGraphe.G.nodes().length - 1].data().id;

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            var x = monGraphe.copyForClone.adjacence[i][0];
            var y = monGraphe.copyForClone.adjacence[i][1]; 

            if (x != badNode && y != badNode) adj.push(monGraphe.copyForClone.adjacence[i]);

        }

        monGraphe = new Graphe(adj, bOr, nodePositions);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    orienteGraph = function(bOr) {

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) adj.push(monGraphe.copyForClone.adjacence[i]);

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    valueGraphe = function(bVal) {

        if (monGraphe.G.edges().length < 1) $("#bValue").prop('checked', monGraphe.value);
        else {

            var lastSelected = Array();
            for (var j = 0; j < monGraphe.G.nodes().length; j++) {

                if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
            }

            var adj = Array();

            var pos = monGraphe.nodePositions.slice();

            var i;
            for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

                if (monGraphe.copyForClone.adjacence[i][1] != undefined && bVal && monGraphe.copyForClone.adjacence[i][2] == undefined)
                    adj.push([monGraphe.copyForClone.adjacence[i][0], monGraphe.copyForClone.adjacence[i][1], 0]);
                else if (monGraphe.copyForClone.adjacence[i][1] != undefined && bVal == false && monGraphe.copyForClone.adjacence[i][2] != undefined)
                    adj.push([monGraphe.copyForClone.adjacence[i][0], monGraphe.copyForClone.adjacence[i][1]]);
                else adj.push(monGraphe.copyForClone.adjacence[i]);

            }

            monGraphe = new Graphe(adj, monGraphe.oriente, pos);
            fromLastSelection(lastSelected);

            $('#cy').data('navigator')._init($("#cy"));

        } 

    }

    removeDegE = function(node) {

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            if (monGraphe.copyForClone.adjacence[i][1] != node) adj.push(monGraphe.copyForClone.adjacence[i]);

        }

        if (monGraphe.G.$("#" + String(node)).data().degreS == 0) adj.push([node]);

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    removeDegS = function(node) {

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            if (monGraphe.copyForClone.adjacence[i][0] != node) adj.push(monGraphe.copyForClone.adjacence[i]);

        }

        if (monGraphe.G.$("#" + String(node)).data().degreE == 0) adj.push([node]);

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    removeDeg = function(node) {

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            if (monGraphe.copyForClone.adjacence[i][0] != node && monGraphe.copyForClone.adjacence[i][1] != node) adj.push(monGraphe.copyForClone.adjacence[i]);

        }

        if (monGraphe.G.$("#" + String(node)).data().degreE == 0) adj.push([node]);

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    linkNodes = function(nodes) {

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;
        var bVal = monGraphe.value;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) adj.push(monGraphe.copyForClone.adjacence[i]);
        for (i = 0; i < nodes.length; i++) {

            for (j = i + 1; j < nodes.length; j++) {

                if (i != j) {

                    if (monGraphe.G.$("#" + nodes[i] + "-" + nodes[j]).length == 0) {

                        if (bVal) adj.push([nodes[i], nodes[j], 0]);
                        else adj.push([nodes[i], nodes[j]]);

                    }
                    if (monGraphe.G.$("#" + nodes[j] + "-" + nodes[i]).length == 0 && bOr) {

                        if (bVal) adj.push([nodes[j], nodes[i], 0]);
                        else adj.push([nodes[j], nodes[i]]);

                    }

                }

            }

        }

        console.log(JSON.stringify(adj));

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    unlinkNodes = function(nodes) {

        var lastSelected = Array();

        var adj = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if ($.inArray([monGraphe.G.nodes()[j].data().id], monGraphe.copyForClone.adjacence) == -1) {

                adj.push([monGraphe.G.nodes()[j].data().id]);
                
            }
            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);

        }
        var bOr = monGraphe.oriente;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            var x = monGraphe.copyForClone.adjacence[i][0];
            var y = monGraphe.copyForClone.adjacence[i][1]; 

            if (!($.inArray(x, nodes) > -1 && $.inArray(y, nodes) > -1)) adj.push(monGraphe.copyForClone.adjacence[i]);

        }

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    addEdge = function(node1, node2) {

        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);
        }

        var adj = Array();
        var bOr = monGraphe.oriente;
        var bVal = monGraphe.value;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) adj.push(monGraphe.copyForClone.adjacence[i]);

        if (bVal) adj.push([node1, node2, 0]);
        else adj.push([node1, node2]);

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    removeEdge = function(node1, node2) {

        var adj = Array();
        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if ($.inArray([monGraphe.G.nodes()[j].data().id], monGraphe.copyForClone.adjacence) == -1) {

                adj.push([monGraphe.G.nodes()[j].data().id]);

            }

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);

        }
        var bOr = monGraphe.oriente;
        var bVal = monGraphe.value;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {


            if (!(monGraphe.copyForClone.adjacence[i][0] == node1 && monGraphe.copyForClone.adjacence[i][1] == node2)) {
                adj.push(monGraphe.copyForClone.adjacence[i]);

            }

        }

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    selectAll = function() {

        var nodeSelected = Array();
        for (var i = 0; i < monGraphe.G.nodes().length; i++) {

            nodeSelected.push(monGraphe.G.nodes()[i]);
            monGraphe.G.nodes()[i].select();
        }

        monGraphe.constructInfo(nodeSelected);

    }

    fromLastSelection = function(nodesId) {

        var nodeSelected = Array();
        for (var i = 0; i < nodesId.length; i++) {

            nodeSelected.push(monGraphe.G.$("#" + nodesId[i]));
            monGraphe.G.$("#" + nodesId[i]).select();

        }

        monGraphe.constructInfo(nodeSelected);

    }

    changeWeight = function(node1, node2, bOr, val) {

        var adj = Array();
        var lastSelected = Array();
        for (var j = 0; j < monGraphe.G.nodes().length; j++) {

            if (monGraphe.G.nodes()[j].selected()) lastSelected.push(monGraphe.G.nodes()[j].data().id);

        }
        var bVal = monGraphe.value;

        var pos = monGraphe.nodePositions.slice();

        var i;
        for (i = 0; i < monGraphe.copyForClone.adjacence.length; i += 1) {

            if (monGraphe.copyForClone.adjacence[i][0] == node1 && monGraphe.copyForClone.adjacence[i][1] == node2) {
                adj.push([monGraphe.copyForClone.adjacence[i][0], monGraphe.copyForClone.adjacence[i][1], val]);

            } else if (monGraphe.copyForClone.adjacence[i][0] == node2 && monGraphe.copyForClone.adjacence[i][1] == node1 && bOr == false)
                adj.push([monGraphe.copyForClone.adjacence[i][0], monGraphe.copyForClone.adjacence[i][1], val]);
            else adj.push(monGraphe.copyForClone.adjacence[i]);
        }

        monGraphe = new Graphe(adj, bOr, pos);
        fromLastSelection(lastSelected);

        $('#cy').data('navigator')._init($("#cy"));

    }

    $("#btnAddNode").click(function (e) { addNode(); $("#cy").cyNavigator('resize'); });
    $("#btnRemoveNode").click(function (e) { removeNode(); });
    $("#bOriente").change(function (e) { orienteGraph(!monGraphe.oriente); });
    $("#bValue").change(function (e) { valueGraphe(!monGraphe.value); });
    $("#btnSelectAll").click(function (e) { selectAll(); });


    ///////////////////////////////////////////////////
    ///              EXPORTER_BTN                   ///
    //////////////////////////////////////////////////
    $("#exportLatexbtn").click(function (e) {
        console.log("ok");
        closeDialog();
        EXPORT_MODE = true;
        openDialog("");
    });

    callExport = function (){
        var NFichier=document.getElementById("Nfichier").value;
        if(exportationList.length == 0){
            
            exportToTex([],false,NFichier);
            
        }
        else{
            exportToTex(exportationList,true,NFichier);
        }
    }
    // Server side
    /* var dgram = require("dgram");

    var server = dgram.createSocket("udp4");
    var client = dgram.createSocket("udp4");

    server.on("message", function (msg, rinfo) {

        var message = new Buffer(JSON.stringify(monGraphe.copyForClone));
        client.send(message, 0, message.length, rinfo.port, rinfo.address);

    });
    server.bind(4242); */

});
