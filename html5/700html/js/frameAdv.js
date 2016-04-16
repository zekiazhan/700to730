
    var footageFloder = "footage";
    var vSourceIndex = 0 ;
    var flickerSource = "flicker_3s";
    var videoType = "video/mp4";
    var videoSuffix = ".mp4";

    var footagePaths = [
        [0,'01',0,20],
        [0,'02',20,40],

    ]

    var FOOTAGE_ID = 0;
    var FOOTAGE_PATH = 1;
    var FOOTAGE_START_TIME = 2;
    var FOOTAGE_END_TIME = 3;

    var videoSources = [
        ['Q',0,0,0,20],
        ['2s',0,1,0,15],
        ['MQ',0,1,0,15],
        ['MW',0,1,15,30],
        ['ME',0,1,15,30],
    ]

    var VIDEO_NAME = 0;
    var VIDEO_BUTTON_NUM = 1;
    var VIDEO_SCALE_NUM = 2;
    var VIDEO_START_TIME = 3;
    var VIDEO_END_TIME = 4;

    var ButtonConstruct = [
        [128,200,225,512,900]
    ]
    var ButtonNoisePoint = [
        [1,2]
    ]

    var keypressButtonChange = 10;
    var clearRange = 0.2;
    var fadeRange = 0.4;
    var noiseChangeRate = 0.2;
    var noiseOpacityChange = 0.02;
    var FPS = 30;

    

    var Point = {
     createNew : function(_val , _video , _id ) {
         var point = {};
         point.val = _val;
         point.video = _video;
         point.videoList = [];
         point.myId = _id;
         point.myType = "normal"

         point.EnterPoint = function() {
     	var path = "";
     	if (this.videoList.length > 0 ) {
     		var rand = Math.floor(Math.random()*this.videoList.length);
     		console.log("Random " + rand.toString() );
     		path = this.videoList[rand];
     	}
     	console.log("Enter Point path " + this.myId + " " + path);
     	this.video.attr('src',path);
        }
        
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
                video.loop = true;
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

            for (var j = 0 ; j < ButtonNoisePoint[i].length ; j++)
            {
                pl[ButtonNoisePoint[i][j]].myType = "noise";
            }
        };

        //init the video
        // TODO 
        // initVideos();


         setInterval(function() {
            update();
        }, 1000/FPS );
    }

    function initVideos()
    {
        var overallPath = window.location.href;
        var lastIndex = overallPath.length-1;
        lastIndex = overallPath.lastIndexOf("/",lastIndex-1);
        lastIndex = overallPath.lastIndexOf("/",lastIndex-1);
        var path = overallPath.substr(0,lastIndex+1) + footageFloder+ '/';
        console.log(path);

        // var fso = new ActiveXObject("Scripting.FileSystemObject");  
        

        var sourceFolder = Folder("/Users/atwood/tem/700/html5/700html/page/");
        // if (sourceFolder != null)
        // {
        //     var fileList = sourceFolder.getFiles();
        //     for (var i = fileList.length - 1; i >= 0; i--) {
        //         console.log(fileList[i]);
        //     };
        // }

        // var fs = require('fs');
        // var logFiles = getFiles(path);

        // console.log( getFiles(logFiles) );

    }

    function getFiles(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isFile();
    });
    }

    // temp button value; for test
    var buttonTempValue = [0,0,0];
    var tempButton = 0 ;
    var noiseOpacity = 1;
    var tempPoint = null;
    var currentTime = 0 ;
    var lastPoint;
    function update()
    {
        // update noise
        var p = getClearPoint(buttonTempValue[tempButton],buttons[tempButton].pointList);
        
        if ( p != null && ( lastPoint == null || p.myId != lastPoint.myId))
        {
        	p.EnterPoint();
        }
        lastPoint = p;

        // change the noise filter by time
        // if (p == null ) // video not found
        // {
        //     noiseOpacity += noiseOpacityChange;
        // }else // video found
        // {
        //     if (noiseOpacity >= 1 ) // now noise
        //     {
        //         if (tempPoint != null)
        //             hideVideo(tempPoint);
        //         showVideo(p);
        //         tempPoint = p;
        //         noiseOpacity -= noiseOpacityChange;
        //     }else  // now shows video
        //     {
        //         if (tempPoint.myId == p.myId) // the same video
        //         {
        //             noiseOpacity -= noiseOpacityChange;
        //         }else
        //         {
        //             noiseOpacity += noiseOpacity;
        //         }
        //     }
        // }

        // change the noise filter by scale
        if (p == null ) // video not found
        {
            noiseOpacity = 1;
        }else // video found
        {
            noiseOpacity = 1 - getClearness(buttonTempValue[tempButton],buttons[tempButton].pointList);
            console.log("noise opacity " + noiseOpacity);
            if ( tempPoint != p )
            {
                if ( tempPoint != null )
                    hideVideo(tempPoint);
                showVideo(p);
                tempPoint = p;
            }
        }

        if ( noiseOpacity < 0 ) noiseOpacity = 0;
        if ( noiseOpacity > 1 ) noiseOpacity = 1;
        vFlicker.css("opacity",noiseOpacity);

        // update videos
        currentTime += 1000 / FPS;

        // remove videos
	    for (var i = videoSources.length - 1; i >= 0; i--) {
	    	if ( videoSources[i][VIDEO_END_TIME] >= currentTime / 1000 
	    		&& videoSources[i][VIDEO_END_TIME] < currentTime / 1000 + 1 / FPS)
	    		removeVideoBySource(videoSources[i]);
	    };

	    // add videos
	   	// for (var i = videoSources.length - 1; i >= 0; i--) {
	    // 	if ( videoSources[i][VIDEO_START_TIME] >= currentTime 
	    // 		&& videoSources[i][VIDEO_START_TIME] < currentTime + 1000 / FPS)
	    // 		importVideoFromSource(videoSources[i]);
	    // };
        if ( videoSources.length > vSourceIndex)
        if ( currentTime / 1000 > videoSources[vSourceIndex][VIDEO_START_TIME])
        {
            importVideoFromSource(videoSources[vSourceIndex]);
            vSourceIndex++;
        }
       //  console.log(buttonTempValue + " " + tempButton.toString() + " " + noiseOpacity.toString());
        // if (tempPoint != null)
        //     console.log(tempPoint.myId);
    }

    function removeVideoBySource(sourceInfo)
    {
        var path = video2path(sourceInfo[VIDEO_NAME]);
        var Ibtn = sourceInfo[VIDEO_BUTTON_NUM];
        var Jscl = sourceInfo[VIDEO_SCALE_NUM];

        var point = buttons[Ibtn].pointList[Jscl];

        var i = point.videoList.indexOf(path);
        if ( i != -1) {
        	point.videoList.splice(i,1);
        }

       	point.videoList.push(path);
       	console.log("remove video " + point.myId + path);

    }

    function importVideoFromSource(sourceInfo)
    {
        var path = video2path(sourceInfo[VIDEO_NAME]);
        var Ibtn = sourceInfo[VIDEO_BUTTON_NUM];
        var Jscl = sourceInfo[VIDEO_SCALE_NUM];

        var point = buttons[Ibtn].pointList[Jscl];
       	point.videoList.push(path);
       	console.log("import video " + point.myId + path);
        // var video = buttons[Ibtn].pointList[Jscl].video;
        // video.attr('src',path);
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
            var _fadeRange = fadeRange;
            if ( pointList[i].myType == "noise") {
                _fadeRange = _fadeRange * noiseChangeRate;
            }
            // check previous range
            var preVal = 0 ;
            if (i != 0 )
                preVal = pointList[i-1].val;
            var preI = pointList[i].val - preVal;
            // check forward range
            var forVal = 1023;
            if (i != pointList.length-1)
                forVal = pointList[i+1].val;
            var forI = forVal - pointList[i].val;

            // check if the value in the range
            if ( value > ( pointList[i].val - preI * _fadeRange ) && 
                value < ( pointList[i].val + forI * _fadeRange ) )
            {
                return pointList[i];
            }
        };
        return null;
    }

    function getClearness( value , pointList)
    {
        for (var i = 0; i < pointList.length; i++ ) {
            var _fadeRange = fadeRange;
            var _clearRange = clearRange;
            if ( pointList[i].myType == "noise") {
                _fadeRange = _fadeRange * noiseChangeRate;
                _clearRange = _clearRange * noiseChangeRate;
            }

            // check forword
            var preVal = 0 ;
            if (i != 0 )
                preVal = pointList[i-1].val;
            var preI = pointList[i].val - preVal;
            var forVal = 1023;
            if (i != pointList.length-1)
                forVal = pointList[i+1].val;
            var forI = forVal - pointList[i].val;
            if ( value > ( pointList[i].val - preI * _clearRange) && 
                value < (pointList[i].val + forI * _clearRange) )
            {
                return 1;
            }

            if ( value > ( pointList[i].val - preI * _fadeRange ) && 
                value < ( pointList[i].val - preI * _clearRange ) )
            {
               return 1.0 * ( value - ( pointList[i].val - preI * _fadeRange ) ) / ( preI * ( _fadeRange - _clearRange) ) ;
            }

            if ( value > ( pointList[i].val + forI * _clearRange ) && 
                value < ( pointList[i].val + forI * _fadeRange ) )
            {
                return 1 - 1.0 * ( value - ( pointList[i].val + forI * _clearRange ) ) / ( forI * ( _fadeRange - _clearRange) ) ;
            }
        };
        return 0;
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

          console.log("Tem button " + buttonTempValue[tempButton]);
    }

    init();
    window.addEventListener('keypress', doKeyPress,false);

