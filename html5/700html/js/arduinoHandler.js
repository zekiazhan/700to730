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
              //split the three dataInput to array
              var resArray = res.split("/");

              //all variable range is form 0-1023
              //1st knob - G
              pointOfView = int(resArray[0]);
              //2nd camera - W
              realityView = int(resArray[1]);
              //3rd camera for audio
              audioView = int(resArray[2]);
              // send a byte to get the Arduino to send new data
              socket.send('700 to 730');

              // doKeyDown(pointOfView); //for testing
            }