var insert_chat = 0 ;
angular.module('myapp')
.controller('msgController', function($scope) {
    $scope.datas =1;
    $scope.base_url = base_url;
    $scope.user_id = localStorage.getItem('user_id');
})
.directive('msgarchiveDir' , function ($rootScope){
		return {
			link: function(scope) {
                
				/*===============================================================================*/  
                var snapper = new Snap({ element: document.getElementById('content20'), disable: 'left'});
                $("body #content20").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                /*=================================================*/ 
                if(now_h != "msg_detail" ){
                    $rootScope.msg = undefined;
                    $rootScope.msg_ofset  = undefined;
                }
                /*=================================================*/ 
                var ofset = 0;
                var last_id = 0;
                var post_one = Array();
                var is_reqe = 0 ;
                var days3 = moment().subtract(24, 'hour').valueOf() ; 
                console.log(days3);
				/*==================================================*/
                if($rootScope.msg !== undefined){
                    scope.datas = $rootScope.msg ;
                    ofset =  $rootScope.msg_ofset ;
                    console.log($rootScope.msg);
                }else{fetch_serche_one();}
                
				/*====================================================*/
                function fetch_serche_one(){
                    $(".follower").next('.loading_users').show();
                    $(".follower").next('.refresh_loading').hide();
                    
                    if(is_reqe == 0){
                        is_reqe = 1;
                        $.get(base_url+"/api_chat/chat_list/A3deWW-00353SSS-CHat/"+localStorage.getItem("user_id")+"/"+ofset+"/"+last_id,function(datas){
                            is_reqe = 0;
                            data = new Object();
                            data = JSON.parse(datas);
                            console.log(data);
                            $(".follower").next('.loading_users').hide();
                            $('body .lpro').addClass("none");

                            if(data.length > 0 )
                            {
                                data.forEach(function(element,index){
                                    var d = new Date(element.date);
                                    element.dates = moment(element.date).calendar();
                                    post_one.push(element);
                                });
                                scope.$apply(function(){
                                    scope.datas = post_one ;
                                    $rootScope.msg = post_one ;
                                    $rootScope.msg_ofset = ofset;
                                });   
                                ofset += 20 ;
                                is_req = 0;

                            }
                            else if(ofset == 0){
                                $(".one_ids").next('.refresh_loading').show();
                                scope.$apply(function(){
                                    scope.datas = undefined ;
                                });             
                              }


                        }).fail(function(){
                            $(".one_ids").next('.refresh_loading').show();
                        });
                    }
                   
                }//end function
               /*====================================================*/
                $('#content20 .of_list').on("scroll",function(){
                    var content = $('#content20 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content20 .follower').height() ;
                    console.log(twoes - ones);
                    if((  twoes - ones) < 600 && is_req==0 ){ is_req = 1; fetch_serche_one($rootScope.search_data,$rootScope.search_address); }
                });
                
                /*====================================================*/
                $('.user_list').on("click",".chat_remove",function(){
                    var msg_chat_id = $(this).attr('msg_chat_id');
                    var x;
                    if (confirm("آیا برای حذف اطمینان دارید") == true) {
                        $.get(base_url+"/api_upload/disable_all_msg/UPssdfo-098UdfsdfY-oosfWu/"+localStorage.getItem("user_id")+"/"+$(this).attr("your_id"),function(datas){});
                        var pp_id = $.grep(scope.datas,function(element){
                            return element.msg_chat_id != msg_chat_id;
                        });
                        console.log(pp_id);
                        scope.$apply(function(){
                            
                            $rootScope.msg = pp_id;
                            scope.datas = pp_id;
                        });
                        return false;     
                    }               
                });
                /*====================================================*/
				$('.chat_view').delegate(".chat_one","click",function(){
                    localStorage.removeItem("chat");
                    $rootScope.chat = Array({"name" : $(this).find('h3').text(),
                                            "member_id" : $(this).find('h3').attr('your_id'),
                                            "gender" : $(this).find('h3').attr('user_gender'),
                                            "picname" : $(this).find('h3').attr('user_image'),
                                            "msg_chat_id" : $(this).attr('msg_chat_id')
                                           });
                    localStorage.setItem("chat",JSON.stringify($rootScope.chat));
                    window.location.href = "#/msg_detail";
                });
                /*====================================================*/
                $('.contanet_profile').on("click",".refresh_msg",function(){
                    ofset = 0;
                    last_id = 0;
                    scope.$apply(function(){ post_one = [];});
                    fetch_serche_one();
                });

                
          /*====================================================*/
                var draggable = document.getElementById('home_btn_ref');
                console.log(draggable);
                draggable.addEventListener('touchmove', function(event) {
                    var touch = event.targetTouches[0];
                          
                    // Place element where the finger is
                    draggable.style.left = touch.pageX-25 + 'px';
                    draggable.style.top = touch.pageY-25 + 'px';
                    event.preventDefault();
                }, false);
          /*====================================================*/
            }/* end */
}})
.controller('msgdetailController', function($scope,$rootScope) {
    $scope.user_id = localStorage.getItem("user_id");
    $scope.base_url = base_url;
    if($rootScope.chat !== undefined){
        $scope.user_info = $rootScope.chat;
    }
    else if($rootScope.chat === undefined && localStorage.getItem("chat") !== undefined)
    {
        $scope.chat = JSON.parse(localStorage.getItem("chat"));
        $scope.user_info = $scope.chat ;
    }
    //console.log($scope.user_info);
    //console.log(JSON.parse(localStorage.getItem("chat")));
    //console.log($rootScope.chat[0].msg_chat_id);
})


.directive('msgdetailDir' , function ($rootScope){
		return {
			link: function(scope) {
                // $('body .lpro').removeClass("none");
                ofset_msg =0;
                is_req = 0;
                // var days3 = moment().subtract(24, 'hour').valueOf() ; 
				you = scope.chat[0].member_id ; 
				me = scope.user_id;

                setInterval(function(){
                    if(!socket){
                        send(me,  you, "havij", "blabla");
                    }
                    ;}, 5000);
				
				console.log(you,me);
                fetch_msg_websocket(scope.user_id, scope.user_info[0].member_id, '');
          
                $('.msg_submit').submit(function(){
                    
                    var ser = $('.msg_submit').serialize();
                    var txt = $('.msg_text').val();
                    txt =  txt.replace( /(<([^>]+)>)/ig , "" );
                    txt2 = txt.replace(/(?:\r\n|\r|\n)/g, '<br />');

                    if($('.msg_text').val().trim() == "")
                    {
                        $('.msg_text').val("").focus();
                        return false;
                    }
					
                    //if(!socket) init(me);

					send(me, you, "send", txt);
					if($rootScope.msg) $rootScope.msg.forEach(function(element, index){if(element.msg_me_id == scope.user_info[0].member_id || element.msg_you_id == scope.user_info[0].member_id){element.msg_txt = txt;element.date = data.date;}});
                    insert_chat++;
                    $('.msg_text').val("").focus();
     
               }); 
          
                $('.msg_list_chat').on("scroll",function(){if($('.msg_list_chat').scrollTop() == 0  && is_req==0){is_req = 1;fetch_msg_websocket(scope.user_id, scope.user_info[0].member_id,  $('.msg_one:eq(0)').attr("id"));}});
                
                /*=============================================================*/
                $('.icons').on("click",".delete_chat",function(){
                    var msg_chat_id = $(this).attr('msg_chat_id');
                    var x;
                    if (confirm("آیا برای حذف اطمینان دارید") == true) {
                        $.get(base_url+"/api_upload/disable_all_msg/UPssdfo-098UdfsdfY-oosfWu/"+localStorage.getItem("user_id")+"/"+$(this).attr("your_id"),function(datas){});
                        var pp_id = $.grep(scope.datas,function(element){
                            return element.msg_chat_id != msg_chat_id;
                        });
                       
                        scope.$apply(function(){
                            $rootScope.msg = pp_id;
                            scope.datas = pp_id;
                        });
                        window.location.hash ="#/msg";
                        return false;     
                    }               
                });
                /*=============================================================*/
                $('.icons').on("click",".delete_block_chat",function(){
                    var msg_chat_id = $(this).attr('msg_chat_id');
                    var x;
                    if (confirm("آیا برای حذف و بلاک این کاربر اطمینان دارید اطمینان دارید") == true) {
                        $.get(base_url+"/api_upload/disable_remove_all_msg/UPssdfo-098sc33UdfsdfY-oosfWu/"+localStorage.getItem("user_id")+"/"+$(this).attr("your_id"),function(datas){});
                        var pp_id = $.grep(scope.datas,function(element){
                            return element.msg_chat_id != msg_chat_id;
                        });
                        
                        scope.$apply(function(){
                            
                            $rootScope.msg = pp_id;
                            scope.datas = pp_id;
                        });
                        window.location.hash ="#/msg";
                        return false;     
                    }               
                });
                /*=============================================================*/
              
          
            }
}});


/*
.directive('msgdetailDir' , function ($rootScope){
		return {
			link: function(scope) {
                $('body .lpro').removeClass("none");
                var ofset_msg =0;
                var is_req = 0;
                var days3 = moment().subtract(24, 'hour').valueOf() ; 
                fetch_msg();

               
                $('.msg_submit').submit(function(){
                    var ser = $('.msg_submit').serialize();
                    var txt = $('.msg_text').val();
                    txt =  txt.replace( /(<([^>]+)>)/ig , "" );
                    txt2 = txt.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    var appends = '<div class="msg_one me" >';
                    appends += '<div class="msg_one_text">'+txt2+'</div>';
                    appends += '<div class="msg_one_plugin"><span id="p-'+insert_chat+'" class="send already"></span><span class="time"></span></div> </div>';
                    $('.msg_list_chat').append(appends).scrollTop($('.msg_list_chat')[0].scrollHeight);
                    
                    $.post(base_url+"/api_chat/insert/Chati3-HasJ00C3B3-9854NEsIHY/"+insert_chat,ser,function(data){
                        var data = JSON.parse(data);
                        date_now = moment(data.date).calendar();
                        console.log(data.date);
                        $("#p-"+data.id).removeClass("already").addClass("see-0");
                        $("#p-"+data.id).next("span").text(date_now);
                        if($rootScope.msg !== undefined)
                        $rootScope.msg.forEach(function(element, index){if(element.msg_me_id == scope.user_info[0].member_id || element.msg_you_id == scope.user_info[0].member_id){element.msg_txt = txt;element.date = data.date;}});
                    });
                    
                    insert_chat++;
                    $('.msg_text').val("");
               });

               $('.msg_submit').submit(function(){
                    var ser = $('.msg_submit').serialize();
                    var txt = $('.msg_text').val();
                    you = scope.chat[0].member_id ; 
                    me = scope.user_id;
                    txt =  txt.replace( /(<([^>]+)>)/ig , "" );
                    txt2 = txt.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    
                    if(!socket) init(me);

                    send(me, you, "send", txt2);
                    
                    insert_chat++;
                    $('.msg_text').val("");
               }); 



                function fetch_msg(msg_scroll){
                    $('body .lpro').addClass("none");
                    $.get(base_url+"/api_chat/get_chat/ChetGet-098HYT65VC-C276/"+scope.user_id+"/"+scope.user_info[0].member_id+"/"+ofset_msg,function(datas){
                        var data = JSON.parse(datas);
                        if(data.length > 0 )
                        {
                            data.forEach(function(element, index){
                                 element.dates = moment(element.date).calendar();
                                
                                if(element.msg_me_id == scope.user_id ){
                                    var appends = '<div class="msg_one me" id="msg-'+element.msg_id+'" >';
                                    appends += '<div class="msg_one_text">'+element.msg_txt+'</div>';
                                    appends += '<div class="msg_one_plugin"><span class="send see-'+element.is_read+'"></span><span class="time">'+element.dates+'</span></div></div>';
                                }
                                else{
                                    var appends = '<div class="msg_one you" id="msg-'+element.msg_id+'" >';
                                    appends += '<div class="msg_one_text">'+element.msg_txt+'</div>';
                                    appends += '<div class="msg_one_plugin"><span class="send"></span><span class="time">'+element.dates+'</span></div></div>';
                                }
                                $('.msg_list_chat').prepend(appends);
                                if(ofset_msg==0){
                                    $('.msg_list_chat').scrollTop($('.msg_list_chat')[0].scrollHeight);
                                    $rootScope.msg.forEach(function(element, index){if(element.msg_me_id == scope.user_info[0].member_id || element.msg_you_id == scope.user_info[0].member_id){element.is_read = "1" }});
                                }
                                else{
                                    $('.msg_list_chat').animate({scrollTop: $("#"+msg_scroll).offset().top},0);
                                }
                            });
                            
                            is_req = 0;
                            ofset_msg += 20;
                        }                   
                        
                    }).fail(function(){
                        $('body .alert .msg').text("عدم برقرای ارتباط").parent('.alert').removeClass('none');
                    });
                }

                $('.msg_list_chat').on("scroll",function(){if($('.msg_list_chat').scrollTop() == 0  && is_req==0){is_req = 1;fetch_msg($('.msg_one:eq(0)').attr("id"));}});
          
            }
}});
*/