angular.module('myapp')
.directive('slideroneDir' , function ($rootScope){
		return {
			link: function() {
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
                if(now_h != "profile" ){
                    $rootScope.postone = undefined;
                    $rootScope.postone_ofset  = undefined;
                    $rootScope.profile_info_tab = undefined;
                }
                /*====================================================*/
                if($rootScope.postone !== undefined){
                    
                    var data =  $rootScope.postone ;
                    data.forEach(function(element,index){
                        var result ='<div class="user_one" user_id="'+element.member_id+'" scope="postone" >';
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
                        $('#one_ids .user_list').append(result);
                        
                    });
                    ofs_one = $rootScope.postone_ofset ;
                    if($(".swiper-slide-active").attr('actives') == $rootScope.profile_info_tab){
                        $(".swiper-slide-active").animate({ scrollTop: $rootScope.profile_info_top+"px" }  , 0 );
                        $rootScope.profile_info_top = undefined;$rootScope.profile_info_tab = undefined;$rootScope.profile_info_tab_index = undefined;
                    }
                    
                }
                else{fetch_one(ofs_one);}
                    
               
                
                /*====================================================*/
                swiper2.on('slideChangeEnd', function () {
                    if( $(".swiper-slide-active").attr('actives') == "#one_id" && is_active == 0 ){console.log($(".swiper-slide-active").attr('actives'));is_active++; }/*end if*/
                });  
                
                /*==============================is not request true======================*/
                $('#one_ids .refresh_loading').on("click",function(){fetch_one(ofs_one);});
                /*=========ofs = ofset ========Request===================================*/
                function fetch_one(ofs){
                    $(".one_ids").next('.loading_users').show();
                    $(".one_ids").next('.refresh_loading').hide();

                    $.getJSON( base_url+"/api_inapp/get_new_user/Ami3-nKaORd7-9854KIHY/"+ofs+"/"+user_id , function(data) {
                        $(".one_ids").next('.loading_users').hide();
                         console.log(data);
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                              var result ='<div class="user_one" user_id="'+element.member_id+'" scope="postone" >';
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
                                $('#one_ids .user_list').append(result);
                                post_one.push(element);
                            });
                            
                            ofs_one+=20;
                            is_req = 0;
                            $rootScope.postone = post_one ;
                            $rootScope.postone_ofset = ofs_one;
    
                        }
                        else if(ofs_one == 0){$(".one_ids").next('.refresh_loading').show();}
                    }).
                    fail(function() {$(".one_ids").next('.refresh_loading').show();});
                }
                /*=====================Scroll Page===============================*/
                $('#one_ids').on("scroll",function(){
                    var content = $('#one_ids') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#one_ids .user_list').height() ;
                    if((   twoes - ones ) < 700 && is_req==0 ){is_req = 1;fetch_one(ofs_one);}
                });
                
                /*====================================================*/
            },/* end */
            templateUrl :  "pages/wall/slider_one.html"
}});
