angular.module('myapp')
.controller('ProfileController', function($scope,$rootScope,$routeParams,$http) {
    
    if($routeParams.user_id == localStorage.getItem("user_id")){
        window.location.href = "#/myprofile";
    }
    
    show_anim();
    $scope.user_info = [{ city: "------",
            description: "------------------------------",
            email: "------@------.--",
            field: "------",
            followers: "0",
            gender: "0",
            grade: "0",
            married: "0",
            mobile: "000000000",
            name: "------ ------",
            picname: "",
            state: "------",
            status: "0",
            view: "6",
            age: moment().format('jYYYY')
    }];
    
    $scope.portfolios = 0;
    $scope.count_s1 = 0;
    $scope.count_s2 = 0;
    $scope.user_id = $routeParams.user_id;
     if($rootScope.profile_info !== undefined){
        $scope.user_info = $rootScope.profile_info;
    }
    $scope.is_chat = "0";
    $http.get(base_url+"/api_inapp/get_user_info/Att6i3-HaREWin0B3-98FFGG858HY/"+$routeParams.user_id+"/"+localStorage.getItem("user_id") )
    .success(function(response){
        //console.log(response.user_info.portfolio,response);
        hide_anim();
        console.log(response.user_info2);
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
                                response.user_info[0].email = undefined;
                                break;
                            case "cv":
                                response.user_skill = undefined;
                                break;
                            case "portfolio":
                                response.user_info.portfolio = undefined;
                                break;
                            case "follower":
                                response.count_follower[0].count_follower = undefined;
                                break;
                            case "following":
                                response.count_following[0].count_following = undefined;
                                break;
                            default:
                        }//end sqwitch
                    }
                });
            }
        }else{
        /*user isn t my friend*/
            // console.log("not my freid");
            if(response.user_perms != null){
             //   console.log(response.user_perms);
                response.user_perms.forEach(function(element,index){
                    if(element.access_level != "2" ){
                        switch(element.perm_name) {
                            case "mobile":
                                response.user_info[0].mobile = undefined;
                                break;
                            case "email":
                                response.user_info[0].email = undefined;
                                break;
                            case "cv":
                                response.user_skill = undefined;
                                break;
                            case "portfolio":
                                 response.user_info.portfolio = undefined;
                                break;
                            case "follower":
                                response.count_follower[0].count_follower = undefined;
                                break;
                            case "following":
                                response.count_following[0].count_following = undefined;
                                break;
                            default:

                        }//end sqwitch
                    }
                });
            }
        }
        /**/
        if(localStorage.getItem("user_follower") == null){
            localStorage.setItem("user_follower","[]");
        }
        if(localStorage.getItem("user_checked") == null){
            localStorage.setItem("user_checked","[]");
        }
        
        console.log("inee",response.chat_block);
        if(response.chat_block.length > 1 ){
            $scope.is_chat = "4";
        }
        else if(response.chat_block.length == 1 && response.chat_block[0].user_blocked == localStorage.getItem('user_id')){
            //this user block you
            $scope.is_chat = "1";
            
        }else if(response.chat_block.length == 1 && response.chat_block[0].user_do_block == localStorage.getItem('user_id')){
            $scope.is_chat = "2";
            //your block this user
        }else{
            //notting
            $scope.is_chat = "3";
        }

        /*==============================================*/
        $scope.user_info = response.user_info ;
        $scope.user_skill = response.user_skill;
        $scope.user_spam = response.spam[0].count;
        $scope.portfolios = response.user_info.portfolio;
        $scope.info = response.info;
        $scope.followers = response.followers;
        
        if(response.count_follower[0].count_follower !== undefined)
        {
            $scope.count_fllower = response.count_follower[0].count_follower;
        }
        if(response.count_following[0].count_following !== undefined)
        {
            $scope.count_fllowing = response.count_following[0].count_following ;
        }
    
        $scope.now_year = moment().format('jYYYY');
        $scope.base_url = base_url;
        $scope.follower = JSON.parse( localStorage.getItem("user_follower") ) ;
        $scope.checked = JSON.parse( localStorage.getItem("user_checked") ) ;
        if($scope.user_skill != null &&$scope.user_skill.length > 0){
        $scope.user_skill.forEach(function(element,index){
            if(element[2] == "0")
                $scope.count_s1++;
            else
                $scope.count_s2++;
        }); 
    }
        
       if(response.user_info.length == '0' ){
           $('body .alert .msg').text("کاربر غیر فعال می باشد .").parent('.alert').removeClass('none');
           window.location.hash = "#/wall";
       }
        
        
    }).error(function(){
        hide_anim();
        $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
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
                
        /*===============================================================================*/  
                $(".short_info").on("click",".single_4_img",function(){
                    var urll = $(this).attr("mhref");
                    $.fancybox.open([
                        {
                            href : urll,
                        }    
                    ],{padding : 0});
                        
                    
                });
        /*===============================================================================*/  
                $rootScope.portfolio_user = null ;
      
        /*===============================================================================*/ 
                 scope.$watch(
                    function(scope) {return scope.portfolios;},
                    function() {
                        
                        if(scope.portfolios == "havij"){
                            fetch_por();
                        }/*if scope.portfolio != 2*/
                    }
                 );
          
            
            /*===============================================================================*/  
                function fetch_por(){
                    show_anim();
                    is_req = 1;
                    $.get(base_url+"/api_upload/portfolio/UPLo-098UYH-ooeWu/"+$routeParams.user_id+"/20/"+ofset+"/"+localStorage.getItem("user_id"),function(datas){
                        hide_anim();
                                        
                        data = JSON.parse(datas);
                        if(data.length >0){
                                //console.log(data);
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
                            ofset = 20 + ofset;
                            is_req = 0;

                        }
                    });
      
                }
        /*====================================================*/
                 $('.tool_bar_fix').on("scroll",function(){
                    win_height = $(window).height()+ 400 ;
                    var content = $('.tool_bar_fix') ;
                    var ones =  content.scrollTop()  + content.height();
                    var twoes =  $('.haminjouri').height() ;
                    console.log(twoes - ones , win_height );
                    if(( twoes  - ones  ) < win_height && is_req==0 ){is_req = 1;fetch_por();}
                });
        /*=================================end click show user==============================================*/  
                console.log($rootScope.myfollowing);
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
                if($rootScope.myfollowing !== undefined){
                    var arr = $.grep($rootScope.myfollowing,function(element){
                        return element.member_id !=your_id ;
                    })
                    $rootScope.myfollowing = arr;
                }
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
                if($rootScope.mychecked !== undefined){
                    var arr = $.grep($rootScope.mychecked,function(element){
                        return element.member_id !=your_id ;
                    })
                    $rootScope.mychecked = arr;
                }
                $(this).removeClass("active");
                $.get(base_url+"/api_checked/dischecked_user/D11discheckedsLIKOO-HaREWin0B3-98FFGG858HY/"+my_id+"/"+your_id,function(){
                    var index = scope.checked.indexOf(your_id);
                    if (index > -1) {scope.checked.splice(index, 1); }
                    localStorage.setItem('user_checked',JSON.stringify(scope.checked));
                });
            }
        });
        /*===============================================================================*/ 
        $("#content47").on("click",".circle_btn_msg",function(){
            
            if($(this).attr('is_chat') == "3"){
                localStorage.setItem('chat',JSON.stringify(scope.user_info)) ;
                $rootScope.chat = scope.user_info ;
                //console.log(scope.user_info);
                window.location.hash = "#/msg_detail";
            }else if($(this).attr('is_chat') == "2" ||  $(this).attr('is_chat') == "4"){
                $.fancybox.open("<div class='alert_btn'><p>این کاربر توسط شما مسدود شده . </p><button class='unblock_user'>لغو مسدودی</button><button class='noting_else' onclick='$.fancybox.close()'>بستن پنجره</button></div>",{closeBtn: false});
                // your are bloking this user
            }else if($(this).attr('is_chat') == "1"){
                // you are blocked from this user
                $('body .alert .msg').text("شما امکان ارسال پیام به این کاربر را ندارید . ").parent('.alert').removeClass('none');
            }
            
        });
        /*=========================================unblock user======================================*/
            $('body').on("click",".unblock_user",function(){
                $('body .lpro').removeClass("none");
                $.fancybox.close();
                $.get(base_url+"/api_upload/unblock_chat_user/D11discheckeLIKOO-HascEWin0B3-98FFGG85asc8HY/"+(localStorage.getItem('user_id'))+"/"+($routeParams.user_id),function(data){
                    if(scope.is_chat == "2"){
                        scope.$apply(function(){scope.is_chat = "3";});
                    }else if(scope.is_chat == "4"){
                        scope.$apply(function(){scope.is_chat = "1";});
                    }
                    $('body .lpro').addClass("none");
                    
                }).fail(function(){
                    $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                    $('body .lpro').addClass("none");
                });
            });
        /*===============================================================================*/
            $('.click_to_hide i').click(function(){
                var fomr = $(this);
                if($(this).hasClass('fa-angle-down')){
                    $('.want_hide').slideDown(function(){fomr.removeClass('fa-angle-down').addClass('fa-angle-up');});
                }else{
                    $('.want_hide').slideUp(function(){fomr.removeClass('fa-angle-up').addClass('fa-angle-down');});
                }
            });
        /*===============================================================================*/
         var post_one = Array();
                var ofset = 0;
   
                $('.cv_list').on("click",'.do_like',function(){
                    var p_id = $(this).parents('.extra').prev(".photo_cv").attr('p_id');
                    var photo_cv = $(this);
                    //show_anim();
                            
                   if(photo_cv.hasClass("liked")){
                            /*you should unlinke*/
                       photo_cv.text((parseInt(photo_cv.text())-1).toString());
                       scope.$apply(function(){
                           scope.portfolio_you.forEach(function(a){
                               if( a.p_id == p_id){
                                   a.l_count = parseInt(a.l_count)-1;
                               }
                           });
                       });
                       photo_cv.addClass("unliked").removeClass('liked');;

                   }else if(photo_cv.hasClass("unliked")){
                                  /*you should linke*/
                       photo_cv.text((parseInt(photo_cv.text())+1).toString());
                       scope.$apply(function(){
                           scope.portfolio_you.forEach(function(a){
                               if( a.p_id == p_id){
                                   a.l_count = parseInt(a.l_count)+1;
                               }
                           });
                       });
                       photo_cv.addClass("liked").removeClass('unliked');
                   }
                         
                   $.get(base_url+"/api_upload/toggle_like/UPLo-09dfdfd8UYH-ooudfdfs/"+localStorage.getItem("user_id")+"/"+p_id);

               });

       
        /*===============================================================================*/ 
        $(".contant_profile").on("click",".setting_link_forbidden",function(){
            $('body .lpro').removeClass("none");
            $.get(base_url+'/api_upload/unviolation_report/UdasfPLo-098sdafUYH-oodafu/'+localStorage.getItem('user_id')+'/'+scope.user_info[0].member_id,function(data){
                    scope.$apply(function(){scope.user_spam = '0';});
                   $('body .lpro').addClass("none");
            }).fail(function(){
                $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                $('body .lpro').addClass("none");
            });
        });
        /*===============================================================================*/ 
        /*===============================================================================*/ 
          $('.cv_list').on("click",".photo_cv",function(){
              var p_id = $(this).attr('p_id');
              var arr = $.grep(( $rootScope.portfolio_user),function(a){
                    return a.p_id == p_id ;
              });
              $rootScope.p_detail = arr ;
              //console.log($rootScope.p_detail);
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
                   $('body .lpro').addClass("none");
                    scope.$apply(function(){
                        scope.portfolio_you.forEach(function(a){
                               if( a.p_id == p_id){
                                   a.report = 1;
                               }
                           });
                    });
            }).fail(function(){
                $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                $('body .lpro').addClass("none");
            });
        });
        /*====================================================*/
       $(".cv_list").on("click",".portfolio_unviolation",function(){
            $('body .lpro').removeClass("none");
            var p_id = $(this).attr('p_id');
            // console.log(p_id);
            $.get(base_url+'/api_upload/portfolio_unviolation_report/UdsfsdfdfPLo-0df98sfsdfUYH-oodfdfsfu/'+localStorage.getItem('user_id')+'/'+p_id,function(data){
                   $('body .lpro').addClass("none");
                 scope.$apply(function(){
                        scope.portfolio_you.forEach(function(a){
                               if( a.p_id == p_id){
                                   a.report = null;
                               }
                           });
                    });
            }).fail(function(){
                $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                $('body .lpro').addClass("none");
            });
        });
		/*====================================================*/
                $('.cv_list').on('click','.share_btn',function(){
                    var url = $(this).attr('share_url');
                    share_fn(url);// dar index.js hast
                });
		/*====================================================*/
            }/* end */
}})
