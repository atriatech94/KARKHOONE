angular.module('myapp')
.controller('viewuserflwController', function() {
          
})
.directive('userfollowerDir' , function ($rootScope,$routeParams){
		return {
			link: function() {
                /*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content33'), disable: 'left'});
                $("body #content33").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
                /*=====================Varibales===============================*/
                var is_active = 0;
                var is_req = 0;
                var now_year = moment().format('jYYYY');
                var user_id = localStorage.getItem("user_id");
                var post_one = Array();
                var ofs_one = 0;
                var time_one = 0;
                if(now_h != "user_follower" ){
                    $rootScope.youfollower = undefined;
                    $rootScope.youfollower_ofset  = undefined;
                    $rootScope.profile_info_div = undefined;
                    $rootScope.profile_info_top = undefined;
                }
                /*====================================================*/
                if($rootScope.youfollower !== undefined){
                    
                    var data =  $rootScope.youfollower ;
                    data.forEach(function(element,index){
                        var result ='<div onclick="go_member('+element.member_id+')" class="user_one" user_id="'+element.member_id+'" scope="follower" >';
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
                        result +='<h3><a href="#/profile/'+element.member_id+'">'+element.name+'</a></h3>';
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
                    ofs_one = $rootScope.youfollower_ofset ;
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

                    $.getJSON( base_url+"/api_userlist/get_follower/Ami3myfollowe-nKaORd7-9854KIHY/"+ofs+"/"+$routeParams.user_id+"/"+localStorage.getItem("user_id") , function(data) {
                        $(".follower").next('.loading_users').hide();
                        console.log(data);
                        if(Object.keys(data).length > 0 )
                        {
                            if(Object.keys(data).toString().indexOf('msg') !== -1){
                                var result = "<div style='color:red'>";
                                result += data.msg;
                                result += "</div>";
                                $('#content33 .user_list').append(result);
                            }else{
                                data.forEach(function(element,index){
                                  var result ='<div onclick="go_member('+element.member_id+')" class="user_one" user_id="'+element.member_id+'" scope="follower" >';
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
                                      result +='<h3><a href="#/profile/'+element.member_id+'">'+element.name+'</a></h3>';
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
                                    $('#content33 .user_list').append(result);
                                    post_one.push(element);
                                });
                                
                                ofs_one+=20;
                                is_req = 0;
                                $rootScope.youfollower = post_one ;
                                $rootScope.youfollower_ofset = ofs_one;
                            }
    
                        }
                        else if(ofs_one == 0){$(".of_list .refresh_loading").show();}
                    }).
                    fail(function() {$(".follower").next('.refresh_loading').show();$(".follower").next('.loading_users').hide();$('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');});
                }
                /*=====================Scroll Page===============================*/
                $('#content13 .of_list').on("scroll",function(){
                    win_height = $(window).height()+ 400 ;
                    var content = $('#content13 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content13 .of_list').height() ;
                    console.log(twoes - ones);
                    if((   twoes - ones ) < win_height && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                /*====================================================*/
                
                
				/*====================================================*/
				
            }/* end */
}})
.controller('viewuserflwingController', function() {
          
})
.directive('userfollowingDir' , function ($rootScope,$routeParams){
		return {
			link: function() {
                /*====================================================*/
               /*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content334'), disable: 'left'});
                $("body #content334").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
                if(now_h != "user_following" ){
                    $rootScope.youfollowing = undefined;
                    $rootScope.youfollowing_ofset  = undefined;
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
                if($rootScope.youfollowing !== undefined){
                    
                    var data =  $rootScope.youfollowing ;
                    if(data.length == 0){
                        $('#content334 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                    }
                    data.forEach(function(element,index){
                        var result ='<div onclick="go_member('+element.member_id+')" class="user_one" user_id="'+element.member_id+'" scope="myfollowing" >';
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
                        result +='<h3><a href="#/profile/'+element.member_id+'">'+element.name+'</a></h3>';
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
                        $('#content334 .user_list').append(result);
                        
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
                $('#content334 .refresh_loading').on("click",function(){fetch_one(ofs_one);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_one(ofs){
                    
                    $(".follower").next('.loading_users').show();
                    $(".of_list .refresh_loading").hide();

                   $.getJSON( base_url+"/api_userlist/get_following/Ami3myfollowe-nKassccaORd7-9854KIHY/"+ofs+"/"+$routeParams.user_id+"/"+localStorage.getItem("user_id") , function(data) {
                        $(".follower").next('.loading_users').hide();
                        console.log(data);
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div onclick="go_member('+element.member_id+')" class="user_one" user_id="'+element.member_id+'" scope="myfollowing" >';
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
                                  result +='<h3><a href="#/profile/'+element.member_id+'">'+element.name+'</a></h3>';
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
                                $('#content334 .user_list').append(result);
                                console.log();
                                post_one.push(element);
                            });
                            
                            ofs_one+=20;
                            is_req = 0;
                            $rootScope.youfollowing = post_one ;
                            $rootScope.youfollowing_ofset = ofs_one;
    
                        }
                        else if(ofs_one == 0){
                            //$(".of_list .refresh_loading").show(); 
                            $('#content334 .user_list').append('<div class="msg_empty"> کاربری برای نمایش موجود نیست </div>');
                        }
                    }).
                    fail(function() {$(".of_list .refresh_loading").show();$(".follower").next('.loading_users').hide();$('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');});
                }
                /*=====================Scroll Page===============================*/
                $('#content334 .of_list').on("scroll",function(){
                    win_height = $(window).height()+ 400 ;
                    var content = $('#content14 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content14 .follower').height() ;
                    console.log(twoes - ones);
                    if((   twoes - ones ) < win_height && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                
				/*====================================================*/
				
            }/* end */
}});
function go_member(id){
    window.location.hash = "#/profile/"+id;
}