
var myMedia = null;


function stopAudio() {
    myMedia.stop();

}

function play(file) {
    
    var src = file;
    // Clean up old file
    if (myMedia != null) {
        myMedia.release();
    }



    myMedia = new Media(src, stopAudio, null);
    window.setTimeout(function() {
        alert(myMedia.getDuration());
        myMedia.play();
    }, 500); 


}

function  fileDuration(file){
    var src = 'stuff.mp3';
    try {
            myMedia = new Media(src, null, null, null);
    }
    catch(err) {
        alert("En fait c'est une grosse blague qui me fait perdre plein de temps...");
    }
    alert(myMedia);
    alert(myMedia.duration);
}


var app = {
    // Application Constructor
    initialize : function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents : function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady : function() {
        
        var tagEvent = document.getElementById("tagEvent");
        
        app.receivedEvent('deviceready');

        // Read NDEF formatted NFC Tags
        nfc.addNdefListener(function(nfcEvent) {
            var tag = nfcEvent.tag, ndefMessage = tag.ndefMessage;

            var tag = nfc.bytesToString(ndefMessage[0].payload).substring(3);
            
            tagEvent.innerHTML = '<p class="event tag">Tag detected : '+ tag +'</p>';
            tagEvent.className = "fade-in";
            
            var tagTimeout = window.setTimeout(function(){
                tagEvent.className = "fade-out";
                
            }, 2000);

            console.log(tag);

            switch (tag) {
            case "1":
                play('entrance.mp3');
                break;
            case "2":
                play('metalwork.mp3');
                break;
            case "3":
                play('science.mp3');
                break;
            case "4":
                play('library.mp3');
                break;
            case "5":
                play('woodwork.mp3');
                break;
            case "6":
                play('reception.mp3');
                break;
            default:
                console.log("unknown tag");
                break;
            }

/*

            if (tag == '12345') {

                var audio_src = "/android_asset/www/audio/4.mp3";

                function mediaError(e) {
                    alert('Media Error');
                    alert(JSON.stringify(e));
                }

                // alert("in the woodwork room");

                // new Audio('/android_asset/www/audio/4.mp3').play();

                //document.getElementById('demo').play()
            } else if (tag == 'a12345') {
                var audio_src = "/android_asset/www/audio/5.mp3";
            } else {
                alert("Somewhere else");
            }

            var media = new Media(audio_src, null, mediaError);
            media.play();*/


        }, function() {// success callback
            // alert("Waiting for NDEF tag");
        }, function(error) {// error callback
            // alert("Error adding NDEF listener " + JSON.stringify(error));
        });
    },
    // Update DOM on a Received Event
    receivedEvent : function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};
