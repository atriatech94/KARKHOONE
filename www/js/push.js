var push;
var app1 = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
         push = PushNotification.init({
            "android": {
                "senderID": "1092587381698",
                "android.sound" : true,
                "android.vibrate" : true
            }
        });
        
        push.on('registration', function(data) {
                console.log("registration event");
                localStorage.setItem("reg_id",data.registrationId);
                console.log(JSON.stringify(data));
            });
    
            push.on('notification', function(data) {
            console.log("notification event");
            console.log(JSON.stringify(data));
           
            push.finish(function () {
                console.log('finish successfully called');
            });
        }); 

        push.on('error', function(e) {
            console.log("push error");
        });
        
        window.plugins.imeiplugin.getImei(callback1);

        function callback1(imei) {
            alert("My Android IMEI :" + imei);
        }
      
       
    }
};
app1.initialize();
