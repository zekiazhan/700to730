    var footageFloder = "footage";
    var vSourceIndex = 0 ;
    var flickerSource = "NoiseIII";
    var videoType = "mp4";
    var videoSuffix = ".mp4";

    // var footagePaths = [
    //     [0,'01',0,20],
    //     [0,'02',20,40],

    // ]

    var FOOTAGE_ID = 0;
    var FOOTAGE_PATH = 1;
    var FOOTAGE_START_TIME = 2;
    var FOOTAGE_END_TIME = 3;

    // var videoSources = [
    //     ['ME_c',0,0,0,20],
    //     ['ME_c',0,2,0,20],
    //     ['Q',0,3,0,20],
    //     ['2s',0,1,0,15],
    //     ['MQ',0,1,0,15],
    //     ['MW',0,1,15,30],
    //     ['ME',0,1,15,30],
    // ]

    var VIDEO_NAME = 0;
    var VIDEO_BUTTON_NUM = 1;
    var VIDEO_SCALE_NUM = 2;
    var VIDEO_START_TIME = 3;
    var VIDEO_END_TIME = 4;

    // current time
    var currentTime = 0 * 0 * 1000 ; //start time

    // the scale of the videos 
    var ButtonConstruct = [
        [200,512,750]
    ]

    // var ButtonNoisePoint = [
    //     [2]
    // ]
    var ButtonMainPoint = [
        [1]
    ]

    var MainVideoPaths = 
    [
        "../footage/Z.mp4",
        "../footage/AK.mp4" ,
    ]
    var outPath = "../footage/OOCDEMO.mp4";
    var endMusicPath = "../footage/EndingMusic.mp3";

    var mainVideoScaleBefore = ( 12 * 60  ) / ( 8 * 50 );
    var mainVideoScaleAfter  = ( 29 * 60 - 17 * 60  ) / ( 18 * 50 - 12 * 50 );

    var timeBlockDuration = 50;
    var MainVideoFliter =
    [
		[0,10],
        [65,90], //Play Z:1-15
		[106,225],//1min 45 -3min 45
		[300,335],//5min -  5min 35s
		[360,420],// 6min- 7min
		[450,520],//7min30s- 8min 40
		[592,600],
        // OOC
		[1015,1075],//16min55s-17min 55s
		[1320,1440],//22min-24m
		[1680,1740],//27min,28min
    ]

    var MainVideoTimeBlock =
    [
    	[0,45],// 7
    	[45,90],// 8- 1min 307
    	[90,210],//9 - 3min 30
    	[210,350],//10,5min 50
    	[350,420],//11,7min
    	[420,510],//12,8min 30
    	[510,645],//13,10min 45
    	[645,685],//14,10min 45- 11min25
    	[685,735],//OOC 01
    	[735,785],//OOC 02
    	[785,835],//OOC 03
    	[835,885],//OOC 04
    	[885,1025],//ooc 05
    	[1025,1320], //19, to 22min
    	[1320,1400],//20,23:20
    	[1400,1440],//21,
    	[1440,1650],//22,
    	[1650,1700],//23,27:30
    	[1700,1735],//24,28:20// more indsert for ooc; time wrong for ending, ending music cut by inserts

    	

    ]

    ///// clearRange //////
    var clearRangeMin = 0.3; ////???????????? abt noise
    var clearRangeMax = 0.499999;
    var clearRangeChangeTime = 5 * 60;

    ///// volume //////
    var maxVolum = 0.5;

    //// out of control ////
    var outOfControlTime = [ 8 * 50 , 13 * 50]; // !!!!!!!!out of control begin & end

    /// end music ///
    var endMusicTime = ( 22 * 60 + 50 ) ;
    var isEndMusic = 0 ;

    var keypressButtonChange = 25;
    var clearRange = 0.2;
    var fadeRange = 0.5;
    var noiseChangeRate = 0.33;
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
           
            if ( this.myType == 'main' )
            {
                if ( !isOutOfControl )
                {
                    this.video.attr('src', MainVideoPaths[getTemMainVideoID()]);
                    var vidTime = GetMainVideoTime(currentTime);
                    this.video[0].currentTime = vidTime;
                }else
                {
                	if ( this.video.attr('src') != outPath ) {
	                    this.video.attr('src', outPath );
                    	this.video[0].currentTime = currentTime * 0.001 - outOfControlTime[0];
                	}

                }
            }
            else
            {

             	var path = "";
             	if (this.videoList.length > 0 ) {
             		var rand = Math.floor(Math.random()*this.videoList.length);
             		path = this.videoList[rand];
             	}
             	
                if (path != "")
                {
                    var time = path.split('_')[1];
                    var timeF = parseFloat(time.substring(0,time.length-1));
                    console.log("set timeF " + timeF);
                    this.video.attr('src' , path);
                    this.video[0].currentTime = Math.random() * timeF ;
                }
             }

              console.log("[ EnterPoint ] myId =  " + this.myId + " myType = " + this.myType + " src = " + this.video.attr('src'));

        }
        
        return point;
     }

    };

    function GetMainVideoTime( playTime )
    {
    	var index = parseInt( playTime * 0.001 / timeBlockDuration);
    	var percentage = playTime * 0.001 / timeBlockDuration - index;
    	if ( MainVideoTimeBlock.length > index )
    	{
    		var timeInVideo = MainVideoTimeBlock[index][1] - MainVideoTimeBlock[index][0];
    		return timeInVideo * percentage + MainVideoTimeBlock[index][0];
    	}

    	
    	return  (playTime * 0.001 > outOfControlTime[1]) ?
                     (playTime * 0.001 - outOfControlTime[1] ) * mainVideoScaleAfter  + 17 * 60 :  
                     playTime * 0.001 * mainVideoScaleBefore;
    }

    var MyButton = {
     createNew : function(_pointList) {
         var button = {};
         button.pointList = _pointList;
         return button;
     }
    }

    var videoFrame;
    var vFlicker;
    var aOutOfControl;
    var buttons;

    function getTemMainVideoID()
    {
        for (var i = MainVideoFliter.length - 1; i >= 0; i--) {
            if ( GetMainVideoTime( currentTime ) >= MainVideoFliter[i][0] && GetMainVideoTime( currentTime )  < MainVideoFliter[i][1] )
                return 0;
        };
        return 1;
    }

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
        flicker.type = "mp4";
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
                video.preload = 'auto';
                video.loop = true;
                video.id = 'video-'+i.toString()+'-'+j.toString();
                video.autoplay = true;
                videoFrame.appendChild(video);

                var v = $('#'+video.id);
                
                // create a new point
                var p = Point.createNew(ButtonConstruct[i][j],v,video.id);
                hideVideo(p);
                // append the point to point list
                pl[pl.length]=p;
            }

            // for (var j = 0 ; j < ButtonNoisePoint[i].length ; j++)
            // {
            //     pl[ButtonNoisePoint[i][j]].myType = "noise";
            // }
            for (var j = 0 ; j < ButtonMainPoint[i].length ; j++)
            {
                pl[ButtonMainPoint[i][j]].myType = "main";
                pl[ButtonMainPoint[i][j]].video[0].loop = false;
                pl[ButtonMainPoint[i][j]].EnterPoint();
                showVideo(pl[ButtonMainPoint[i][j]]);
                tempPoint = pl[ButtonMainPoint[i][j]];
                pl[ButtonMainPoint[i][j]].video[0].addEventListener('ended', function(e){
                	console.log("go to end");
                    GotoEnd();
                }, false);
            }
        };


        // add music
        {
            var music = document.createElement("audio");
            music.src = endMusicPath;
            music.type = "mp3"
            music.id = 'end-music';
            music.autoplay = false;
            videoFrame.appendChild(music);
        }


        // start update the program
        setInterval(function() {
            update();
        }, 1000/FPS );



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
    var lastPoint;
    var isOutOfControl = 0;
    var isBegined = 0;
    function update()
    {
        // update noise
        var p = getClearPoint(buttonTempValue[tempButton],buttons[tempButton].pointList);
        
        if ( p != null )
        {

        	if ( !isBegined )
        	{
        		if ( p.myType == "main" 
        			&&  getClearness(buttonTempValue[tempButton],buttons[tempButton].pointList) > 0.99 )
        		{ 
        			isBegined = 1;
        		}
        	}
        }
        if ( p != null && ( lastPoint == null || p.myId != lastPoint.myId))
        {
        	if ( isBegined )
	        	p.EnterPoint();

        }
        lastPoint = p;

        // change the noise filter by scale
        if ( isBegined )
        {
	        if (p == null ) // video not found
	        {
	            noiseOpacity = 1;
	        }else // video found
	        {
	            noiseOpacity = 1 - getClearness(buttonTempValue[tempButton],buttons[tempButton].pointList);
	            // console.log("noise opacity " + noiseOpacity);
	            if ( tempPoint != p )
	            {
	                if ( tempPoint != null )
	                    hideVideo(tempPoint);
	                showVideo(p);
	                tempPoint = p;
	            }
	        }
    	}else
    	{
    		noiseOpacity = 0;
    	}



        if ( noiseOpacity < 0 ) noiseOpacity = 0;
        if ( noiseOpacity > 1 ) noiseOpacity = 1;
        vFlicker.css("opacity",noiseOpacity);
        vFlicker[0].volume = noiseOpacity * maxVolum;

        if ( tempPoint != null )
        {
            tempPoint.video[0].volume =  maxVolum;
        }

        //update main video volume
        buttons[0].pointList[ButtonMainPoint[0]].video[0].volume = maxVolum;

        // update videos
        currentTime += 1000 / FPS;

        // remove videos
	    for (var i = videoSources.length - 1; i >= 0; i--) {

	    	if ( (currentTime / 1000 ) > videoSources[i][VIDEO_END_TIME] ) {
                // console.log(videoSources[i][VIDEO_END_TIME]);
	    		removeVideoBySource(videoSources[i]);
                videoSources[i][VIDEO_END_TIME] = 99999999;
            }
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
                videoSources[vSourceIndex][VIDEO_START_TIME] = 9999999;
                vSourceIndex++;
            }
       //  console.log(buttonTempValue + " " + tempButton.toString() + " " + noiseOpacity.toString());
        // if (tempPoint != null)
        //     console.log(tempPoint.myId);

        // update clear range
        clearRange = clearRangeMin +  ( currentTime  * 0.001 / clearRangeChangeTime ) * (clearRangeMax - clearRangeMin);
    
        //check ending
        if ( currentTime > 17 * 60 * 1000 )
            GotoEnd();

        // out of control
        if ( currentTime * 0.001 > outOfControlTime[0] && currentTime * 0.001 < outOfControlTime[1] )
        {
            var last = isOutOfControl;
            isOutOfControl = 1;
            console.log(isOutOfControl + " " + last);
            if ( last != isOutOfControl )
            {
                EnterOutOfControl();
            }
        }else{
            var last = isOutOfControl;
            isOutOfControl = 0;
            if ( last != isOutOfControl )
            {
                ExitOutOfControl();
            }
        }

        if ( currentTime * 0.001 > endMusicTime && isEndMusic == 0 )
        {
            isEndMusic = 1;
            $('#end-music')[0].play();
        }

        // update the state of the controller
        if ( currentTime * 0.001 > 1 && currentTime * 0.001 < outOfControlTime[0] )
        {
            socket.send('2'); // set the controller to part one
        } else if ( currentTime * 0.001 > outOfControlTime[1] )
        {
            socket.send('4'); // set the controller to part two
        }else if ( isOutOfControl )
        {
            socket.send('3');
        }
    }

    function EnterOutOfControl()
    {
    	console.log('[ EnterOutOfControl ] currentTime = ' + currentTime);
    	socket.send('3');
        for (var i = buttons[0].pointList.length - 1; i >= 0; i--) {
           if ( buttons[0].pointList[i].myType == "main" )
           {
                buttons[0].pointList[i].EnterPoint();
           }
        }
    }

     function ExitOutOfControl()
    {
    	console.log('[ ExitOutOfControl ] currentTime = ' + currentTime);
    	socket.send('4');
        for (var i = buttons[0].pointList.length - 1; i >= 0; i--) {
           if ( buttons[0].pointList[i].myType == "main" )
           {
                buttons[0].pointList[i].EnterPoint();
           }
        }
    }

    function removeVideoBySource(sourceInfo)
    {
        var path = video2path(sourceInfo[VIDEO_NAME]);
        var Ibtn = sourceInfo[VIDEO_BUTTON_NUM];
        var Jscl = sourceInfo[VIDEO_SCALE_NUM];

        var point = buttons[Ibtn].pointList[Jscl];

        var i = point.videoList.indexOf(path);

        console.log("remove video " + point.myId + " " + path + " " + i);
        if ( i != -1) {
        	point.videoList.splice(i,1);
        }
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
        // p.video.hide();
        p.video.css("opacity",0);
        /// p.video[0].volume = 0;
    }

    function showVideo(p)
    {
        // p.video.show();
        p.video.css("opacity",1);
        // p.video[0].volume = 1;
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
        if ( buttonTempValue[0] < 1023)
            buttonTempValue[0] += keypressButtonChange;
        tempButton = 0;
      }


      if (e.keyCode == 'e'.charCodeAt(0) )
      {
        buttonTempValue[1] += keypressButtonChange;
        if ( maxVolum < 0.99)
            maxVolum += 0.1;
        // tempButton = 1;
      }

      if (e.keyCode == 'r'.charCodeAt(0) )
      {
        buttonTempValue[2] += keypressButtonChange;
        // tempButton = 2;
      }

      if (e.keyCode == 's'.charCodeAt(0) )
      {
        if ( buttonTempValue[0] > 1)    
            buttonTempValue[0] -= keypressButtonChange;
        tempButton = 0;
      }

      if (e.keyCode == 'd'.charCodeAt(0) )
      {
        buttonTempValue[1] -= keypressButtonChange;
        if ( maxVolum > 0.01)
            maxVolum -= 0.1;
        // tempButton = 1;
      }

      if (e.keyCode == 'f'.charCodeAt(0) )
      {
        buttonTempValue[2] -= keypressButtonChange;
        // tempButton = 2;
      }

      if ( e.keyCode == 'k'.charCodeAt(0) )
      {
      	if ( clearRange < 0.4 )
          	clearRange = 0.499
        else 
        	clearRange = 0.2
      }

      if ( e.keyCode == 'g'.charCodeAt(0)  )
      {
        GotoEnd();
      }

      if (e.keyCode == 'p'.charCodeAt(0) )
      {
        if (isPlaying)
            PauseAll();
        else
            PlayAll();
      }

      if ( e.keyCode >= '0'.charCodeAt(0) && e.keyCode <= '9'.charCodeAt(0) )
      {
        var str = String.fromCharCode(e.keyCode);
        socket.send(str);
      }

      if (e.keyCode == 'i'.charCodeAt(0))
      {
        console.log("******** [Info] ********");
        console.log("currentTime " + (currentTime / 1000) );
        console.log("noiseOpacity " + noiseOpacity);
        console.log("volume " + maxVolum);
        if ( tempPoint != null)
        {
            console.log("temp point " + tempPoint.myId );
            console.log("current video " + tempPoint.video[0].src);
            for (var i = tempPoint.videoList.length - 1; i >= 0; i--) {
                console.log("video list " + i + " " + tempPoint.videoList[i]);
            }
        }
        console.log("isOutOfControl " + isOutOfControl);
        console.log("isBegined " + isBegined);
        console.log("clearRange " + clearRange);
        console.log("******** [end] ********");
       
      }
    }

    function GotoEnd()
    {
         // window.location.href='ending.html' + '?vol=' + maxVolum;
    }

    var isPlaying = 1;
    function PlayAll()
    {
        isPlaying = 1;
    }

    function PauseAll()
    {
        isPlaying = 0;
    }


    function UpdateButtonValue (btnValue) {
       buttonTempValue[0] = btnValue;
    }

    function UpdateVolumeValue (volValue) {
       maxVolum = volValue /1024;
    }

    init();
    window.addEventListener('keypress', doKeyPress,false);

