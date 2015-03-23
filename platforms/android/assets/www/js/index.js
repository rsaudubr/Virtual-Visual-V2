
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
    var src = '/android_asset/www/stuff.mp3';
    try {
            myMedia = new Media(src, null, null, null);
    }
    catch(err) {
        alert("An error has occurred "+ err);
    }
    alert(myMedia);
    alert(myMedia.duration);
}

//This function enable or disable the bluetooth
function setBluetooth(){
    cordova.plugins.locationManager.isBluetoothEnabled()
       .then(function(isEnabled){
       console.log("isEnabled: " + isEnabled);
       if (isEnabled) {
           cordova.plugins.locationManager.disableBluetooth();
       } else {
           cordova.plugins.locationManager.enableBluetooth();        
       }
    })
    .fail(console.error)
    .done();
}


//Create a BeaconRegion data transfer object.
function createBeacon() {

    var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9'; // mandatory
    var identifier = 'beaconAtTheMacBooks'; // mandatory
    var minor = 1000; // optional, defaults to wildcard if left empty
    var major = 5; // optional, defaults to wildcard if left empty

    // throws an error if the parameters are not valid
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

    alert(beaconRegion);

    return beaconRegion;   
} 


//this function scan for any revice.
//return the name, the adress and the type (only bluetooth for the moment)
function scanDevice(){
    alert("play an audio file while searching device");
    radlib.scan(printScan,failureScan, ["BLUETOOTH"]);
}

//this function is call when the scan succeed
function printScan(devices){
    alert("Scan succeed");
    connect();
   for(var i = 0; i < devices.length; i++){
      alert("Name: " + devices[i].name + "\n" + 
            "Address: " + devices[i].address + "\n" +
            "ConnectionType: " + devices[i].connectionType);
   }
   alert("play an audio file maybe");
}



//this function is call when the scan fail
function failureScan(failureMsg){
    alert("Can't scan :" + failureMsg);
}

//this function try to connect with the device found
function connect(){
    alert('this function probably need a parameter');
    radlib.connect(printConnect,failureConnect,readerObj);
}


//This function is call if the connection succeed
function printConnect(obj){
    alert('still succeed but nothing to connect :/');
    /*document.getElementById("display").innerHTML = "ID: " + obj.id + "<br>" +
                                        "Reader: " + obj.reader + "<br>" +
                                        "Time: " + obj.time + "<br>" +
                                        "Date: " + obj.date + "<br>" +
                                        "Frame: " + obj.frame + "<br>" +
                                        "Friendly Name: " + obj.friendlyName + "<br>";*/
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
