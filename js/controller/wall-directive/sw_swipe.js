var swiper2;
var is_use = 0;
var user_one = 0;
var tab_index ; 
var drop_swipe = 0;
var drop_swipe_on;
angular.module('myapp')
.directive('swSwipe', function ($rootScope){
		return {
			link: function($scope) {
                $(document).ready(function () {
                    $('.snap-content').on("error","img",function() {
                        alert('Image does not exist !!');
                    });
                  
                    /*===============================================================================*/  
                    if($rootScope.profile_info_tab_index === undefined){ tab_index = 0 ;}else{ tab_index = $rootScope.profile_info_tab_index ; console.log( $rootScope.profile_info_tab_index ); }
                    /*===============================================================================*/  
                    var snapper = new Snap({ element: document.getElementById('content6'), disable: 'left'});
                    $("body #content6").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                    /*===============================================================================*/  
                   
                    swiper2 = new Swiper( '.bg_fix .swiper1' ,{scrollbar: '.swiper-scrollbar', scrollbarHide: false,grabCursor: true,initialSlide :tab_index });
                   if(drop_swipe == 0){
                       drop_swipe_on = swiper2;
                       drop_swipe = 1 ;
                       
                   }
                    /*===============================================================================*/  
                    if(typeof swiper2.on != "function")
                    {
                        swiper2 = undefined;
                        swiper2 = drop_swipe_on ;
                        console.log(swiper2);
                    }
                  
                    /*===============================================================================*/   
                    if(swiper2 !== undefined){
                        swiper2.on('slideChangeEnd', function () {

                            var active_class = $(".swiper-slide-active").attr('actives'); 
                            var wbody = $("body").width();
                            var rw = ($(active_class).outerWidth()-8)+"px";
                            var rsw = 15 ;
                            $('.links a').length;
                            for( var i = 0 ; i < ( $('.links a').length ) ; i++ )
                            {
                                $this =  $('.links a:eq('+i+')');
                                if( $this.attr("id") == active_class.replace("#",'')){break;}
                                rsw += $this.outerWidth();
                            }
                            rsw = rsw - 5 ;
                            //console.log($('.scroller_asmin').css({"transform":"translate3d(-"+rws+" , 0px, 0px) !important","width": rw+" !important"}));
                            $('.scroller_asmin').attr("style","transform : translate3d(-"+rsw+"px , 0px, 0px) !important ;-webkit-transform : translate3d(-"+rsw+"px , 0px, 0px) !important ;");
                        });
                    }
                    /*===============================================================================*/
                    get_count_mail();
                    get_count_notif();
                    
                    function get_count_mail(){$.get(base_url+"/api_chat/count_new_msg/ChetGet-098ConTTHYT65VC-C276/"+localStorage.getItem("user_id"),function(data){var count = JSON.parse(data);if(count[0].count > 0){$(".msg i").show().text(count[0].count);}}); }    
                    /*===============================================================================*/
                    setInterval(function(){get_count_mail();get_count_notif();},50000);
                    /*===============================================================================*/
                    function get_count_notif(){$.get(base_url+"/api_upload/count_notif/UPTRECVBwLo-098U147POdDssYH-CCCexsWu/"+localStorage.getItem("user_id"),function(data){var count = JSON.parse(data);if(count.count_notif > 0){$(".notif i").show().text(count.count_notif);}}); } 
                    /*===============================================================================*/
                    $('.links a').click(function(){
                        slide = $(this).attr('slide');
                        swiper2.slideTo(slide);
                    });
                    /*===============================================================================*/
                });	
            },
        	templateUrl :  "pages/wall/sw_swipe.html"
			
}})
.directive('showuser1Dir' ,  function ($rootScope,$http){
    return {
			link: function(scope) {
                var dir = "showuser1-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser2Dir' ,  function ($rootScope,$http){
    return {
			link: function(scope) {
                
                var dir = "showuser2-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
              
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser3Dir', function ($rootScope,$http){
    return {
			link: function(scope) {
                
                var dir = "showuser3-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
               
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser4Dir' ,  function ($rootScope,$http){
    return {
            link: function(scope) {
                var dir  = "showuser4-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
                 
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser5Dir' ,  function ($rootScope,$http){
    return {
            link: function(scope) {
                var dir  = "showuser5-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
                 
            },
            templateUrl :  "pages/wall/show_user.html"
}})
.directive('showuser6Dir' ,  function ($rootScope,$http,$routeParams){
    return {
            link: function(scope) {
                var dir  = "showuser6-dir" ;
                var load_fun = show_user($rootScope,$http,scope,dir);
                 
            },
            templateUrl :  "pages/wall/show_user.html"
}});
/*===============================================================================*/  
function show_user($rootScope,$http,scope,dir){
    $(document).ready(function(){
        /*===============================================================================*/  
        $("body .show_user_ss").on('click','.open_back_right',function(){
            $("body").find("#open-right").trigger("click");
        });
        /*===============================================================================*/  
        scope.now_year = moment().format('jYYYY');
        var user_data;
        /*===============================================================================*/  
        $("."+dir).on("click",".user_one",function(){
            
            var user =  $(this);
            user_id = user.attr("user_id");
            var in_scope = user.attr("scope");
            var data ;
            if(in_scope == "postone"){data = $rootScope.postone;}
            else if(in_scope == "postnear"){data = $rootScope.postnear;}
            else if(in_scope == "posthasjob"){ data = $rootScope.posthasjob;}
            else if(in_scope == "postneedjob"){data = $rootScope.postneedjob;}
            else if(in_scope == "myfollower"){data = $rootScope.myfollower;}
            else if(in_scope == "follower"){data = $rootScope.follower;}
            else if(in_scope == "myfollowing"){data = $rootScope.myfollowing;}
            else if(in_scope == "mychecked"){data = $rootScope.mychecked;}
            else if(in_scope == "search"){data = $rootScope.search;}

            user_data = $.grep(data, function(data) {return data.member_id == user_id ;});
            scope.$apply(function(){$rootScope.profile_info = user_data;});   
            if(dir == "showuser1-dir" )
            {
                $rootScope.profile_info_tab_index = swiper2.activeIndex ;
                $rootScope.profile_info_top = $(".swiper-slide-active").scrollTop();
                $rootScope.profile_info_tab = $(".swiper-slide-active").attr('actives');
                console.log($rootScope.profile_info_top);
             
            }
            else{
                $rootScope.profile_info_top = $("."+dir+" .of_list").scrollTop();
                $rootScope.profile_info_div = dir;
            }
            
            window.location.hash= "#/profile/"+user_id;
            /*===============================================================================*/  
        }); 
        /*=================================end click show user==============================================*/  
        /*end click.user_one*/
     

    });
    /*end document.ready*/
    
}