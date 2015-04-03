$(function(){

    /*var pb = $('#timeline').progressbar();
    var progress = 0;
    var interval;
    var status = "play";
    $("#timeline_play_btn").bind('click', function(){
        if(status == "play"){
            $("#timeline_play_btn").find('i')[0].className='icon-pause';
            updateBar();
            status ="pause";
        }
        else{
            pauseBar();
            $("#timeline_play_btn").find('i')[0].className='icon-play';
            status ="play";


        }
    });


    $("#timeline_reset_btn").bind('click', function(){
        progress = 0;
        clearInterval(interval);
        pb.progressbar('value', progress);
        pb.progressbar('value', progress);

        $("#timeline_play_btn").find('i')[0].className='icon-play';
        status ="play";
    });


     updateBar = function (){

         interval = setInterval(
                function(){

                    if (progress < 100) {
                     pb.progressbar('value', (++progress));
                     console.log(progress);
                    }
                    else {
                        clearInterval(interval);
                        progress=0;
                        pb.progressbar('value', 0);
                        pb.progressbar('value', 0);
                        $("#timeline_play_btn").find('i')[0].className='icon-play';
                        status ="play";


                    }

                }, 100);


     }

     pauseBar = function (){
        clearInterval(interval);
     } */


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

       if (S_MODE == true) {

         $(".panel-right").css({'right' : '0'});
         $(".panel-left").css({'left' : '0'});

         $("#cy").css({'width' : '55%', 'left' : '15%', 'z-index' : 1});

         S_MODE = false;

         $("#blockMask").css({'z-index':999});
         monGraphe.G.animate({fit:{padding:30}}, {duration: 200});
         setTimeout(function() { monGraphe.G.resize();  $("#blockMask").css({'z-index':0}); $("#cy").css({'z-index' : 1}); }, 500);

       }

     });

     $("#btn-designer").click(function () {

       if (S_MODE == false) {

         $(".panel-right").css({'right' : '-30%'});
         $(".panel-left").css({'left' : '-15%'});

         monGraphe.G.animate({fit:{padding:30}}, {duration: 200});
         $("#cy").css({'width' : '100%', 'left' : '0','z-index' : 1});

         S_MODE = true;

         $("#blockMask").css({'z-index':999});
         monGraphe.G.resize();
         setTimeout(function() { $("#blockMask").css({'z-index':0}); $("#cy").css({'z-index' : 1}); }, 500);

       }

     });



       //////////////////////////////////
     /////  CONTROL ALGO DIALOG     //////
     /////////////////////////////////////
    openDialog = function(data){
        var context =  window[data];
        $("#algo-dialog").html("<div id='title-bar'><a id='titleText' href='#'>"+ context.titre +"</a></div><div id='description'>"+
                                "<img id='image-algo' class='shadow'  src="+ context.image +"><p>"+ context.desc +"</p></div>"+
                                "<div><p>"+ context.complexite +"</p></div><div id='control'><a href=''></a><a href=''></a></div> <button onclick=lancerAlgo('"+data+"')>Lancer</button> <button onclick='closeDialog()'>Fermer</button>");
        $("#algo-dialog").css({"z-index:": 4});
        $("#algo-dialog").removeClass("hide");
    }
    
    closeDialog = function(){
        $("#algo-dialog").addClass("hide");
    }

    lancerAlgo = function(data){
        var context =  window[data];
        monGraphe[context.cmd].apply(monGraphe, context.args);
    }
    
    $(".list-content").click(function(){  
        openDialog($(this).attr("data"));
    });


});
