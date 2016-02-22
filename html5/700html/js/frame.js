(function (window) {
	'use strict';

	var document = window.document;
	var footageFloder = "../footage"
	var videoSources = [
		'Q',
		'W',
		'E']
	var extraSources = [
		'MQ',
		'MW',
		'ME'
	]
	var extraSource 
	var type = 'video/mp4'
	// var oriVideosPop = new Array(3);


	// record the static point of the original video
	var pointOfViewPoint = [
		0,
		128,
		512,
		900,
		1023,
	]
	var oriPoints = new Array(pointOfViewPoint.length);
	var oriVideos =  new Array(pointOfViewPoint.length-2);

	// record the static point of the extra video
	var realityViewPoint = [
		0,
		100,
		500,
		1000,
		1023,
	]
	var extraPoints = new Array(realityViewPoint.length);
	var extraVideos =  new Array(realityViewPoint.length-2);

	var Point = {
		createNew : function(_val , _video , _isReality) {
			var point = {};
			point.val = _val;
			point.video = _video;
			point.isReality = _isReality;
			return point;
		}
	};

	var clearRange = 0.3;

	var flickerEffectVideo;

	function init()
	{
		// init the div
		var videoFrame = document.createElement("div");
		videoFrame.className = "videoFrame";
		videoFrame.id = "mv";
		document.body.appendChild(videoFrame);
		// initilize original videos
		for (var i = 0; i < oriVideos.length; i++) {
			var videoPath = footageFloder + "/"+videoSources[i]+".mp4";
			var video = document.createElement("video");
			video.type = type;
			video.src = videoPath;
			// video.crossOrigin = 'anonymous';
			video.preload = 'none';
			video.id = 'oriVideo' + i;
			video.autoplay = true;
			// video.loop = true;
			// video.controls = true; //for debugging
			videoFrame.appendChild(video);

			oriVideos[i] = $('#'+video.id);
			if (i != 0)
				oriVideos[i].hide();

			console.log("create " + videoPath);
		};

		for (var i = 0; i < extraVideos.length; i++) {
			// var videoPath = footageFloder + "/"+videoSources[i]+".mp4";
			var video = document.createElement("video");
			video.type = type;
			video.src = videoPath;
			// video.crossOrigin = 'anonymous';
			video.preload = 'none';
			video.id = 'ExtraVideo' + i;
			video.autoplay = true;
			// video.loop = true;
			// video.controls = true; //for debugging
			videoFrame.appendChild(video);

			extraVideos[i] = $('#'+video.id);
			extraVideos[i].hide();
		};

		//TODO: For test
		extraVideos[0].attr("src", "../footage/MQ.mp4");
		extraVideos[1].attr("src", "../footage/MW.mp4");
		extraVideos[2].attr("src", "../footage/ME.mp4");

		// set up filter effect video
		var flickerPath = footageFloder + "/flicker_3s"+".mp4";
		var flicker = document.createElement("video");
		flicker.type = "video/mp4";
		flicker.src = flickerPath;
		flicker.loop = true;
		// video.crossOrigin = 'anonymous';
		flicker.preload = 'none';
		flicker.id = 'flicker';
		flicker.autoplay = true;

		videoFrame.appendChild(flicker);
		flickerEffectVideo = $("#"+flicker.id);
		flickerEffectVideo.hide();

		for (var i = oriPoints.length - 1; i >= 0; i--) {
			if ( i == oriPoints.length - 1 || i == 0 )
			{
				oriPoints[i] = Point.createNew(pointOfViewPoint[i],null,true);
			}else
			{
				oriPoints[i] = Point.createNew(pointOfViewPoint[i],oriVideos[i-1]);
			}
		};

		for (var i = extraPoints.length - 1; i >= 0; i--) {
			if ( i == extraPoints.length - 1 || i == 0 )
			{
				extraPoints[i] = Point.createNew(realityViewPoint[i],null,false);
			}else
			{
				extraPoints[i] = Point.createNew(realityViewPoint[i],extraVideos[i-1]);
			}
		};
		// setUpPoint
	}


    var transparentProcess = 0;


    function setTrans(videoA,videoB,process)
    {
    	console.log("process" + process.toString());
    	if (process > 1 ) process = 1;
    	if (process < 0 ) process = 0;


    	// hide all  the videos, orignal and extra
    	hideAll();

    	// set opacity of video A
    	if (videoA != null)
    	{
        	videoA.show();
        	videoA.css("opacity",process);
    	}

    	if (videoB != null)
    	{
        	videoB.show();
        	videoB.css("opacity",1-process);
    	}

    	//if the flicker effect is needed, then
    	if (process != 1 && process != 0)
    	{
	        flickerEffectVideo.show();
        	flickerEffectVideo.css("opacity", (process>0.5)? (1-process) * 2 : process*2);
    	}else
    	{
    		flickerEffectVideo.hide();
    	}
    }

    var pointOfView = 0;
    var realityView = 0;
    function doKeyPress(e){
          if (e.keyCode == 'w'.charCodeAt(0) || e.keyCode == 'W'.charCodeAt(0) )
          {
          	pointOfView += 40;
          	OnPointOfViewChange(pointOfView);
          }
          if (e.keyCode == 's'.charCodeAt(0) || e.keyCode == 'S'.charCodeAt(0) ) // g
          {
          	pointOfView -= 40;
          	OnPointOfViewChange(pointOfView);
          }


          if (e.keyCode == 'e'.charCodeAt(0) || e.keyCode == 'E'.charCodeAt(0) ) // g
          {
          	realityView += 20;
          	OnRealityViewChange(realityView);
          }
          if (e.keyCode == 'd'.charCodeAt(0) || e.keyCode == 'D'.charCodeAt(0) ) // g
          {
          	realityView -= 20;
          	OnRealityViewChange(realityView);
          }

          
          if (e.keyCode == 104 || e.keyCode == 72 ) // h
          {
            video[0].prop("currentTime",0);
          }
     }

     var isReality = true;
     // called when point of view changed
     // change the transfromation status of the video
     // (adjust the opacity)
     // pointOfView : int range  from 0..1023
     function OnPointOfViewChange(pointOfView)
     {
     	isReality = true;
     	setTransFromList(pointOfView,oriPoints,clearRange);
     }

      // called when reality view changed
     // change the transfromation status of the video
     // (adjust the opacity)
     // realityView : int range  from 0..1023
     function OnRealityViewChange(realityView)
     {
     	if ( isReality)
     	{
     		if (insertVideo() )
     		{
     			isReality = false;
     			setTransFromList(realityView,extraPoints,clearRange);
     		}
     	}else
     	{
     		setTransFromList(realityView,extraPoints,clearRange);
     	}
     }

     function insertVideo()
     {
     	console.log("insert video ");
     	removeReality(extraPoints);

     	var tempPoint = getTempPoint(oriPoints,pointOfView,clearRange);
     	if (tempPoint == null)
     		return false;
     	tempPoint.val = realityView ;

     	insertPoint(extraPoints,tempPoint);
     	return true;

     }

     // get the original film that is playing(in clear range)
     function getTempPoint(pointList,val,range)
     {
     	for ( var i = 1 ; i < pointList.length - 1 ; ++ i )
     	{
     		if (val > pointList[i].val - (pointList[i].val-pointList[i-1].val) * range
     			&& val < pointList[i].val + (pointList[i+1].val-pointList[i].val) * range)
     		{
     			var p = Point.createNew(pointList[i].val,pointList[i].video,pointList[i].isReality);
     			console.log("temp " + i.toString());
     			return p;
     		}

     	}
     	return null;
     }

     // insert point according to value
     function insertPoint(pointList,point)
     {

     	for ( var i = 0 ; i < pointList.length - 1 ; ++ i )
     	{
     		//console.log(point.val.toString() + " " + pointList[i].val.toString() + " " + pointList[i+1].val.toString());
     		if (point.val > pointList[i].val && point.val < pointList[i+1].val)
     		{
     			pointList.splice(i+1,0,point);
     			return;
     		}
     	}
     	pointList.splice(pointList.length,0,point);
     }

     // insert point according to value
     function removeReality(pointList)
     {

     	for ( var i = 0 ; i < pointList.length - 1 ; ++ i )
     	{
     		if (pointList[i].isReality)
     		{
     			var res = pointList[i];
     			pointList.splice(i,1);
     			return res;
     		}
     	}
     }

     function setTransFromList(value,pointList,range)
     {
     	for ( var i = 0 ; i < pointList.length - 1 ; ++ i )
     	{
     		// if the point of view in this range
     		if (value < pointList[i+1].val && value > pointList[i].val)
     		{
     			var interval = pointList[i+1].val-pointList[i].val-clearRange*2;
     			if (i == 0 )  // the first frame
     			{
     				var I = pointList[i+1].val-pointList[i].val;
     				var r = I * range;
     				var trans =  ( - value + pointList[i].val + I - r ) / ( I - r );
     				setTrans(pointList[i].video,pointList[i+1].video,trans);
     			}else if (i == pointList.length - 2 ) // the last frame
     			{
     				var I = pointList[i+1].val-pointList[i].val;
     				var r = I * range;
     				var trans = ( - value + pointList[i].val+ I ) / ( I - r );
     				setTrans(pointList[i].video,pointList[i+1].video,trans);
     			}else{ // frames between
     				var I = pointList[i+1].val-pointList[i].val;
     				var r = I * range;
         			var trans = ( - value +pointList[i].val + I -  r ) / ( I - 2 * r);
     				setTrans(pointList[i].video,pointList[i+1].video,trans);
     			}
     		}
     	}

     }

     function hideAll()
     {
     	for (var i = oriVideos.length - 1; i >= 0; i--) {
     		oriVideos[i].hide();
     	};

     	for (var i = extraVideos.length - 1; i >= 0; i--) {
     		extraVideos[i].hide();
     	};
     }

    // window.addEventListener('keydown',this.doKeyDown,false);
    window.addEventListener('keypress', doKeyPress,false);
    // window.addEventListener('keyup',this.doKeyUp,false);

	init();

})(window);