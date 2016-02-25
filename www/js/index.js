
document.addEventListener("backbutton",amintest, false);
//var moment = require('moment-jalaali');
moment.loadPersian();
var socket;
var ofset_msg;
var is_req;
var msg_id = 0;
var appends = '';
var days3 = moment().subtract(24, 'hour').valueOf() ;

/*======================================*/

/*======================================*/
/*

*/
/*======================================*/
document.addEventListener('deviceready', function () {
    var host = "ws://kaarkhoone.ir:18000/kaarkhooneh/socket/chatServer.php"; 
    var ws = new WebSocket('host');
  alert(123);
    ws.onopen = function () {
        alert('open');
        this.send('hello');         // transmit "hello" after connecting
    };

function init(member_id, callback) {
    var host = "ws://kaarkhoone.ir:18000/kaarkhooneh/socket/chatServer.php"; // SET THIS TO YOUR SERVER
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
                /*var appends = '<div class="msg_one me" id="msg-'+message.sender_msg_id+'" >';
                appends += '<div class="msg_one_text">'+message.txt+'</div>';
                appends += '<div class="msg_one_plugin"><span class="send see-'+message.is_read+'"></span><span class="time">'+moment(message.insert_date).calendar()+'</span></div></div>';
                $('.msg_list_chat').append(appends);
                $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);*/
                $("#msg-"+message.sender_msg_id + " .send").removeClass("already").addClass("see-1");
                $("#msg-"+message.sender_msg_id+" .time").text(moment(message.insert_date).calendar());
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
                var appends = '<div class="msg_one me" id="msg-'+msg_id+'" >';
                appends += '<div class="msg_one_text">'+txt+'</div>';
                appends += '<div class="msg_one_plugin"><span class="send see-'+0+'"></span><span class="time"></span></div></div>';
                $('.msg_list_chat').append(appends);
                $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
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
            var appends = '<div class="msg_one me" id="msg-'+msg_id+'" >';
                appends += '<div class="msg_one_text">'+txt+'</div>';
                appends += '<div class="msg_one_plugin"><span class="send see-'+0+'"></span><span class="time"></span></div></div>';
                $('.msg_list_chat').append(appends);
                $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
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
    if(!$('body .lpro').hasClass('none'))
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
    else if(loc == "forget_pass" || loc == "profile" || loc == "register_one" || loc == "register_two" || loc == "register_three" ||
            loc == "myprofile" || loc == "mycv" ||   loc == "edit_info" || loc == "follower" || loc == "following" ||  loc =="notification" ||
            loc == "search_result" || loc == "mycv"  || loc == "msg_detail" || loc == "setting"  || loc == "setting"  || loc =="user_follower" || loc =="user_following"  )
    {
         window.history.back() ;
    }
    else if(loc == "msg"){
        return false;
    }
    else if(loc == "login")
    {
         window.location.hash = "#/select";
    }
    else
    {
	    window.location.hash = "#/wall";
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
    timeout: 45000,
});

/*===============================================================*/

function resize_image(url, callback){
    var image = new Image();
    image.onload = function () {
        var canvas = document.createElement('canvas');
		max_size = 400,// TODO : pull max size from a site config
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
                  //  var dems
                    if (canvas.width >  canvas.height){
                        if (canvas.width > max_size){
                            canvas.height *= max_size / canvas.width;
                            canvas.width = max_size;

                        }
                    }else{
                        if (canvas.height > max_size){
                            canvas.width *= max_size / canvas.height;
                            canvas.height = max_size;
                        }
                    }
        canvas.getContext('2d').drawImage(this, 0, 0,canvas.width,canvas.height);
        resizedImage = canvas.toDataURL('image/jpeg');
        // Get raw image data
        canvas.toDataURL('image/jpeg');
        // ... or get as Data URI
        callback(canvas.toDataURL('image/jpeg'));
    };
    image.src = url;
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
function readURL(input) {
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
                                    
        reader.onload = function (e) {
            return e.target.result;
        }
         
        reader.readAsDataURL(input.files[0]);
        return reader.readAsDataURL;
    }
}
function share_fn(url){
    // window.plugins.socialsharing.share('اشتراک گزاری شده توسط اپلیکیشن کارخونه', null,  base_url+'file/logo_share.png' , url);
    window.plugins.socialsharing.share('کارخونه', null,null, url);                
}
$(function(){
    $('body').on("click",".dl_btn",function(){
        dl_link =  $(this).attr("share_url");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 
        downloadFile2(dl_link);
        $('body .alert .msg').text("در حال دانلود فایل ...").parent('.alert').removeClass('none');
        timeout = setTimeout(function(){ $('body .alert').addClass('none');},3000);
        return false;
    });
});
 function downloadFile2(dl_link)
{       
       
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(dl_link);
		var filename = dl_link.substring(dl_link.lastIndexOf('/')+1);
        var filePath = "/mnt/sdcard/Kaarkhooneh/"+filename;
        
        fileTransfer.download(
            uri,
            filePath,
            function(entry) {
               $('body .alert .msg').text("فایل مورد نظر با موفقیت دانلود شد").parent('.alert').removeClass('none');
                
            },
            function(error) {
                $('body .alert .msg').text("خطا در دانلود ..").parent('.alert').removeClass('none');
            },
            true,
            {
            }
        );
}

function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.root; 
        entry.getDirectory("Kaarkhooneh", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
} 

function onGetDirectorySuccess(dir) { 
      //alert("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
    // alert("Error creating directory "+error.code); 
} 
//https://github.com/zho/phonegap-imeiplugin/tree/c506fb6

//window.plugins.imeiplugin.getImei(callback);
var imei = 0 ;

/*====================on foucs=============*/
$('body').on("focus",'input[type="text"],input[type="password"],input[type="email"],textarea',function(){
    samin =$(this) ;
    $(window).resize(function(){
    });
});
/*=================================*/

/*=================================*/

