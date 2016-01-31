
angular.module('myapp')
.directive('sliderthreeDir' , function ($rootScope){
		return {
			link: function() {
                /*=====================Varibales===============================*/
                var is_active = 0;
                var is_req = 0;
                var now_year = moment().format('jYYYY');
                var user_id = localStorage.getItem("user_id");
                var user_info = JSON.parse(localStorage.getItem("user_info"));
                var post_one = Array();
                var ofs_three = 0;
                /*====================================================*/
                 if($rootScope.posthasjob !== undefined){
                     var data =  $rootScope.posthasjob ;
                     data.forEach(function(element,index){
                         var result ='<div class="user_one" user_id="'+element.member_id+'" scope="posthasjob" >';
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
                        $('#three_ids .user_list').append(result);
                        
                    });
                    ofs_three = $rootScope.posthasjob_ofset ;
                     if($(".swiper-slide-active").attr('actives') == $rootScope.profile_info_tab){
                        $(".swiper-slide-active").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                          $rootScope.profile_info_top = undefined;$rootScope.profile_info_tab = undefined;$rootScope.profile_info_tab_index = undefined;
                    }
                    
                }
                else{
                      swiper2.on('slideChangeEnd', function () {
                        if( $(".swiper-slide-active").attr('actives') == "#three_id" && is_active == 0 ){is_active++;fetch_three(ofs_three); }/*end if*/
                    });  
                    //
                }
                /*==============================is not request true======================*/
                $('#three_ids .refresh_loading').on("click",function(){fetch_three(ofs_three);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_three(ofs){
                    
                    $(".three_ids").next('.loading_users').show();
                    $(".three_ids").next('.refresh_loading').hide();

                    $.getJSON(base_url+"/api_inapp/get_user_has_job/Attmi3-HasJ00B3-9854NEsIHY/"+ofs+"/"+user_id+"/"+(user_info[0].city_id)+"/"+(user_info[0].state_id)  , function(data) {
                        $(".three_ids").next('.loading_users').hide();
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div class="user_one" user_id="'+element.member_id+'" scope="posthasjob" >';
                                if(element.picname == "")
                                {
                                    if(element.gender == "0"){ result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';}
                                    else if(element.gender == "1"){result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';}
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
                                $('#three_ids .user_list').append(result);
                                post_one.push(element);
                            });
                            
                            ofs_three+=20;
                            is_req = 0;
                            $rootScope.posthasjob = post_one ;
                            $rootScope.posthasjob_ofset = ofs_three;
                        }
                        else if(ofs_three == 0){$(".three_ids").next('.refresh_loading').show();}
                    }).
                    fail(function(){ $(".three_ids").next('.refresh_loading').show(); });
                        
                   
                }
                /*=====================Scroll Page===============================*/
                $('#three_ids').on("scroll",function(){
                    var content = $('#three_ids') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#three_ids .user_list').height() ;
                    if((twoes - ones) < 700 && is_req==0 ){is_req = 1;fetch_three(ofs_three);}
                });
                 /*====================================================*/
            },/* end */
            templateUrl :  "pages/wall/slider_three.html"
}});
