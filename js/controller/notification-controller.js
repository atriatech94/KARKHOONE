var insert_chat = 0 ;
angular.module('myapp')
.controller('notificationController', function($scope) {
    $scope.base_url = base_url;
    $scope.user_id = localStorage.getItem('user_id');
})
.directive('notificationarchiveDir' , function ($rootScope){
		return {
			link: function(scope) {
                
				/*===============================================================================*/  
                var snapper = new Snap({ element: document.getElementById('content20'), disable: 'left'});
                $("body #content20").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                /*===============================================================================*/ 
                var ofset = 0;
                var last_id = 0;
                var post_one = Array();
                var post_two = Array();
                var post_three = Array();
                var post_four = Array();
                var days3 = moment().subtract(24, 'hour').valueOf() ; 
                console.log(days3);
				/*====================================================*/
                if($rootScope.notif !== undefined){
                    scope.friend_requests = $rootScope.friend_requests;
                    scope.portfolio_likes = $rootScope.notif;
                    ofset = $rootScope.notif_ofset
                }else{fetch_serche_one();}
                
				/*====================================================*/
                function fetch_serche_one(){
    
                    $(".follower").next('.loading_users').show();
                    $(".follower").next('.refresh_loading').hide();
                    $.get(base_url+"/api_upload/notifications/UPewLo-098UDBDsYH-ooesWu/"+localStorage.getItem("user_id")+"/"+ofset+"/"+last_id,function(datas){
                        hide_anim();
                        friend_requests = new Object();
                        portfolio_comments = new Object();
                        portfolio_likes = new Object();
                        datas = JSON.parse(datas);
                        friend_requests = datas.friend_requests; 
                        portfolio_comments = datas.portfolio_comments;
                        portfolio_likes = datas.portfolio_likes;
                        
                       
                        var portfolio_likes = portfolio_comments.concat(portfolio_likes);
                        console.log(portfolio_likes);
                        $(".follower").next('.loading_users').hide();
                        $('body .lpro').addClass("none");

                        if(friend_requests.length > 0){
                            post_one = [];
                            friend_requests.forEach(function(element,index){
                                var d = new Date(element.date);
                                try{
                                    element.dates =    moment(element.date).calendar();
                                }catch(e){
                                    console.log(e);
                                }    
                                post_one.push(element);
                            });
                            scope.$apply(function(){
                                scope.friend_requests = post_one ;
                                $rootScope.friend_requests = post_one ;
                            }); 
                        }

                        if(portfolio_likes.length > 0){
                            post_four = [];
                            portfolio_likes.forEach(function(element,index){
                                var d = new Date(element.date);
                                try{
                                    element.dates =    moment(element.date).calendar();
                                }catch(e){
                                    //console.log(e);
                                }
                                post_four.push(element);
                            });

                            scope.$apply(function(){
                                if(scope.portfolio_likes !== undefined)
                                    scope.portfolio_likes.splice(0, 0, post_four);
                                else
                                    scope.portfolio_likes = post_four ;
                                
                               
                            });
                        }

                        if(friend_requests.length > 0 || portfolio_likes.length > 0)
                        {
                            scope.$apply(function(){
                                $rootScope.notif = scope.portfolio_likes ;
                                $rootScope.notif_ofset = ofset;
                            });   
                            ofset += 20 ;
                            is_req = 0;
                            
                        }
                        else if(ofset == 0){$(".one_ids").next('.refresh_loading').show();}


                    }).fail(function(){
                        $(".one_ids").next('.refresh_loading').show();
                    });
                   
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
                $('.chat_view ').on("click",".request_btn .accept_freq",function(){
                    
                    $(this).parent('.request_btn').hide(100);
                    $.get(base_url+"api_upload/friend_request_check/UP67wLo-098U45sDBDssYH-oosesWu/1/" + $(this).attr('requested_id') +"/" + localStorage.getItem("user_id"),function(){
                        
                    });
                });
                $('.chat_view').on("click",".request_btn .reject_freq",function(){
                    $(this).parent('.request_btn').hide(100);
                    $.get(base_url+"api_upload/friend_request_check/UP67wLo-098U45sDBDssYH-oosesWu/2/"+ $(this).attr('requested_id') +"/"+localStorage.getItem("user_id"),function(){
                    
                    });
                });
            /*====================================================*/
            $('.refresh_msg').click(function(){
                show_anim();
                fetch_serche_one();
            });
            /*====================================================*/
        }/* end */
}});

