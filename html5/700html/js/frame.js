
    var footageFloder = "footage";
    var vSourceIndex = 0 ;
    var flickerSource = "flicker_3s";
    var videoType = "video/mp4";
    var videoSuffix = ".mp4";

    // var videoSources = [
    //     ['Q',0,0,0],
    //     ['W',0,1,0],
    //     ['E',0,2,0],
    //     ['MQ',1,0,0],
    //     ['MW',1,1,0],
    //     ['ME',1,2,0],
    // ]
    var VIDEO_NAME = 0;
    var VIDEO_BUTTON_NUM = 1;
    var VIDEO_SCALE_NUM = 2;
    var VIDEO_START_TIME = 3;

    // var ButtonConstruct = [
    //     [128,512,900],
    //     [100,500,1000],
    //     [200,300,700,900]
    // ]

    var keypressButtonChange = 20;
    var clearRange = 0.3;
    var noiseOpacityChange = 0.02;
    var FPS = 30;

    var Point = {
     createNew : function(_val , _video , _id ) {
         var point = {};
         point.val = _val;
         point.video = _video;
         point.myId = _id;
         return point;
     }
    };

    var MyButton = {
     createNew : function(_pointList) {
         var button = {};
         button.pointList = _pointList;
         return button;
     }
    }

    var videoFrame;
    var vFlicker;
    var buttons;

    function video2path (videoName) {
        return "../" + footageFloder + "/" + videoName + videoSuffix;
    }

    function init () {

        // initilize framework div
        videoFrame = document.createElement("div");
        videoFrame.className = "videoFrame";
        videoFrame.id = "mv";
        document.body.appendChild(videoFrame);


        // set up filter effect video
        var flickerPath = video2path(flickerSource);
        var flicker = document.createElement("video");
        flicker.type = "video/mp4";
        flicker.src = flickerPath;
        flicker.loop = true;
        // video.crossOrigin = 'anonymous';
        flicker.preload = 'none';
        flicker.id = 'flicker';
        flicker.autoplay = true;

        videoFrame.appendChild(flicker);
        vFlicker = $("#flicker");
        vFlicker.css("z-index",100);


        buttons = [];
        for (var i = 0; i < ButtonConstruct.length; i++) {
            var pl = [];
            var button = MyButton.createNew(pl);
            buttons[buttons.length] = button;
            for (var j = 0 ; j < ButtonConstruct[i].length; j++)
            {
                // set up a video for this point:
                var video = document.createElement("video");
                video.type = videoType;
                video.src = "";
                video.preload = 'none';
                video.id = 'video-'+i.toString()+'-'+j.toString();
                video.autoplay = true;
                videoFrame.appendChild(video);

                var v = $("#"+video.id);
                
                // create a new point
                var p = Point.createNew(ButtonConstruct[i][j],v,video.id);
                hideVideo(p);
                // append the point to point list
                pl[pl.length]=p;
            }
        };


         setInterval(function() {
            update();
        }, 1000/FPS );
    }

    // temp button value; for test
    var buttonTempValue = [0,0,0];
    var tempButton = 0 ;
    var noiseOpacity = 1;
    var tempPoint = null;
    var currentTime = 0 ;
    function update()
    {
        // update noise
        var p = getClearPoint(buttonTempValue[tempButton],buttons[tempButton].pointList);
        
        if (p == null ) // video not found
        {
            noiseOpacity += noiseOpacityChange;
        }else // video found
        {
            if (noiseOpacity >= 1 ) // now noise
            {
                if (tempPoint != null)
                    hideVideo(tempPoint);
                showVideo(p);
                tempPoint = p;
                noiseOpacity -= noiseOpacityChange;
            }else  // now shows video
            {
                if (tempPoint.myId == p.myId) // the same video
                {
                    noiseOpacity -= noiseOpacityChange;
                }else
                {
                    noiseOpacity += noiseOpacity;
                }
            }
        }

        if ( noiseOpacity < 0 ) noiseOpacity = 0;
        if ( noiseOpacity > 1 ) noiseOpacity = 1;
        vFlicker.css("opacity",noiseOpacity);

        // update videos
        currentTime += 1000 / FPS;
        if ( videoSources.length > vSourceIndex)
        if ( currentTime > videoSources[vSourceIndex][VIDEO_START_TIME])
        {
            importVideoFromSource(videoSources[vSourceIndex]);
            vSourceIndex++;
        }
        console.log(buttonTempValue + " " + tempButton.toString() + " " );
        if (tempPoint != null)
            console.log(tempPoint.myId);
    }

    function importVideoFromSource(sourceInfo)
    {
        var path = video2path(sourceInfo[VIDEO_NAME]);
        var Ibtn = sourceInfo[VIDEO_BUTTON_NUM];
        var Jscl = sourceInfo[VIDEO_SCALE_NUM];
        var video = buttons[Ibtn].pointList[Jscl].video;
        video.attr('src',path);
        // video.play();
    }

    function hideVideo(p)
    {
        p.video.hide();
    }

    function showVideo(p)
    {
        p.video.show();
    }

    function getClearPoint(value,pointList)
    {
        for (var i = 0; i < pointList.length; i++ ) {
            // check forword
            var preVal = 0 ;
            if (i != 0 )
                preVal = pointList[i-1].val;
            var preI = pointList[i].val - preVal;
            var forVal = 1023;
            if (i != pointList.length-1)
                forVal = pointList[i+1].val;
            var forI = forVal - pointList[i].val;
            if ( value > ( pointList[i].val - preI * clearRange) && 
                value < (pointList[i].val + forI * clearRange) )
            {
                return pointList[i];
            }
        };
        return null;
    }


    function doKeyPress(e){
          if (e.keyCode == 'w'.charCodeAt(0) )
          {
            buttonTempValue[0] += keypressButtonChange;
            tempButton = 0;
          }


          if (e.keyCode == 'e'.charCodeAt(0) )
          {
            buttonTempValue[1] += keypressButtonChange;
            tempButton = 1;
          }

          if (e.keyCode == 'r'.charCodeAt(0) )
          {
            buttonTempValue[2] += keypressButtonChange;
            tempButton = 2;
          }

          if (e.keyCode == 's'.charCodeAt(0) )
          {
            buttonTempValue[0] -= keypressButtonChange;
            tempButton = 0;
          }

          if (e.keyCode == 'd'.charCodeAt(0) )
          {
            buttonTempValue[1] -= keypressButtonChange;
            tempButton = 1;
          }

          if (e.keyCode == 'f'.charCodeAt(0) )
          {
            buttonTempValue[2] -= keypressButtonChange;
            tempButton = 2;
          }
    }

    init();
    window.addEventListener('keypress', doKeyPress,false);

