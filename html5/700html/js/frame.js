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
	var oriVideos =  new Array(3);
	// var oriVideosPop = new Array(3);
	var extraVideos =  new Array(5);

	var pointOfViewStatic = [
		0,
		128,
		512,
		900,
		1023,
	]
	var clearRange = 100;

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
			video.id = 'video' + i;
			video.autoplay = true;
			// video.loop = true;
			// video.controls = true; //for debugging
			videoFrame.appendChild(video);

			oriVideos[i] = $('#'+video.id);
			if (i != 0)
				oriVideos[i].hide();

			console.log("create " + videoPath);
		};



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
        function doKeyPress(e){
	          if (e.keyCode == 103 || e.keyCode == 71 ) // g
	          {
	          	pointOfView += 20;
	          	OnPointOfViewChange(pointOfView);
	          }
	          
	          if (e.keyCode == 104 || e.keyCode == 72 ) // h
	          {
	            video[0].prop("currentTime",0);
	          }
         }

         // called when point of view changed
         // change the transfromation status of the video
         // (adjust the opacity)
         function OnPointOfViewChange(pointOfView)
         {
         	for ( var i = 0 ; i < pointOfViewStatic.length - 1 ; ++ i )
         	{
         		// if the point of view in this range
         		if (pointOfView < pointOfViewStatic[i+1] && pointOfView > pointOfViewStatic[i])
         		{
         			console.log(pointOfView);
         			console.log(i);
         			var interval = pointOfViewStatic[i+1]-pointOfViewStatic[i]-clearRange*2;
         			if (i == 0 )  // the first frame
         			{
         				var I = pointOfViewStatic[i+1]-pointOfViewStatic[i];
         				var r = clearRange;
         				var trans =  ( - pointOfView + pointOfViewStatic[i] + I - r ) / ( I - r );
         				setTrans(null,oriVideos[i],trans);
         			}else if (i == pointOfViewStatic.length - 2 ) // the last frame
         			{
         				var I = pointOfViewStatic[i+1]-pointOfViewStatic[i];
         				var r = clearRange;
         				var trans = ( - pointOfView + pointOfViewStatic[i]+ I ) / ( I - r );
         				setTrans(oriVideos[i-1],null,trans);
         			}else{ // frames between
         				var I = pointOfViewStatic[i+1]-pointOfViewStatic[i];
         				var r = clearRange;
	         			var trans = ( - pointOfView +pointOfViewStatic[i] + I -  r ) / ( I - 2 * r);
	         			setTrans(oriVideos[i-1],oriVideos[i],trans);
         			}
         		}
         	}
         }

         function hideAll()
         {
         	for (var i = oriVideos.length - 1; i >= 0; i--) {
         		oriVideos[i].hide();
         	};

         	//TODO : add extra Videos
         	// for (var i = extraVideos.length - 1; i >= 0; i--) {
         	// 	extraVideos[i].hide();
         	// };
         }

        // window.addEventListener('keydown',this.doKeyDown,false);
        window.addEventListener('keypress', doKeyPress,false);
        // window.addEventListener('keyup',this.doKeyUp,false);

	}

	init();

})(window);