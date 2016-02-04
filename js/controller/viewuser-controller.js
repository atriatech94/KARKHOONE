angular.module('myapp')
.controller('viewuserController', function() {
          
})
.directive('followerDir' , function ($rootScope){
		return {
			link: function() {
                /*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content13'), disable: 'left'});
                $("body #content13").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
               // var baseUrl = window.location.href.split('#')[1];
                //$location.path(prevUrl);
               // 
                if(now_h != "profile" ){
                    $rootScope.profile_info_div = undefined;
                    $rootScope.myfollower_ofset  = undefined;
                    $rootScope.myfollower = undefined;
                    $rootScope.profile_info_top = undefined;
                }
                /*=====================Varibales===============================*/
                var is_active = 0;
                var is_req = 0;
                var now_year = moment().format('jYYYY');
                var user_id = localStorage.getItem("user_id");
                var post_one = Array();
                var ofs_one = 0;
                var time_one = 0;
                /*====================================================*/
                if($rootScope.myfollower !== undefined){
                    
                    var data =  $rootScope.myfollower ;
                    if(data.length == 0){
                        $('#content13 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                    }
                    data.forEach(function(element,index){
                        var result ='<div class="user_one" user_id="'+element.member_id+'" scope="myfollower" >';
                        if(element.picname == "")
                        {
                            if(element.gender == "0")
                                result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                            if(element.gender == "1")
                                result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                        }
                        else
                        { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                        result +='<div class="user_one_info">';
                        result +='<h3>'+element.name+'</h3>';
                        result +='<h5>'+element.field+'</h5>';
                        result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                        result +='<span>'+element.state+'، '+element.city+' </span>';
                        result +='</div>';
                        result +='<div class="user_one_options">';
                        result +='<span class="user_cm">'+element.msg+'</span>';
                        result +='<span class="user_like">'+element.followers+'</span>';
                        result +='<span class="user_view">'+element.view+'</span>';
                        result +='</div>';
                        result +='<div class="clear"></div>';
                        result +='</div>';
                        $('#content13 .user_list').append(result);
                        
                    });
                    ofs_one = $rootScope.myfollower_ofset ;
                    if( $rootScope.profile_info_div !== undefined){
                         $("."+$rootScope.profile_info_div+" .of_list").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                          $rootScope.profile_info_div = undefined;$rootScope.profile_info_top = undefined;
                     }
                }
                else{
                    fetch_one(ofs_one);
                }
                
                /*==============================is not request true======================*/
                $('#content13 .refresh_loading').on("click",function(){fetch_one(ofs_one);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_one(ofs){
                    $(".follower").next('.loading_users').show();
                    $(".follower").next('.refresh_loading').hide();

                    $.getJSON( base_url+"/api_userlist/get_myfollower/Ami3myfollowe-nKaORd7-9854KIHY/"+ofs+"/"+user_id , function(data) {
                        $(".follower").next('.loading_users').hide();
                       // console.log(data);
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div class="user_one" user_id="'+element.member_id+'" scope="myfollower" >';
                                if(element.picname == "")
                                {
                                    if(element.gender == "0")
                                    result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                                    if(element.gender == "1")
                                    result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                                }
                                else
                                { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                                  result +='<div class="user_one_info">';
                                  result +='<h3>'+element.name+'</h3>';
                                  result +='<h5>'+element.field+'</h5>';
                                  result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                                  result +='<span>'+element.state+'، '+element.city+' </span>';
                                  result +='</div>';
                                  result +='<div class="user_one_options">';
                                  result +='<span class="user_cm">'+element.msg+'</span>';
                                  result +='<span class="user_like">'+element.followers+'</span>';
                                  result +='<span class="user_view">'+element.view+'</span>';
                                  result +='</div>';
                                  result +='<div class="clear"></div>';
                                  result +='</div>';
                                $('#content13 .user_list').append(result);
                                post_one.push(element);
                            });
                            
                            ofs_one+=20;
                            is_req = 0;
                            $rootScope.myfollower = post_one ;
                            $rootScope.myfollower_ofset = ofs_one;
    
                        }
                        else if(ofs_one == 0){
                            $(".follower").next('.refresh_loading').show();
                            $('#content13 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                        }
                    }).
                    fail(function() {$(".follower").next('.refresh_loading').show();});
                }
                /*=====================Scroll Page===============================*/
                $('#content13 .of_list').on("scroll",function(){
                    var content = $('#content13 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content13 .of_list').height() ;
                    //console.log(twoes - ones);
                    if((   twoes - ones ) < 700 && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                /*====================================================*/
                
                
				/*====================================================*/
				
            }/* end */
}})
.directive('followingDir' , function ($rootScope){
		return {
			link: function() {
				/*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content14'), disable: 'left'});
                $("body #content14").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
                if(now_h != "profile" ){
                    $rootScope.myfollowing = undefined;
                    $rootScope.myfollowing_ofset  = undefined;
                    $rootScope.profile_info_div = undefined;
                    $rootScope.profile_info_top = undefined;
                }
                
				/*=====================Varibales===============================*/
                var is_active = 0;
                var is_req = 0;
                var now_year = moment().format('jYYYY');
                var user_id = localStorage.getItem("user_id");
                var post_one = Array();
                var ofs_one = 0;
                var time_one = 0;
                /*====================================================*/
                if($rootScope.myfollowing !== undefined){
                    
                    var data =  $rootScope.myfollowing ;
                    if(data.length == 0){
                        $('#content14 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                    }
                    data.forEach(function(element,index){
                        var result ='<div class="user_one" user_id="'+element.member_id+'" scope="myfollowing" >';
                        if(element.picname == "")
                        {
                            if(element.gender == "0")
                                result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                            if(element.gender == "1")
                                result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                        }
                        else
                        { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                        result +='<div class="user_one_info">';
                        result +='<h3>'+element.name+'</h3>';
                        result +='<h5>'+element.field+'</h5>';
                        result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                        result +='<span>'+element.state+'، '+element.city+' </span>';
                        result +='</div>';
                        result +='<div class="user_one_options">';
                        result +='<span class="user_cm">'+element.msg+'</span>';
                        result +='<span class="user_like">'+element.followers+'</span>';
                        result +='<span class="user_view">'+element.view+'</span>';
                        result +='</div>';
                        result +='<div class="clear"></div>';
                        result +='</div>';
                        $('#content14 .user_list').append(result);
                        
                    });
                    ofs_one = $rootScope.myfollowing_ofset ;
                    if( $rootScope.profile_info_div !== undefined){
                         $("."+$rootScope.profile_info_div+" .of_list").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                          $rootScope.profile_info_div = undefined;$rootScope.profile_info_top = undefined;
                     }
                    
                }
                else{
                    fetch_one(ofs_one);
                }
                
                /*==============================is not request true======================*/
                $('#content14 .refresh_loading').on("click",function(){fetch_one(ofs_one);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_one(ofs){
                    $(".follower").next('.loading_users').show();
                    $(".follower").next('.refresh_loading').hide();

                    $.getJSON( base_url+"/api_userlist/get_myfollowing/Ami3myfollowing-nKaORd7-9854KIHY/"+ofs+"/"+user_id , function(data) {
                        $(".follower").next('.loading_users').hide();
                        console.log(data);
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div class="user_one" user_id="'+element.member_id+'" scope="myfollowing" >';
                                if(element.picname == "")
                                {
                                    if(element.gender == "0")
                                    result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                                    if(element.gender == "1")
                                    result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                                }
                                else
                                { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                                  result +='<div class="user_one_info">';
                                  result +='<h3>'+element.name+'</h3>';
                                  result +='<h5>'+element.field+'</h5>';
                                  result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                                  result +='<span>'+element.state+'، '+element.city+' </span>';
                                  result +='</div>';
                                  result +='<div class="user_one_options">';
                                  result +='<span class="user_cm">'+element.msg+'</span>';
                                  result +='<span class="user_like">'+element.followers+'</span>';
                                  result +='<span class="user_view">'+element.view+'</span>';
                                  result +='</div>';
                                  result +='<div class="clear"></div>';
                                  result +='</div>';
                                $('#content14 .user_list').append(result);
                                post_one.push(element);
                            });
                            
                            ofs_one+=20;
                            is_req = 0;
                            $rootScope.myfollowing = post_one ;
                            $rootScope.myfollowing_ofset = ofs_one;
    
                        }
                        else if(ofs_one == 0){
                            $(".follower").next('.refresh_loading').show(); 
                            $('#content14 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                        }
                    }).
                    fail(function() {$(".follower").next('.refresh_loading').show();});
                }
                /*=====================Scroll Page===============================*/
                $('#content14 .of_list').on("scroll",function(){
                    var content = $('#content14 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content14 .follower').height() ;
                    console.log(twoes - ones);
                    if((   twoes - ones ) < 700 && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                /*====================================================*/
            }/* end */
}})
.directive('checkedDir' , function ($rootScope){
		return {
			link: function() {
				/*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content15'), disable: 'left'});
                $("body #content15").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
                if(now_h != "profile" ){
                    $rootScope.mychecked = undefined;
                    $rootScope.myfollowing_ofset  = undefined;
                    $rootScope.profile_info_div = undefined;
                    $rootScope.profile_info_top = undefined;
                }
                
				/*=====================Varibales===============================*/
                var is_active = 0;
                var is_req = 0;
                var now_year = moment().format('jYYYY');
                var user_id = localStorage.getItem("user_id");
                var post_one = Array();
                var ofs_one = 0;
                var time_one = 0;
                /*====================================================*/
                if($rootScope.mychecked !== undefined){
                    
                    var data =  $rootScope.mychecked ;
                    if(data.length == 0){
                        $('#content15 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                    }
                    data.forEach(function(element,index){
                        var result ='<div class="user_one" user_id="'+element.member_id+'" scope="mychecked" >';
                        if(element.picname == "")
                        {
                            if(element.gender == "0")
                                result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                            if(element.gender == "1")
                                result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                        }
                        else
                        { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                        result +='<div class="user_one_info">';
                        result +='<h3>'+element.name+'</h3>';
                        result +='<h5>'+element.field+'</h5>';
                        result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                        result +='<span>'+element.state+'، '+element.city+' </span>';
                        result +='</div>';
                        result +='<div class="user_one_options">';
                        result +='<span class="user_cm">'+element.msg+'</span>';
                        result +='<span class="user_like">'+element.followers+'</span>';
                        result +='<span class="user_view">'+element.view+'</span>';
                        result +='</div>';
                        result +='<div class="clear"></div>';
                        result +='</div>';
                        $('#content15 .user_list').append(result);
                        
                    });
                    ofs_one = $rootScope.mychecked_ofset ;
                    if( $rootScope.profile_info_div !== undefined){
                         $("."+$rootScope.profile_info_div+" .of_list").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                          $rootScope.profile_info_div = undefined;$rootScope.profile_info_top = undefined;
                     }
                    
                }
                else{
                    fetch_one(ofs_one);
                }
                
                /*==============================is not request true======================*/
                $('#content15 .refresh_loading').on("click",function(){fetch_one(ofs_one);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_one(ofs){
                    $(".follower").next('.loading_users').show();
                    $(".follower").next('.refresh_loading').hide();

                    $.getJSON( base_url+"/api_userlist/get_mychecked/Ami3mychecked-nKaORd7-9854KIHY/"+ofs+"/"+user_id , function(data) {
                        $(".follower").next('.loading_users').hide();
                        
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div class="user_one" user_id="'+element.member_id+'" scope="mychecked" >';
                                if(element.picname == "")
                                {
                                    if(element.gender == "0")
                                    result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                                    if(element.gender == "1")
                                    result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                                }
                                else
                                { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                                  result +='<div class="user_one_info">';
                                  result +='<h3>'+element.name+'</h3>';
                                  result +='<h5>'+element.field+'</h5>';
                                  result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                                  result +='<span>'+element.state+'، '+element.city+' </span>';
                                  result +='</div>';
                                  result +='<div class="user_one_options">';
                                  result +='<span class="user_cm">'+element.msg+'</span>';
                                  result +='<span class="user_like">'+element.followers+'</span>';
                                  result +='<span class="user_view">'+element.view+'</span>';
                                  result +='</div>';
                                  result +='<div class="clear"></div>';
                                  result +='</div>';
                                $('#content15 .user_list').append(result);
                                post_one.push(element);
                            });
                            
                            ofs_one+=20;
                            is_req = 0;
                            $rootScope.mychecked = post_one ;
                            $rootScope.mychecked_ofset = ofs_one;
                            if( $rootScope.profile_info_div !== undefined){
                                $("."+$rootScope.profile_info_div+" .of_list").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                                $rootScope.profile_info_div = undefined;$rootScope.profile_info_top = undefined;
                            }
    
                        }
                        else if(ofs_one == 0){$(".follower").next('.refresh_loading').show();}
                    }).
                    fail(function() {$(".follower").next('.refresh_loading').show();});
                }
                /*=====================Scroll Page===============================*/
                $('#content15 .of_list').on("scroll",function(){
                    var content = $('#content15 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content15 .follower').height() ;
                    console.log(twoes - ones);
                    if((   twoes - ones ) < 700 && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                /*====================================================*/
            }/* end */
}})


