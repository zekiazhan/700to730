          var text;// variable for the text div you'll create
          var socket = new WebSocket("ws://localhost:8081");
         
          function setup() {
            // The socket connection needs two event listeners:
             socket.onopen = openSocket;
             socket.onmessage = showData;
          }

          function openSocket() {
            text.html("Socket open");
            socket.send("Hello server");
          }

          function showData(result) {
              var res = result.data.toString();
              // console.log(res);
              var resArray = res.split("/");
              // convert result to an integer

              //all variable range is form 0-1023
              //1st knob - G
              pointOfView = int(resArray[0]);
              //2nd camera - W
              realityView = int(resArray[1]);
              //3rd camera for audio
              audioVolume = int(resArray[2]);
              // send a byte to get the Arduino to send new data
              socket.send('700 to 730');

              doKeyDown(pointOfView);
                // e.which = 103; // # Some key code value
                // $("input").trigger(e);
                // videos[0].show();
                // videos[1].show();
                // temOpacity -= 0.1;
                // videos[0].css("opacity",temOpacity);
                // videos[1].css("opacity",1-temOpacity);
            }