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
                /*====================================================*/
                if($rootScope.follower !== undefined){
                    
                    var data =  $rootScope.follower ;
                    data.forEach(function(element,index){
                        var result ='<div class="user_one" user_id="'+element.member_id+'" scope="follower" >';
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
                    ofs_one = $rootScope.follower_ofset ;
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
                                  var result ='<div class="user_one" user_id="'+element.member_id+'" scope="follower" >';
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
                                    $('#content33 .user_list').append(result);
                                    post_one.push(element);
                                });
                                
                                ofs_one+=20;
                                is_req = 0;
                                $rootScope.myfollower = post_one ;
                                $rootScope.myfollower_ofset = ofs_one;
                            }
    
                        }
                        else if(ofs_one == 0){$(".of_list .refresh_loading").show();}
                    }).
                    fail(function() {$(".follower").next('.refresh_loading').show();$(".follower").next('.loading_users').hide();$('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');});
                }
                /*=====================Scroll Page===============================*/
                $('#content13 .of_list').on("scroll",function(){
                    var content = $('#content13 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content13 .of_list').height() ;
                    console.log(twoes - ones);
                    if((   twoes - ones ) < 700 && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                /*====================================================*/
                
                
				/*====================================================*/
				
            }/* end */
}})