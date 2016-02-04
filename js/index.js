
document.addEventListener("backbutton",amintest, false);
/*window.addEventListener("hashchange", hashCheck, false);

function hashCheck(){
	if(location.hash === "#/select"){
		if(localStorage.getItem("user_id")){
                        window.location.hash = "#/wall";
                        return false;
                    }
	}
}*/
//var moment = require('moment-jalaali');
moment.loadPersian();
var socket;
var ofset_msg;
var is_req;
var msg_id = 0;
var appends = '';
var days3 = moment().subtract(24, 'hour').valueOf() ;


function init(member_id, callback) {
    var host = "ws://atriaweb.ir:9000/socket/chatServer.php"; // SET THIS TO YOUR SERVER
    try {
        socket = new WebSocket(host);
        console.log('WebSocket - status '+socket.readyState);
        socket.onopen    = function(msg) { 
            //log("Welcome - status "+this.readyState); 

            var command = 'join';
            var msg = JSON.stringify({'command':command, 'member_id':member_id});
	   						  
            socket.send(msg);
        };
        socket.onmessage = function(msg) { 
            var message = JSON.parse(msg.data);
								
            if(message.command == "new_message"){
                //when user receive message from server
                
                if(localStorage.getItem('user_id') == message.msg_you_id && $('.logo_name').attr('your_id') == message.msg_me_id){
                	if(window.location.hash == "#/msg_detail")
                		socket.send(JSON.stringify({'command':'make_msg_as_read', 'msg_insert_id':message.msg_insert_id, 'msg_id':message.msg_id}));
	                var appends = '<div class="msg_one you" id="msg-'+message.msg_id+'" >';
	                appends += '<div class="msg_one_text">'+message.txt+'</div>';
	                appends += '<div class="msg_one_plugin"><span class="send"></span><span class="time">'+moment(message.send_time).calendar()+'</span></div></div>';
	                                  
	                $('.msg_list_chat').append(appends);
	                $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
	            }/*else if ( $('.reza_chat_detail  .msg_list_chat').attr('msg_chat_id') == ""  ){
	            	$('.msg_list_chat').attr('msg_chat_id', message.chat_id);
	            	if(window.location.hash == "#/msg_detail")
                		socket.send(JSON.stringify({'command':'make_msg_as_read', 'msg_insert_id':message.msg_insert_id, 'msg_id':message.msg_id}));
	                var appends = '<div class="msg_one you" id="msg-'+message.msg_id+'" >';
	                appends += '<div class="msg_one_text">'+message.txt+'</div>';
	                appends += '<div class="msg_one_plugin"><span class="send"></span><span class="time">'+moment(message.send_time).calendar()+'</span></div></div>';
	                                  
	                $('.msg_list_chat').append(appends);
	                $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
	            }*/

            }else if(message.command == "new_message_result_callback"){
                //feedbacks of sending message is passed to sender
                var appends = '<div class="msg_one me" id="msg-'+message.sender_msg_id+'" >';
                appends += '<div class="msg_one_text">'+message.txt+'</div>';
                appends += '<div class="msg_one_plugin"><span class="send see-'+message.is_read+'"></span><span class="time">'+moment(message.insert_date).calendar()+'</span></div></div>';
                $('.msg_list_chat').append(appends);
                $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
                $("#p-"+message.msg_id).removeClass("already").addClass("see-1");
                $("#p-"+message.msg_id).next("span").text(moment(message.insert_date).calendar());
            }else if(message.command == "all_past_messages"){
                //returns all messages from database
                fetch_msg(message.msg_scroll, message.datas);
            }else if(message.command == "all_readed_by_partner"){
                $(".me span").removeClass("see-0").addClass("see-1");
            }else if(message.command == "msg_is_read"){
            	$("#msg-"+message.msg_id+" .send ").removeClass("see-0").addClass("see-1");
            }				   
        };							
	   	socket.onerror = function(e){
            socket = null;
        }						
        socket.onclose   = function(msg) { 
            console.log("Disconnected - status "+this.readyState);
            socket = null;
        };

        if(callback) 
        	callback();
	}
    catch(ex){ 
		console.log(ex); 
	}

	
	//$("msg").focus();
}
var number_of_socket_creation_tries_send = null;
function send(me_id, you_id, command, txt){
	var msg;
	msg_id++;
	//var command = 'send';
	// msg = txt.value;
	msg = JSON.stringify({'command':command, 'txt':txt, 'me_id':me_id, 'you_id':you_id, 'msg_id': msg_id});
	
	if(!socket){
		if(number_of_socket_creation_tries_send === null)
			number_of_socket_creation_tries_send = 0;

		if(number_of_socket_creation_tries_send >= 5){
			console.log('check your internet, and try later');
			number_of_socket_creation_tries_send = null;
		}

		init(me_id, function(){
			try { 
				socket.send(msg); 
				number_of_socket_creation_tries_send = null;
			}catch(ex) { 
				if(ex.name == "InvalidStateError"){
					setTimeout(function(){
						number_of_socket_creation_tries_send++;
						send(me_id, you_id, command, txt);
						
					}, 500);
					 
				} 
			}
		});
	}else{
		try { 
			socket.send(msg); 
			console.log('Sent: '+txt);
			number_of_socket_creation_tries_send = null; 
		} catch(ex) { 
			if(ex.name == "InvalidStateError"){
				setTimeout(function(){
					number_of_socket_creation_tries_send++;
					send(me_id, you_id, command, txt);

				}, 500); 
			} 
		}
	}
	
	
}
function quit(){
	if (socket != null) {
		// log("Goodbye!");
		socket.close();
		socket=null;
	}
}


var number_of_socket_creation_tries_msg = null;
function fetch_msg_websocket(me_id, you_id, msg_scroll){
	command = 'get_past_msg';
	msg = JSON.stringify({'command':command, 'me_id':me_id, 'you_id':you_id, 'ofset_msg': ofset_msg, 'msg_scroll': msg_scroll});

	if(!socket){
			if(number_of_socket_creation_tries_msg === null)
			number_of_socket_creation_tries_msg = 0;

			if(number_of_socket_creation_tries_msg >= 5){
				console.log('check your internet, and try later');
				number_of_socket_creation_tries_msg = null;
			}	
			init(me_id, function(){
				try { 
					socket.send(msg);
					number_of_socket_creation_tries_msg = null;  
				} catch(ex) { 
					if(ex.name == "InvalidStateError"){
						setTimeout(function(){
							number_of_socket_creation_tries_msg++;
							fetch_msg_websocket(me_id, you_id, msg_scroll);
						}, 500);  
					}  
				}
			});
	}else{
		try { 
			socket.send(msg);
			number_of_socket_creation_tries_msg = null;  
		} catch(ex) { 
			if(ex.name == "InvalidStateError"){
				setTimeout(function(){
					number_of_socket_creation_tries_msg++;
					fetch_msg_websocket(me_id, you_id, msg_scroll); 
				}, 500);	
			} 
		}
	}
	
}
function fetch_msg(msg_scroll, data){
	

    $('body .lpro').addClass("none");
    //$.get(base_url+"/api_chat/get_chat/ChetGet-098HYT65VC-C276/"+scope.user_id+"/"+scope.user_info[0].member_id+"/"+ofset_msg,function(datas){
    //var data = JSON.parse(datas);
        if(data.length > 0 )
        {

        	

            data.forEach(function(element, index){
            	if(element){

	                element.dates =    moment(element.date).calendar(); 
	                
	                if(element.msg_me_id == localStorage.getItem('user_id') ){
	                    var appends = '<div class="msg_one me" id="msg-'+element.msg_id+'" >';
	                    appends += '<div class="msg_one_text">'+element.msg_txt+'</div>';
	                    appends += '<div class="msg_one_plugin"><span class="send see-'+element.is_read+'"></span><span class="time">'+element.dates+'</span></div></div>';

	                }else{
	                    var appends = '<div class="msg_one you" id="msg-'+element.msg_id+'" >';
	                    appends += '<div class="msg_one_text">'+element.msg_txt+'</div>';
	                    appends += '<div class="msg_one_plugin"><span class="send"></span><span class="time">'+element.dates+'</span></div></div>';
	                }
	                $('.msg_list_chat').prepend(appends);
	               
	                if(ofset_msg==0){
	                    $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
	                }
	                else{
	                    $('.msg_list_chat').animate({scrollTop: $("#"+msg_scroll).offset().top},0);
	                }
	            }else{
	            	console.log('null');
	            }
            });

			is_req = 0;
            ofset_msg += 20;
            
            
        } /*end if*/                     
}

function amintest(){

    var loc =   window.location.hash;
    loc = loc.replace("#/", "");
    
    loc = loc.split('/');
    loc = loc[0] ;
	
	var socket;
    if($('body .lpro').hasClass('none'))
    {
        return false;
    }
    if($.fancybox.isOpen)
	{
		$.fancybox.close();
		return false;
	}
    if(loc == "wall" || loc == "select")
    {
        
        if (confirm("آبا برای خروج اطمینان دارید") == true) {
            navigator.app.exitApp();
        }        
        return false;
    }
    else if(loc == "forget_pass" || loc == "register_one" || loc == "register_two" || loc == "register_three" || loc == "myprofile" || loc == "mycv" || 
           loc == "edit_info" || loc == "follower" || loc == "following" || loc == "search_result" || loc == "mycv" ||  loc == "msg" || loc == "msg_detail"   )
    {
         window.history.back() ;
    }
    else if(loc == "login")
    {
         window.location.hash = "#/select";
    }
    else
    {
	    //window.location.hash = "#/wall";
    }
    return false;
    
    

}
$(document).ready(function(){
	
	
	// if(localStorage.getItem("user_id") !== null){
	// 	alert(localStorage.getItem("is_user_online"));
	// 	if(!localStorage.getItem("is_user_online")){
	// 		alert('fuck');
	// 		var user_id = localStorage.getItem("user_id");
				
	// 		localStorage.setItem("is_user_online", true);	
	// 		console.log("join " + user_id);
	// 	}
	// }
    height();
    $(window).on("resize",function(){
        height();
    });
    $('body').on("click",function(){
        //if($(".alert").css("display")!= "none"){$(".alert").fadeOut(300)}
    });
    $('.alert').on("click",function(){
        if(!$(this).hasClass("none")){$(this).addClass('none');}
    });
});

function height()
{
    var heigh100 =  $(window).height()+"px";
    $(".height100").css( "height" , heigh100 );
}
function exit()
{
    localStorage.clear();
    quit();
    window.location.hash = "#/select";
}

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
        //etc
        return true;
    }
    return false;
}
function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
        // etc
        return true;
    }
    return false;
}
function show_anim(){$('body .loader_css').addClass('start_animation');}
function hide_anim(){$('body .loader_css').removeClass('start_animation');}

/*===============================================================*/
$.ajaxSetup({
    timeout: 15000,
});

/*===============================================================*/
function resize_image(revent,vars){
	   
    var file = revent.target.files[0];
    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        console.log('An image has been loaded');

        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 800,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                  //  var dems
                    if (width > height){
                        if (width > max_size){
                            height *= max_size / width;
                            width = max_size;

                        }
                    }else{
                        if (height > max_size){
                            width *= max_size / height;
                            height = max_size;
                        }
                    }
                canvas.width = width;
                canvas.height = height;
                
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl);
                $.event.trigger({
                    type: vars ,
                    blob: resizedImage ,
                });
            }
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    }
	
		var dataURLToBlob = function(dataURL) {
		var BASE64_MARKER = ';base64,';
		if (dataURL.indexOf(BASE64_MARKER) == -1) {
			var parts = dataURL.split(',');
			var contentType = parts[0].split(':')[1];
			var raw = parts[1];
	
			return new Blob([raw], {type: contentType});
		}
	
		var parts = dataURL.split(BASE64_MARKER);
		var contentType = parts[0].split(':')[1];
		var raw = window.atob(parts[1]);
		var rawLength = raw.length;
	
		var uInt8Array = new Uint8Array(rawLength);
	
		for (var i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i);
		}
	
		return new Blob([uInt8Array], {type: contentType});
	}
}

function english_only(input){   	
    var spacechar = input.val().substr(input.val().length - 1);
    spacechar = spacechar.charCodeAt();
    if( spacechar >= 1570 && spacechar <= 1712){
        input.val('');
        $('body .alert .msg').text("ورودی اطلاعات برای این فیلد باید انگلیسی باشد .").parent('.alert').removeClass('none');
        return false;
    }
}
var last_h = 0;
var now_h = 1;
$(window).bind( 'hashchange', function(e) {
    last_h = now_h ;
    loc =  window.location.hash;
    loc = loc.replace("#/", "");
    
    loc = loc.split('/');
    now_h = loc[0] ;
    
   // console.log(now_h);
});