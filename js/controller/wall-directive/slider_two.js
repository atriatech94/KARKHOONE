
angular.module('myapp')
.directive('slidertwoDir', function ($rootScope){
		return {
			link: function() {
				
                /*=====================Varibales===============================*/
                
                var is_active = 0;
                var is_req = 0;
                var now_year = moment().format('jYYYY');
                var user_id = localStorage.getItem("user_id");
                var user_info = JSON.parse(localStorage.getItem("user_info"));
                var post_one = Array();
                var ofs_two = 0;
                /*====================================================*/
                if(now_h != "profile" ){
                    $rootScope.postnear = undefined;
                    $rootScope.postnear_ofset  = undefined;
                    $rootScope.profile_info_tab = undefined;
                }
                /*====================================================*/
                 if($rootScope.postnear !== undefined){
                    
                    var data =  $rootScope.postnear ;
                    data.forEach(function(element,index){
                        var result ='<div class="user_one" user_id="'+element.member_id+'" scope="postnear" >';
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
                        $('#two_ids .user_list').append(result);
                        
                    });
                    ofs_two = $rootScope.postnear_ofset ;
                     
                    if($(".swiper-slide-active").attr('actives') == $rootScope.profile_info_tab){
                        $(".swiper-slide-active").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                         $rootScope.profile_info_top = undefined;$rootScope.profile_info_tab = undefined;$rootScope.profile_info_tab_index = undefined;
                    }
                    
                }
                else{
                /*====================================================*/
                    swiper2.on('slideChangeEnd', function () {
                        if( $(".swiper-slide-active").attr('actives') == "#two_id" && is_active == 0 ){is_active++;fetch_two(ofs_two); }/*end if*/
                    });
                }
                //
                /*==============================is not request true======================*/
                $('#two_ids .refresh_loading').on("click",function(){fetch_one(ofs_two);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_two(ofs){
                    
                    $(".two_ids").next('.loading_users').show();
                    $(".two_ids").next('.refresh_loading').hide();

                    $.getJSON( base_url+"/api_inapp/get_near_user/Ami3-nKaORd7-9854NEsIHY/"+ofs+"/"+user_id+"/"+(user_info[0].city_id)+"/"+(user_info[0].state_id)  , function(data) {
                        $(".two_ids").next('.loading_users').hide();
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div class="user_one" user_id="'+element.member_id+'"  scope="postnear" >';
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
                                $('#two_ids .user_list').append(result);
                                post_one.push(element);
                            });
                            
                            ofs_two+=20;
                            is_req = 0;
                            $rootScope.postnear = post_one ;
                            $rootScope.postnear_ofset = ofs_two;
                        }
                        else if(ofs_two == 0){$(".two_ids").next('.refresh_loading').show();}
                    }).
                    fail(function(){ $(".two_ids").next('.refresh_loading').show(); });
                        
                    
                    
                }
                
                /*=====================Scroll Page===============================*/
                $('#two_ids').on("scroll",function(){
                    console.log($(".swiper-slide-active").scrollTop());
                    var content = $('#two_ids') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#two_ids .user_list').height() ;
                    if((   twoes - ones ) < 700 && is_req==0 ){is_req = 1;fetch_two(ofs_two);}
                });
                
                /*====================================================*/
            },/* end */
            templateUrl :  "pages/wall/slider_two.html"
}});
