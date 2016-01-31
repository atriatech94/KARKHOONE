angular.module('myapp')
.controller('ProfileController', function($scope,$rootScope,$routeParams,$http) {
    show_anim();
    $scope.portfolios = 0;
    $scope.user_id = $routeParams.user_id;
     if($rootScope.profile_info !== undefined){
        $scope.user_info = $rootScope.profile_info;
    }
    $http.get(base_url+"/api_inapp/get_user_info/Att6i3-HaREWin0B3-98FFGG858HY/"+$routeParams.user_id+"/"+localStorage.getItem("user_id") )
    .success(function(response){
        console.log(response.user_info.portfolio,response);
        hide_anim();
        if(response.is_friend == '1'){
        /*user isn t my friend*/
            if(response.user_perms != null){
                console.log(response.user_perms);
                response.user_perms.forEach(function(element,index){
                    if(element.access_level == "0"){
                        switch(element.perm_name) {
                            case "mobile":
                                response.user_info[0].mobile = undefined;
                                break;
                            case "email":
                                response.user_info[0].mobile = undefined;
                                break;
                            case "cv":
                                response.user_skill = undefined;
                                break;
                            case "portfolio":
                                response.user_info.portfolio = undefined;
                                break;
                            default:

                        }//end sqwitch
                    }
                });
            }
            
        }else{
        /*user isn t my friend*/
            console.log("not my freid");
            if(response.user_perms != null){
                console.log(response.user_perms);
                response.user_perms.forEach(function(element,index){
                    if(element.access_level != "2" ){
                        switch(element.perm_name) {
                            case "mobile":
                                response.user_info[0].mobile = undefined;
                                break;
                            case "email":
                                response.user_info[0].mobile = undefined;
                                break;
                            case "cv":
                                response.user_skill = undefined;
                                break;
                            case "portfolio":
                                 response.user_info.portfolio = undefined;
                                break;
                            default:

                        }//end sqwitch
                    }
                });
            }
        }
        
       
        $scope.user_info = response.user_info ;
        $scope.user_skill = response.user_skill;
        $scope.user_spam = response.spam[0].count;
        $scope.portfolios = response.user_info.portfolio;
        $scope.info = response.info;
        $scope.followers = response.followers;
        
       if(response.user_info.length == '0' ){
           $('body .alert .msg').text("کاربر غیر فعال می باشد .").parent('.alert').removeClass('none');
           window.location.hash = "#/wall";
       }
        
        
    });
})
.directive('profileDir' , function ($rootScope,$routeParams){
		return {
			link: function(scope) {                
        /*====================================================*/
                var user_id = localStorage.getItem("user_id");
                var ofset = 0;
        /*===============================================================================*/  
                var snapper = new Snap({ element: document.getElementById('content47'), disable: 'left'});
                $("body #content47").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
        /*===============================================================================*/  
                scope.now_year = moment().format('jYYYY');
                scope.base_url = base_url;
                scope.follower = JSON.parse( localStorage.getItem("user_follower") ) ;
                scope.checked = JSON.parse( localStorage.getItem("user_checked") ) ;
                var user_data = scope.user_info;
        /*===============================================================================*/  
               
        /*===============================================================================*/  
                $rootScope.portfolio_user = null ;
      
        /*===============================================================================*/ 
                 scope.$watch(
                    function(scope) {return scope.portfolios;},
                    function() {
                        
                        if(scope.portfolios == "havij"){
                            show_anim();
                            $.get(base_url+"/api_upload/portfolio/UPLo-098UYH-ooeWu/"+$routeParams.user_id+"/20/"+ofset+"/"+localStorage.getItem("user_id"),function(datas){
                                hide_anim();
                                
                                data = JSON.parse(datas);
                                console.log(data);
                                if(data == null){return;}
                                data.forEach(function(element,index){
                                    element.dates =  moment(element.p_date).calendar();
                                    element.cap = Math.round(parseInt(element.p_filesize)/1048576)/100;
                                    post_one.push(element);
                                });
                                scope.$apply(function(){
                                    scope.portfolio_you = post_one ;
                                    $rootScope.portfolio_user = post_one ;
                                    $rootScope.portfolio_user_ofset = ofset;
                                }); 

                            });
                        }/*if scope.portfolio != 2*/
                    }
                 );
          
            
            /*===============================================================================*/  
      
        /*=================================end click show user==============================================*/  
        $(".short_info").on("click",".circle_btn_like",function(){
           
           var my_id = localStorage.getItem("user_id");
           var your_id= $(this).attr("user_id");

            if(!$(this).hasClass("active") ){
                $(this).addClass("active");
                $.get(base_url+"/api_flow/like_user/LIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                    scope.follower.push(your_id);
                    localStorage.setItem('user_follower',JSON.stringify(scope.follower));
                });
            }
            else{
                 $(this).removeClass("active");
                 $.get(base_url+"/api_flow/dislike_user/D11sLIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                     var index = scope.follower.indexOf(your_id);
                     if (index > -1) {scope.follower.splice(index, 1); }
                     localStorage.setItem('user_follower',JSON.stringify(scope.follower));
                });
            }
        });
        /*===============================================================================*/ 
        $(".short_info").on("click",".circle_btn_view",function(){
            var my_id = localStorage.getItem("user_id");
            var your_id= $(this).attr("user_id");

            if(!$(this).hasClass("active") ){
                $(this).addClass("active");
                $.get(base_url+"/api_checked/checked_user/ch3ck3-dREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                   scope.checked.push(your_id);
                   localStorage.setItem('user_checked',JSON.stringify(scope.checked));  
                });
            }
            else{
                 $(this).removeClass("active");
                 $.get(base_url+"/api_checked/dischecked_user/D11discheckedsLIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                   var index = scope.checked.indexOf(your_id);
                   if (index > -1) {scope.checked.splice(index, 1); }
                   localStorage.setItem('user_checked',JSON.stringify(scope.checked));
                });
            }
        });
        /*===============================================================================*/ 
        $(".circle_btn_msg").on("click",function(){
            
            localStorage.setItem('chat',JSON.stringify(scope.user_info)) ;
            $rootScope.chat = scope.user_info ;
            console.log(scope.user_info);
            window.location.hash = "#/msg_detail";
            
        });
        /*===============================================================================*/
         var post_one = Array();
                var ofset = 0;
   
                  $('.cv_list').on("click",".do_like",function(){
                      var p_id = $(this).parents('.extra').prev(".photo_cv").attr('p_id');
                      var photo_cv = $(this);
                 
                        $.get(base_url+"/api_upload/toggle_like/UPLo-09dfdfd8UYH-ooudfdfs/"+user_id+"/"+p_id)
                        .success(function(response){
                            if(JSON.parse(response) == "liked"){
                                photo_cv.text((parseInt(photo_cv.text())+1).toString());
                                $rootScope.portfolio_user.forEach(function(a){
                                    if( a.p_id == p_id){
                                        a.l_count = parseInt(a.l_count)+1;
                                    }
                                });
                                 photo_cv.addClass("liked");
                            }else if(JSON.parse(response) == "unliked"){
                                photo_cv.text((parseInt(photo_cv.text())-1).toString());
                                $rootScope.portfolio_user.forEach(function(a){
                                    if( a.p_id == p_id){
                                        a.l_count = parseInt(a.l_count)-1;
                                        console.log(1);
                                    }
                                });
                                 photo_cv.removeClass("liked");
                            }
                        });
                        
                  });

       
        /*===============================================================================*/ 
                  $('.cv_list').on("click",".photo_cv",function(){
                      var p_id = $(this).attr('p_id');
                      var arr = $.grep(( $rootScope.portfolio_user),function(a){
                            return a.p_id == p_id ;
                      });
                      $rootScope.p_detail = arr ;
                      console.log($rootScope.p_detail);
                      localStorage.setItem("p_detail",JSON.stringify($rootScope.p_detail));
                      window.location.hash = "#/portfolio_detail/"+p_id;
                  });
                  
        /*=========================Spaming user===========================*/
        $(".contant_profile").on("click",".spam",function(){
            $('body .lpro').removeClass("none");
            $.get(base_url+'/api_upload/violation_report/UdsfPLo-098sdfUYH-oodfu/'+localStorage.getItem('user_id')+'/'+scope.user_info[0].member_id,function(data){
                    scope.$apply(function(){scope.user_spam = '1';});
                   $('body .lpro').addClass("none");
            }).fail(function(){
                $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                $('body .lpro').addClass("none");
            });
        });
        /*====================================================*/
        $(".cv_list").on("click",".porfolio_spam",function(){
            $('body .lpro').removeClass("none");
            var p_id = $(this).attr('p_id');
            // console.log(p_id);
            $.get(base_url+'/api_upload/portfolio_violation_report/UdsfdfPLo-0df98sdfUYH-oodffu/'+localStorage.getItem('user_id')+'/'+p_id,function(data){
                    scope.$apply(function(){scope.user_spam = '1';});
                   $('body .lpro').addClass("none");
            }).fail(function(){
                $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                $('body .lpro').addClass("none");
            });
        });
        /*====================================================*/
       
		/*====================================================*/
            }/* end */
}})
