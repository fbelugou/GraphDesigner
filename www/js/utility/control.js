$(function(){
    var pb = $('#timeline').progressbar();
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
     }



     var myScroll;

    function loaded () {
        myScroll = new IScroll('#wrapper', {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });
    }

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

});